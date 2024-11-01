import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuizRoom.css';
import Notification from '../components/Notification';
import { db, auth } from '../components/firebase';
import { getDoc, doc, setDoc, collection, query, orderBy, getDocs, writeBatch, serverTimestamp } from 'firebase/firestore';

const QuizRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId, roomId, timeLimit } = location.state || {};
  
  // Simplified state
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(timeLimit * 60);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Thêm state leaderboard
  const [leaderboard, setLeaderboard] = useState([]);

  // Thêm hàm fetchLeaderboard
  const fetchLeaderboard = useCallback(async () => {
    try {
      const scoresRef = collection(db, 'rooms', roomId, 'scores');
      const q = query(scoresRef, orderBy('score', 'desc'));
      const querySnapshot = await getDocs(q);
      const leaderboardData = [];
      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }, [roomId]);

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quizId) {
          const quizRef = doc(db, 'createdQuizzes', quizId);
          const quizSnap = await getDoc(quizRef);
          if (quizSnap.exists()) {
            setQuestions(quizSnap.data().questions);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Handle answer selection for multiple choice
  const handleOptionClick = (questionIndex, selectedAnswer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedAnswer
      }));
    }
  };

  // Handle answer selection for true/false
  const handleTrueFalseClick = (questionIndex, selectedAnswer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedAnswer
      }));
    }
  };

  // Handle short answer input
  const handleShortAnswerChange = (questionIndex, answer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: answer.trim()
      }));
    }
  };

  // Check if all questions are answered
  const areAllQuestionsAnswered = () => {
    return questions.every((_, index) => userAnswers[index] !== undefined);
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    if (!areAllQuestionsAnswered()) {
      setNotificationMessage("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài");
      setShowNotification(true);
      return;
    }

    try {
      if (!auth.currentUser) {
        setNotificationMessage("Bạn cần đăng nhập để nộp bài");
        setShowNotification(true);
        return;
      }

      // Tính điểm và chi tiết câu trả lời
      let totalScore = 0;
      const detailedAnswers = questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        let isCorrect = false;
        
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          isCorrect = userAnswer === correctAnswer;
        } else if (question.type === 'short-answer') {
          isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        }

        if (isCorrect) totalScore++;

        return {
          questionType: question.type,
          question: question.question,
          userAnswer: userAnswer,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect
        };
      });

      // Lấy thông tin user profile
      const userProfileDoc = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
      if (!userProfileDoc.exists()) {
        throw new Error('User profile not found');
      }
      const userProfile = userProfileDoc.data();

      // Batch write để đảm bảo tính nhất quán của dữ liệu
      const batch = writeBatch(db);

      // 1. Lưu kết quả chi tiết vào quizSubmissions
      const submissionRef = doc(db, 'quizSubmissions', `${auth.currentUser.uid}_${quizId}_${roomId}`);
      batch.set(submissionRef, {
        uid: auth.currentUser.uid,
        username: userProfile.username,
        quizId: quizId,
        roomId: roomId,
        score: totalScore,
        maxScore: questions.length,
        detailedAnswers: detailedAnswers,
        submittedAt: serverTimestamp(),
        timeSpent: timeLimit * 60 - remainingTime
      });

      // 2. Lưu điểm vào bảng xếp hạng của phòng
      const scoreRef = doc(db, 'rooms', roomId, 'scores', auth.currentUser.uid);
      batch.set(scoreRef, {
        uid: auth.currentUser.uid,
        username: userProfile.username,
        displayName: userProfile.displayName || userProfile.username,
        photoURL: userProfile.profilePictureUrl,
        score: totalScore,
        maxScore: questions.length,
        submittedAt: serverTimestamp()
      });

      // 3. Cập nhật thông tin trong room
      const roomRef = doc(db, 'rooms', roomId);
      batch.update(roomRef, {
        [`participants.${auth.currentUser.uid}.submitted`]: true,
        [`participants.${auth.currentUser.uid}.score`]: totalScore,
        [`participants.${auth.currentUser.uid}.submittedAt`]: serverTimestamp()
      });

      // Thực hiện tất cả các thao tác ghi
      await batch.commit();

      // Cập nhật state
      setScore(totalScore);
      setIsSubmitted(true);

      // Fetch lại leaderboard
      await fetchLeaderboard();

    } catch (error) {
      console.error('Error submitting quiz:', error);
      setNotificationMessage("Có lỗi xảy ra khi nộp bài: " + error.message);
      setShowNotification(true);
    }
  };

  // Timer effect
  useEffect(() => {
    if (remainingTime > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (remainingTime === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [remainingTime, isSubmitted]);

  if (isSubmitted) {
    return (
      <div className="quiz-room-page">
        <div className="quiz-result">
          <h2>Kết quả</h2>
          <p>Điểm số của bạn: {score}/{questions.length}</p>
          
          <div className="leaderboard-container">
            <h3>Bảng xếp hạng</h3>
            <div className="leaderboard">
              {leaderboard.map((player, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-ranking">{index + 1}</div>
                  <img 
                    src={player.avatar} 
                    alt={`${player.name}'s avatar`} 
                    className="leaderboard-avatar" 
                  />
                  <div className="leaderboard-info">
                    <p className="leaderboard-name">{player.name}</p>
                    <p className="leaderboard-score">Điểm: {player.score}/{questions.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/')} className="home-button">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-room-page">
      <div className="quiz-header">
        <h2>Bài kiểm tra</h2>
        
        <p className="timer">Thời gian còn lại: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</p>
      </div>

      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-box">
            <h3>Câu {index + 1}</h3>
            <p className="question-text">{question.question}</p>

            {question.type === 'multiple-choice' && (
              <div className="options-grid">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    className={`option-button ${userAnswers[index] === option ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(index, option)}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'true-false' && (
              <div className="true-false-buttons">
                <button
                  className={`tf-button ${userAnswers[index] === true ? 'selected' : ''}`}
                  onClick={() => handleTrueFalseClick(index, true)}
                >
                  Đúng
                </button>
                <button
                  className={`tf-button ${userAnswers[index] === false ? 'selected' : ''}`}
                  onClick={() => handleTrueFalseClick(index, false)}
                >
                  Sai
                </button>
              </div>
            )}

            {question.type === 'short-answer' && (
              <input
                type="text"
                className="short-answer-input"
                value={userAnswers[index] || ''}
                onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                placeholder="Nhập câu trả lời..."
              />
            )}
          </div>
        ))}
      </div>

      <div className="submit-section1">
        <button
          className="submit-button1"
          onClick={handleSubmitQuiz}
          disabled={!areAllQuestionsAnswered()}
        >
          Nộp bài
        </button>
      </div>

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default QuizRoom;