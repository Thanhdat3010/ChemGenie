import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation để lấy state khi điều hướng
import './QuizRoom.css';
import Notification from '../components/Notification';
import { db, auth } from '../components/firebase';
import { getDoc, doc, setDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';

const QuizRoom = () => {
  const location = useLocation();
  const { quizId, roomId } = location.state || {}; // Lấy quizId và roomId từ state khi điều hướng
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(20); // Thời gian mỗi câu hỏi
  const [timeUp, setTimeUp] = useState(false); // Trạng thái hết thời gian
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quizId) {
          const quizRef = doc(db, 'createdQuizzes', quizId);
          const quizSnap = await getDoc(quizRef);
          if (quizSnap.exists()) {
            setQuestions(quizSnap.data().questions);
          } else {
            console.log('Quiz does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          setTimeUp(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeUp) {
      setTimeUp(false);
      setNotificationMessage("Thời gian đã hết. Tự động chuyển câu hỏi tiếp theo.");
      setShowNotification(true);
      nextQuestion();
    }
  }, [timeUp]);

  const handleOptionClick = (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);

      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleTrueFalseClick = (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);

      const isCorrect = selectedAnswer === (questions[currentQuestion].correctAnswer === "true");
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleFillInTheBlankSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === null) {
      const userAnswer = event.target.elements[0].value.trim().toLowerCase();
      setSelectedOption(userAnswer);

      const isCorrect = userAnswer === questions[currentQuestion].correctAnswer.toLowerCase();
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      event.target.elements[0].classList.toggle('quiz-room-page-correct-answer', isCorrect);
      event.target.elements[0].classList.toggle('quiz-room-page-incorrect-answer', !isCorrect);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const submitButton = document.getElementById('quiz-room-page-submit-button');
      submitButton.click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextQuestion = () => {
    if (selectedOption === null && !timeUp) {
      setNotificationMessage("Bạn cần chọn đáp án trước khi tiếp tục.");
      setShowNotification(true);
      return;
    }

    setSelectedOption(null);
    setTimeLeft(20);

    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
      const newProgress = (nextQ / questions.length) * 100;
      setProgress(newProgress);
    } else {
      setQuizCompleted(true);
      saveScore();
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  const saveScore = async () => {
    const user = auth.currentUser;
    if (user) {
      const userProfileDoc = await getDoc(doc(db, 'profiles', user.uid));
      const userProfile = userProfileDoc.data();

      const scoreRef = doc(db, 'rooms', roomId, 'scores', user.uid);
      await setDoc(scoreRef, {
        uid: user.uid,
        name: userProfile.username,
        avatar: userProfile.profilePictureUrl,
        score: score
      });

      fetchLeaderboard();
    }
  };

  const fetchLeaderboard = async () => {
    const scoresRef = collection(db, 'rooms', roomId, 'scores');
    const q = query(scoresRef, orderBy('score', 'desc'));
    const querySnapshot = await getDocs(q);
    const leaderboardData = [];
    querySnapshot.forEach((doc) => {
      leaderboardData.push(doc.data());
    });
    setLeaderboard(leaderboardData);
  };

  useEffect(() => {
    if (quizCompleted) {
      fetchLeaderboard();
    }
  }, [quizCompleted]);
  if (quizCompleted) {
    return (
      <div className="quiz-room-page">
        <h2>Hoàn thành</h2>
  <div className="quiz-room-page-score-container">
    <p className="quiz-room-page-score-label">Điểm số của bạn:</p>
    <p className="quiz-room-page-score">{score}</p>
    <h3>Bảng xếp hạng</h3>
    <div className="leaderboard">
      {leaderboard.map((player, index) => (
        <div key={index} className="leaderboard-item">
          <div className="leaderboard-ranking">{index + 1}</div>
          <img src={player.avatar} alt={`${player.name}'s avatar`} className="leaderboard-avatar" />
          <p className="leaderboard-name">{player.name}</p>
          <p className="leaderboard-score">Điểm số: {player.score}</p>
        </div>
      ))}
    </div>
    <button onClick={() => navigate('/')} className="quiz-room-page-back-button">Quay về trang chủ</button>
  </div>
      </div>
    );
  }

  return (
    <div className="quiz-room-page">
      <h2>Bộ câu hỏi của bạn</h2>
      {questions.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="quiz-room-page-questions-container">
          <div className="quiz-room-page-progress-bar" style={{ width: `${progress}%` }}></div>
          {currentQuestion < questions.length && (
            <div className="quiz-room-page-question">
            <p dangerouslySetInnerHTML={{ __html: `${currentQuestion + 1}. ${questions[currentQuestion].question}` }} />
            <p>Thời gian còn lại: {timeLeft} giây</p>
              {questions[currentQuestion].type === "multiple-choice" && (
                <ul>
                  {questions[currentQuestion].options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={
                        selectedOption !== null &&
                        answerState[currentQuestion] !== null &&
                        option === questions[currentQuestion].correctAnswer
                          ? "quiz-room-page-correct"
                          : selectedOption !== null &&
                            answerState[currentQuestion] !== null &&
                            selectedOption === option &&
                            option !== questions[currentQuestion].correctAnswer
                          ? "quiz-room-page-incorrect"
                          : ""
                      }
                    >
                      <span dangerouslySetInnerHTML={{ __html: `(${String.fromCharCode(65 + index)}) ${option}` }} />
                      {selectedOption === option && answerState[currentQuestion] !== null && option === questions[currentQuestion].correctAnswer ? <span className="quiz-room-page-correct-mark">&#10003;</span> : ''}
                      {selectedOption === option && answerState[currentQuestion] !== null && option !== questions[currentQuestion].correctAnswer ? <span className="quiz-room-page-incorrect-mark">&#10007;</span> : ''}
                    </li>
                  ))}
                </ul>
              )}
              {questions[currentQuestion].type === "true-false" && (
                <ul>
                  <li
                    onClick={() => handleTrueFalseClick(true)}
                    className={
                      selectedOption !== null &&
                      answerState[currentQuestion] !== null &&
                      true === (questions[currentQuestion].correctAnswer === "true")
                        ? "quiz-room-page-correct"
                        : selectedOption !== null &&
                          answerState[currentQuestion] !== null &&
                          selectedOption === true &&
                          true !== (questions[currentQuestion].correctAnswer === "true")
                        ? "quiz-room-page-incorrect"
                        : ""
                    }
                  >
                    (A) True
                    {selectedOption === true && answerState[currentQuestion] !== null && true === (questions[currentQuestion].correctAnswer === "true") ? <span className="quiz-room-page-correct-mark">&#10003;</span> : ''}
                    {selectedOption === true && answerState[currentQuestion] !== null && true !== (questions[currentQuestion].correctAnswer === "true") ? <span className="quiz-room-page-incorrect-mark">&#10007;</span> : ''}
                  </li>
                  <li
                    onClick={() => handleTrueFalseClick(false)}
                    className={
                      selectedOption !== null &&
                      answerState[currentQuestion] !== null &&
                      false === (questions[currentQuestion].correctAnswer === "true")
                        ? "quiz-room-page-correct"
                        : selectedOption !== null &&
                          answerState[currentQuestion] !== null &&
                          selectedOption === false &&
                          false !== (questions[currentQuestion].correctAnswer === "true")
                        ? "quiz-room-page-incorrect"
                        : ""
                    }
                  >
                    (B) False
                    {selectedOption === false && answerState[currentQuestion] !== null && false === (questions[currentQuestion].correctAnswer === "true") ? <span className="quiz-room-page-correct-mark">&#10003;</span> : ''}
                    {selectedOption === false && answerState[currentQuestion] !== null && false !== (questions[currentQuestion].correctAnswer === "true") ? <span className="quiz-room-page-incorrect-mark">&#10007;</span> : ''}
                  </li>
                </ul>
              )}
              {questions[currentQuestion].type === "fill-in-the-blank" && (
                <form onSubmit={handleFillInTheBlankSubmit} className="quiz-room-page-fill-in-the-blank-form">
                  <input
                    type="text"
                    className="quiz-room-page-fill-in-the-blank-input"
                    placeholder="Nhập câu trả lời..."
                  />
                  <button type="submit" id="quiz-room-page-submit-button" className="quiz-room-page-submit-button">Submit</button>
                  {/* Hiển thị dấu tích hoặc dấu x tùy thuộc vào đáp án */}
                </form>
              )}
              {selectedOption !== null && (
                <>
                  <button onClick={toggleExplanation} className="quiz-room-page-explanation-button">Giải thích</button>
                  {showExplanation && (
                    <div className="quiz-room-page-explanation">
                    <p>Đáp án đúng: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].correctAnswer.toString() }} /></p>
                    <p>Giải thích: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].explain }} /></p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {currentQuestion < questions.length && (
            <button onClick={nextQuestion} className="quiz-room-page-next-button">Câu hỏi tiếp theo</button>
          )}
          {showNotification && (
            <Notification
              message={notificationMessage}
              onClose={() => setShowNotification(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizRoom;