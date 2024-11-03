import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuizRoom.css';
import Notification from '../components/Notification';
import { db, auth } from '../components/firebase';
import { getDoc, doc, setDoc, collection, query, orderBy, getDocs, writeBatch, serverTimestamp, onSnapshot } from 'firebase/firestore';
import avatar from "../assets/profile-user.png";

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
  const handleTrueFalseClick = (questionIndex, optionIndex, selectedAnswer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: {
          ...(prev[questionIndex] || {}),
          [optionIndex]: selectedAnswer ? "Đúng" : "Sai"
        }
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

  // Sửa lại hàm areAllQuestionsAnswered để không cần kiểm tra tất cả câu trả lời
  const areAllQuestionsAnswered = (isTimeUp = false) => {
    // Nếu hết giờ, không cần kiểm tra câu trả lời
    if (isTimeUp) return true;
    
    return questions.every((question, index) => {
      if (question.type === 'true-false') {
        return userAnswers[index] && 
               question.options.every((_, optIdx) => 
                 userAnswers[index][optIdx] !== undefined
               );
      }
      return userAnswers[index] !== undefined;
    });
  };

  // Sửa lại hàm handleSubmitQuiz để xử lý khi hết giờ
  const handleSubmitQuiz = async (isTimeUp = false) => {
    try {
      if (!auth.currentUser) {
        setNotificationMessage("Bạn cần đăng nhập để nộp bài");
        setShowNotification(true);
        return;
      }

      // Nếu hết giờ, điền giá trị mặc định cho các câu chưa làm
      let finalUserAnswers = { ...userAnswers };
      if (isTimeUp) {
        questions.forEach((question, index) => {
          if (!finalUserAnswers[index]) {
            if (question.type === 'multiple-choice') {
              finalUserAnswers[index] = '';
            } else if (question.type === 'true-false') {
              finalUserAnswers[index] = {};
              question.options.forEach((_, optIdx) => {
                finalUserAnswers[index][optIdx] = "";
              });
            } else if (question.type === 'short-answer') {
              finalUserAnswers[index] = '';
            }
          }
        });
      } else if (!areAllQuestionsAnswered()) {
        setNotificationMessage("Vui lòng trả lời tất cả các câu hỏi");
        setShowNotification(true);
        return;
      }

      // Định nghĩa cấu trúc điểm chuẩn
      const STANDARD_STRUCTURE = {
        'multiple-choice': { points: 0.25, standardCount: 18, totalPoints: 4.5 },
        'true-false': { points: 1.0, standardCount: 4, totalPoints: 4.0 },
        'short-answer': { points: 0.25, standardCount: 6, totalPoints: 1.5 }
      };

      // Đếm số câu hỏi thực tế cho mỗi loại
      const actualCounts = questions.reduce((acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1;
        return acc;
      }, {});

      console.log('Số câu hỏi thực tế:', actualCounts);

      // Tính điểm thô theo thang chuẩn
      let rawScore = 0;
      const detailedAnswers = questions.map((question, index) => {
        const userAnswer = finalUserAnswers[index];
        const correctAnswer = question.correctAnswer;
        let isCorrect = false;
        let questionScore = 0;
        
        if (question.type === 'multiple-choice') {
          isCorrect = userAnswer === correctAnswer;
          questionScore = isCorrect ? STANDARD_STRUCTURE[question.type].points : 0;
        } 
        else if (question.type === 'true-false') {
          if (Object.values(userAnswer).some(ans => ans === "")) {
            questionScore = 0;
          } else {
            const correctCount = question.options.reduce((count, _, optIdx) => {
              return userAnswer[optIdx] === correctAnswer[optIdx] ? count + 1 : count;
            }, 0);
            
            questionScore = correctCount === 1 ? 0.1 :
                           correctCount === 2 ? 0.25 :
                           correctCount === 3 ? 0.5 :
                           correctCount === 4 ? STANDARD_STRUCTURE[question.type].points : 0;
          }
        } 
        else if (question.type === 'short-answer') {
          isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
          questionScore = isCorrect ? STANDARD_STRUCTURE[question.type].points : 0;
        }

        rawScore += questionScore;
        return {
          questionType: question.type,
          question: question.question,
          userAnswer: userAnswer,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect,
          score: questionScore
        };
      });

      // Tính điểm tối đa có thể đạt được với số câu hỏi hiện tại
      let maxPossibleScore = Object.entries(actualCounts).reduce((total, [type, count]) => {
        if (count > 0) {
          return total + (STANDARD_STRUCTURE[type].points * count);
        }
        return total;
      }, 0);

      // Quy đổi về thang điểm 10
      const finalScore = (rawScore * 10) / maxPossibleScore;
      const totalScore = Math.round(finalScore * 100) / 100;

      console.log({
        rawScore: rawScore,
        maxPossibleScore: maxPossibleScore,
        finalScore: totalScore,
        detailedScores: detailedAnswers.map((a, i) => ({
          question: i + 1,
          type: a.questionType,
          rawScore: a.score,
          adjustedScore: (a.score * 10) / maxPossibleScore
        }))
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
        photoURL: userProfile.profilePictureUrl || null,
        score: totalScore,
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

  // Sửa lại effect của timer
  useEffect(() => {
    if (remainingTime > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (remainingTime === 0 && !isSubmitted) {
      handleSubmitQuiz(true); // Truyền true để chỉ định là nộp bài do hết giờ
    }
  }, [remainingTime, isSubmitted]);

  const handleReturnHome = async () => {
    try {
      // Xóa phòng và tất cả subcollections
      const batch = writeBatch(db);
      
      // Xóa tất cả điểm số trong subcollection 'scores'
      const scoresRef = collection(db, 'rooms', roomId, 'scores');
      const scoresSnapshot = await getDocs(scoresRef);
      scoresSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Xóa phòng
      const roomRef = doc(db, 'rooms', roomId);
      batch.delete(roomRef);

      await batch.commit();
      navigate('/');
    } catch (error) {
      console.error('Error cleaning up room:', error);
      navigate('/');
    }
  };

  // Thêm real-time listener cho leaderboard
  useEffect(() => {
    if (!roomId) return;

    const scoresRef = collection(db, 'rooms', roomId, 'scores');
    const scoresQuery = query(scoresRef, orderBy('score', 'desc'));
    
    const unsubscribe = onSnapshot(scoresQuery, (snapshot) => {
      const leaderboardData = [];
      snapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });
      setLeaderboard(leaderboardData);
    });

    return () => unsubscribe();
  }, [roomId]);

  // Thêm function để kiểm tra câu hỏi đã được trả lời chưa
  const isQuestionAnswered = (questionIndex) => {
    const answer = userAnswers[questionIndex];
    if (!answer) return false;
    
    const question = questions[questionIndex];
    if (question.type === 'true-false') {
      return question.options.every((_, optIdx) => answer[optIdx] !== undefined);
    }
    return true;
  };

  // Thêm function để scroll đến câu hỏi
  const scrollToQuestion = (questionIndex) => {
    const questionElement = document.getElementById(`question-${questionIndex}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="quiz-room-page">
        <div className="quiz-result">
          <h2>Kết quả</h2>
          <p>Điểm số của bạn: {score}/10</p>
          
          <div className="leaderboard-container">
            <h3>Bảng xếp hạng</h3>
            <div className="leaderboard">
              {leaderboard.map((player, index) => (
                <div key={player.uid} className="leaderboard-item">
                  <div className="leaderboard-ranking">{index + 1}</div>
                  <img 
                    src={player.photoURL || avatar}
                    alt={`${player.displayName}'s avatar`} 
                    className="leaderboard-avatar" 
                    onError={(e) => {e.target.src = avatar}}
                  />
                  <div className="leaderboard-info">
                    <p className="leaderboard-name">{player.displayName}</p>
                    <p className="leaderboard-score">Điểm: {player.score}/10</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleReturnHome} className="home-button">
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

      <div className="quiz-container">
        <div className="questions-section">
          {questions.map((question, index) => (
            <div key={index} className="question-box" id={`question-${index}`}>
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
                <div className="true-false-options">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="true-false-option">
                      <div className="option-row">
                        <span className="option-text">{option}</span>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name={`q${index}-opt${optionIndex}`}
                              checked={userAnswers[index]?.[optionIndex] === "Đúng"}
                              onChange={() => handleTrueFalseClick(index, optionIndex, true)}
                            />
                            <span className="radio-text">Đúng</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name={`q${index}-opt${optionIndex}`}
                              checked={userAnswers[index]?.[optionIndex] === "Sai"}
                              onChange={() => handleTrueFalseClick(index, optionIndex, false)}
                            />
                            <span className="radio-text">Sai</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
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

        <div className="question-navigator">
          <h3>Danh sách câu hỏi</h3>
          <div className="question-grid">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`question-number ${isQuestionAnswered(index) ? 'answered' : ''}`}
                onClick={() => scrollToQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
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