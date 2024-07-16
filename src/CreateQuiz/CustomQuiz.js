import React, { useState, useEffect } from 'react';
import './CustomQuiz.css';
import Notification from '../components/Notification';
import { db, auth } from '../components/firebase';
import { getDocs, collection, deleteDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore';

const CustomQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
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
  const [currentQuizId, setCurrentQuizId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const quizzesRef = collection(db, 'createdQuizzes');
          const q = query(quizzesRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const quizData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuizzes(quizData);
        } else {
          console.log('No user is logged in.');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        // Xử lý lỗi ở đây nếu cần thiết
      }
    };

    fetchQuizzes();
  }, []);

  const startQuiz = async (quiz) => {
    setQuestions(quiz.questions);
    setCurrentQuestion(0);
    setAnswerState(Array(quiz.questions.length).fill(null));
    setScore(0);
    setProgress(0);
    setCurrentQuizId(quiz.id);
  
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'quizProgress', `${user.uid}_${quiz.id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestions(data.questions);
        setCurrentQuestion(data.currentQuestion);
        setAnswerState(data.answerState);
        setScore(data.score);
        setProgress(data.progress);
        setQuizCompleted(data.quizCompleted); // Đọc trạng thái quizCompleted từ Firestore
      } else {
        setQuizCompleted(false); // Nếu không có dữ liệu, đặt lại quizCompleted
      }
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      await deleteDoc(doc(db, 'createdQuizzes', quizId));
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const saveProgress = async () => {
    const user = auth.currentUser;
    if (user && currentQuizId) {
      const docRef = doc(db, 'quizProgress', `${user.uid}_${currentQuizId}`);
      await setDoc(docRef, {
        questions,
        currentQuestion,
        answerState,
        score,
        progress,
        quizCompleted  // Đảm bảo lưu trường quizCompleted vào Firestore
      });
    }
  };

  const handleOptionClick = async (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);

      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }

      await saveProgress();
    }
  };

  const handleTrueFalseClick = async (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);

      const isCorrect = selectedAnswer === (questions[currentQuestion].correctAnswer === "true");
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }

      await saveProgress();
    }
  };

  const handleFillInTheBlankSubmit = async (event) => {
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
      event.target.elements[0].classList.toggle('correct-answer', isCorrect);
      event.target.elements[0].classList.toggle('incorrect-answer', !isCorrect);

      await saveProgress();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const submitButton = document.getElementById('submit-button');
      submitButton.click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextQuestion = async () => {
    if (selectedOption === null) {
      setNotificationMessage("Bạn cần chọn đáp án trước khi tiếp tục.");
      setShowNotification(true);
      return;
    }
  
    setSelectedOption(null);
  
    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
      const newProgress = (nextQ / questions.length) * 100;
      setProgress(newProgress);
    } else {
      setQuizCompleted(true);
      await saveProgress();
      // Lưu trạng thái hoàn thành vào Firestore
    }
  };

  const resetQuiz = async () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswerState([]);
    setScore(0);
    setProgress(0);
    setQuizCompleted(false);

    const user = auth.currentUser;
    if (user && currentQuizId) {
      await deleteDoc(doc(db, 'quizProgress', `${user.uid}_${currentQuizId}`));
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  if (quizCompleted) {
    return (
      <div className="custom-quiz-page">
        <h2>Hoàn thành</h2>
        <div className="score-container">
          <p className="score-label">Điểm số của bạn:</p>
          <p className="score">{score}</p>
          <button onClick={resetQuiz} className="next-button">Làm lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-quiz-page">
      <h2>Bộ câu hỏi của bạn</h2>
      {questions.length === 0 ? (
        <div className="quiz-list">
          {quizzes.map((quiz, index) => (
            <div key={index} className="quiz-item">
              <h3>{quiz.title}</h3>
              <button onClick={() => startQuiz(quiz)} className='start-button'>Bắt đầu</button>
              <button onClick={() => deleteQuiz(quiz.id)} className="delete-button">Xóa</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="questions-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          {currentQuestion < questions.length && (
            <div className="question">
            <p dangerouslySetInnerHTML={{ __html: `${currentQuestion + 1}. ${questions[currentQuestion].question}` }} />
            {questions[currentQuestion].imageURL && <img src={questions[currentQuestion].imageURL} alt="question image" style={{ maxWidth: '100%', margin: '10px 0' }} />}
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
                          ? "correct"
                          : selectedOption !== null &&
                            answerState[currentQuestion] !== null &&
                            selectedOption === option &&
                            option !== questions[currentQuestion].correctAnswer
                          ? "incorrect"
                          : ""
                      }
                    >
                      <span dangerouslySetInnerHTML={{ __html: `(${String.fromCharCode(65 + index)}) ${option}` }} />
                      {selectedOption === option && answerState[currentQuestion] !== null && option === questions[currentQuestion].correctAnswer ? <span className="correct-mark">&#10003;</span> : ''}
                      {selectedOption === option && answerState[currentQuestion] !== null && option !== questions[currentQuestion].correctAnswer ? <span className="incorrect-mark">&#10007;</span> : ''}
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
                        ? "correct"
                        : selectedOption !== null &&
                          answerState[currentQuestion] !== null &&
                          selectedOption === true &&
                          true !== (questions[currentQuestion].correctAnswer === "true")
                        ? "incorrect"
                        : ""
                    }
                  >
                    (A) True
                    {selectedOption === true && answerState[currentQuestion] !== null && true === (questions[currentQuestion].correctAnswer === "true") ? <span className="correct-mark">&#10003;</span> : ''}
                    {selectedOption === true && answerState[currentQuestion] !== null && true !== (questions[currentQuestion].correctAnswer === "true") ? <span className="incorrect-mark">&#10007;</span> : ''}
                  </li>
                  <li
                    onClick={() => handleTrueFalseClick(false)}
                    className={
                      selectedOption !== null &&
                      answerState[currentQuestion] !== null &&
                      false === (questions[currentQuestion].correctAnswer === "true")
                        ? "correct"
                        : selectedOption !== null &&
                          answerState[currentQuestion] !== null &&
                          selectedOption === false &&
                          false !== (questions[currentQuestion].correctAnswer === "true")
                        ? "incorrect"
                        : ""
                    }
                  >
                    (B) False
                    {selectedOption === false && answerState[currentQuestion] !== null && false === (questions[currentQuestion].correctAnswer === "true") ? <span className="correct-mark">&#10003;</span> : ''}
                    {selectedOption === false && answerState[currentQuestion] !== null && false !== (questions[currentQuestion].correctAnswer === "true") ? <span className="incorrect-mark">&#10007;</span> : ''}
                  </li>
                </ul>
              )}
              {questions[currentQuestion].type === "fill-in-the-blank" && (
                <form onSubmit={handleFillInTheBlankSubmit} className="fill-in-the-blank-form">
                  <input
                    type="text"
                    className="fill-in-the-blank-input"
                    placeholder="Nhập câu trả lời..."
                  />
                  <button type="submit" id="submit-button" className="submit-button">Submit</button>
                  {/* Hiển thị dấu tích hoặc dấu x tùy thuộc vào đáp án */}
                </form>
              )}
              {selectedOption !== null && (
                <>
                  <button onClick={toggleExplanation} className="explanation-button">Giải thích</button>
                  {showExplanation && (
                    <div className="explanation">
                    <p>Đáp án đúng: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].correctAnswer.toString() }} /></p>
                    <p>Giải thích: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].explain }} /></p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {currentQuestion < questions.length && (
            <button onClick={nextQuestion} className="next-button">Câu hỏi tiếp theo</button>
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

export default CustomQuiz;
