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
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

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
    try {
      const user = auth.currentUser;
      if (!user) {
        setNotificationMessage("Vui lòng đăng nhập để thực hiện thao tác này");
        setShowNotification(true);
        return;
      }

      // Kiểm tra xem đã có submission chưa
      const submissionRef = doc(db, 'quizSubmissions', `${user.uid}_${quiz.id}`);
      const submissionSnap = await getDoc(submissionRef);

      if (submissionSnap.exists()) {
        // Nếu đã có submission, xóa nó để cho phép làm lại
        await deleteDoc(submissionRef);
      }

      // Khởi tạo state cho quiz mới
      setQuestions(quiz.questions || []);
      setCurrentQuestion(0);
      setScore(0);
      setCurrentQuizId(quiz.id);
      setUserAnswers({});
      setQuizCompleted(false);
    } catch (error) {
      console.error('Error starting quiz:', error);
      setNotificationMessage("Có lỗi khi bắt đầu bài kiểm tra");
      setShowNotification(true);
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setNotificationMessage("Vui lòng đăng nhập để thực hiện thao tác này");
        setShowNotification(true);
        return;
      }

      // Delete the quiz document
      const quizRef = doc(db, 'createdQuizzes', quizId);
      await deleteDoc(quizRef);

      // Get all submissions
      const submissionsRef = collection(db, 'quizSubmissions');
      const submissionsSnapshot = await getDocs(submissionsRef);
      
      // Filter and delete only submissions that belong to current user and contain the quizId
      const deletePromises = submissionsSnapshot.docs
        .filter(doc => doc.id.startsWith(user.uid) && doc.id.includes(quizId))
        .map(doc => deleteDoc(doc.ref));
      
      await Promise.all(deletePromises);

      // Update local state
      setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
      
      setNotificationMessage("Đã xóa bài kiểm tra và kết quả thành công");
      setShowNotification(true);
    } catch (error) {
      console.error('Error deleting quiz:', error);
      setNotificationMessage("Có lỗi khi xóa bài kiểm tra");
      setShowNotification(true);
    }
  };

  const saveProgress = async () => {
    const user = auth.currentUser;
    if (user && currentQuizId) {
      const docRef = doc(db, 'quizProgress', `${user.uid}_${currentQuizId}`);
      await setDoc(docRef, {
        questions,
        currentQuestion,
        score,
        quizCompleted  // Lưu trạng thái hoàn thành
      });
    }
  };

  const handleOptionClick = (questionIndex, selectedAnswer) => {
    if (!quizCompleted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedAnswer
      }));
    }
  };

  const handleTrueFalseClick = (questionIndex, optionIndex, selectedAnswer) => {
    if (!quizCompleted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: {
          ...(prev[questionIndex] || {}),
          [optionIndex]: selectedAnswer
        }
      }));
    }
  };

  const handleShortAnswerChange = (questionIndex, answer) => {
    if (!quizCompleted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: answer.trim()
      }));
    }
  };

  const areAllQuestionsAnswered = () => {
    return questions.every((question, index) => {
      if (question.type === 'true-false') {
        // Kiểm tra xem tất cả các options đã được trả lời chưa
        return userAnswers[index] && 
               question.options.every((_, optIdx) => 
                 userAnswers[index][optIdx] !== undefined
               );
      }
      return userAnswers[index] !== undefined;
    });
  };

  const handleSubmitQuiz = async () => {
    if (!areAllQuestionsAnswered()) {
      setNotificationMessage("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài");
      setShowNotification(true);
      return;
    }

    try {
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
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        let isCorrect = false;
        let questionScore = 0;
        
        if (question.type === 'multiple-choice') {
          isCorrect = userAnswer === correctAnswer;
          questionScore = isCorrect ? STANDARD_STRUCTURE[question.type].points : 0;
        } 
        else if (question.type === 'true-false') {
          const correctCount = question.options.reduce((count, _, optIdx) => {
            return userAnswer[optIdx] === correctAnswer[optIdx] ? count + 1 : count;
          }, 0);

          // Thang điểm cho câu đúng sai theo số ý đúng
          questionScore = correctCount === 1 ? 0.1 :
                         correctCount === 2 ? 0.25 :
                         correctCount === 3 ? 0.5 :
                         correctCount === 4 ? STANDARD_STRUCTURE[question.type].points : 0;
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

      setScore(totalScore);
      setQuizCompleted(true);

      if (auth.currentUser) {
        // Save quiz submission details
        await setDoc(doc(db, 'quizSubmissions', `${auth.currentUser.uid}_${currentQuizId}`), {
          uid: auth.currentUser.uid,
          quizId: currentQuizId,
          score: totalScore,
          detailedAnswers: detailedAnswers,
          submittedAt: new Date().toISOString()
        });

        await saveProgress();
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setNotificationMessage("Có lỗi xảy ra khi lưu kết quả");
      setShowNotification(true);
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


  const resetQuiz = async () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false); // Đặt lại trạng thái quizCompleted
  
    const user = auth.currentUser;
    if (user && currentQuizId) {
      await deleteDoc(doc(db, 'quizProgress', `${user.uid}_${currentQuizId}`)); // Xóa tiến trình cũ
    }
  };

  const isQuestionAnswered = (questionIndex) => {
    const answer = userAnswers[questionIndex];
    if (!answer) return false;
    
    const question = questions[questionIndex];
    if (question.type === 'true-false') {
      return question.options.every((_, optIdx) => answer[optIdx] !== undefined);
    }
    return true;
  };

  const scrollToQuestion = (questionIndex) => {
    const questionElement = document.getElementById(`question-${questionIndex}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (quizCompleted) {
    return (
      <div className="quiz-room-page">
        <div className="quiz-result">
          <h2>Kết quả</h2>
          <p>Điểm số của bạn: {score}/10</p>
          
          <button onClick={resetQuiz} className="home-button">
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-quiz-room-page">
      {questions.length === 0 ? (
        <div className="custom-quiz-list-container">
          <h2 className="custom-quiz-list-title">Bộ câu hỏi của bạn</h2>
          <div className="custom-quiz-list">
            {quizzes.map((quiz, index) => (
              <div key={index} className="custom-quiz-item">
                <h3>{quiz.title}</h3>
                <button onClick={() => startQuiz(quiz)} className="custom-quiz-start-button">Bắt đầu</button>
                <button onClick={() => deleteQuiz(quiz.id)} className="custom-quiz-delete-button">Xóa</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="custom-quiz-header">
            <h2>Bài kiểm tra</h2>
          </div>

          <div className="custom-quiz-container">
            <div className="custom-quiz-questions-section">
              {questions.map((question, index) => (
                <div key={index} className="custom-quiz-question-box" id={`question-${index}`}>
                  <h3>Câu {index + 1}</h3>
                  <p className="custom-quiz-question-text">{question.question}</p>

                  {question.type === 'multiple-choice' && (
                    <div className="custom-quiz-options-grid">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`custom-quiz-option-button ${userAnswers[index] === option ? 'selected' : ''}`}
                          onClick={() => handleOptionClick(index, option)}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="custom-quiz-true-false-options">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="custom-quiz-true-false-option">
                          <div className="custom-quiz-option-row">
                            <span className="custom-quiz-option-text">{option}</span>
                            <div className="custom-quiz-radio-group">
                              <label className="custom-quiz-radio-label">
                                <input
                                  type="radio"
                                  name={`q${index}-opt${optionIndex}`}
                                  checked={userAnswers[index]?.[optionIndex] === true}
                                  onChange={() => handleTrueFalseClick(index, optionIndex, true)}
                                />
                                <span className="custom-quiz-radio-text">Đúng</span>
                              </label>
                              <label className="custom-quiz-radio-label">
                                <input
                                  type="radio"
                                  name={`q${index}-opt${optionIndex}`}
                                  checked={userAnswers[index]?.[optionIndex] === false}
                                  onChange={() => handleTrueFalseClick(index, optionIndex, false)}
                                />
                                <span className="custom-quiz-radio-text">Sai</span>
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
                      className="custom-quiz-short-answer-input"
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                      placeholder="Nhập câu trả lời..."
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="custom-quiz-question-navigator">
              <h3>Danh sách câu hỏi</h3>
              <div className="custom-quiz-question-grid">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`custom-quiz-question-number ${isQuestionAnswered(index) ? 'answered' : ''}`}
                    onClick={() => scrollToQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="custom-quiz-submit-section">
            <button
              className="custom-quiz-submit-button"
              onClick={handleSubmitQuiz}
              disabled={!areAllQuestionsAnswered()}
            >
              Nộp bài
            </button>
          </div>
        </>
      )}

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default CustomQuiz;