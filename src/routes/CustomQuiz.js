import React, { useState, useEffect } from 'react';
import './CustomQuiz.css';
import Notification from '../components/Notification';
import { db, auth } from '../components/firebase';
import { getDocs, collection, deleteDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore';

const CustomQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingData, setEditingData] = useState(null);
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
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const viewQuizDetails = (quiz) => {
    setQuestions(quiz.questions || []);
    setCurrentQuizId(quiz.id);
  };

  const deleteQuiz = async (quizId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setNotificationMessage("Vui lòng đăng nhập để thực hiện thao tác này");
        setShowNotification(true);
        return;
      }

      await deleteDoc(doc(db, 'createdQuizzes', quizId));
      setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
      
      setNotificationMessage("Đã xóa bài kiểm tra thành công");
      setShowNotification(true);
    } catch (error) {
      console.error('Error deleting quiz:', error);
      setNotificationMessage("Có lỗi khi xóa bài kiểm tra");
      setShowNotification(true);
    }
  };

  const handleEditClick = (index, question) => {
    setEditingQuestion(index);
    setEditingData({ ...question });
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditingData(null);
  };

  const handleSaveEdit = async (index) => {
    try {
      const newQuestions = [...questions];
      newQuestions[index] = editingData;
      setQuestions(newQuestions);
      
      // Cập nhật trong Firestore
      if (auth.currentUser) {
        const quizRef = doc(db, 'createdQuizzes', currentQuizId);
        await setDoc(quizRef, { questions: newQuestions }, { merge: true });
        setNotificationMessage("Đã cập nhật câu hỏi thành công");
        setShowNotification(true);
      }

      setEditingQuestion(null);
      setEditingData(null);
    } catch (error) {
      console.error('Error saving question:', error);
      setNotificationMessage("Có lỗi khi lưu câu hỏi");
      setShowNotification(true);
    }
  };

  const handleDeleteQuestion = async (index) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?");
    if (confirmDelete) {
      try {
        // Xóa câu hỏi khỏi state
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);

        // Cập nhật trong Firestore
        if (auth.currentUser) {
          const quizRef = doc(db, 'createdQuizzes', currentQuizId);
          await setDoc(quizRef, { questions: newQuestions }, { merge: true });
          setNotificationMessage("Đã xóa câu hỏi thành công");
          setShowNotification(true);
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        setNotificationMessage("Có lỗi khi xóa câu hỏi");
        setShowNotification(true);
      }
    }
  };

  return (
    <div className="custom-quiz-room-page">
      {questions.length === 0 ? (
        <div className="custom-quiz-list-container">
          <h2 className="custom-quiz-list-title">Bộ câu hỏi của bạn</h2>
          <div className="custom-quiz-list">
            {quizzes.map((quiz, index) => (
              <div key={index} className="custom-quiz-item">
                <h3>{quiz.title}</h3>
                <button onClick={() => viewQuizDetails(quiz)} className="custom-quiz-start-button">
                  Xem chi tiết
                </button>
                <button onClick={() => deleteQuiz(quiz.id)} className="custom-quiz-delete-button">
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="custom-quiz-container">
          <div className="custom-quiz-questions-section">
            {questions.map((question, index) => (
              <div key={index} className="custom-quiz-question-box" id={`question-${index}`}>
                {editingQuestion === index ? (
                  <div className="teacher-quiz-creator-edit-form">
                    {editingData.type === 'multiple-choice' && (
                      <>
                        <div className="teacher-quiz-creator-edit-group">
                          <label>Câu hỏi:</label>
                          <textarea
                            value={editingData.question}
                            onChange={(e) => setEditingData({
                              ...editingData,
                              question: e.target.value
                            })}
                            className="teacher-quiz-creator-edit-textarea"
                            placeholder="Nhập câu hỏi"
                          />
                        </div>
                        <div className="teacher-quiz-creator-edit-options">
                          {editingData.options.map((option, i) => (
                            <div key={i} className="teacher-quiz-creator-edit-option-item">
                              <label>{String.fromCharCode(65 + i)}:</label>
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...editingData.options];
                                  newOptions[i] = e.target.value;
                                  setEditingData({
                                    ...editingData,
                                    options: newOptions
                                  });
                                }}
                                className="teacher-quiz-creator-edit-input"
                                placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="teacher-quiz-creator-edit-group">
                          <label>Đáp án đúng:</label>
                          <select
                            value={editingData.correctAnswer}
                            onChange={(e) => setEditingData({
                              ...editingData,
                              correctAnswer: e.target.value
                            })}
                            className="teacher-quiz-creator-edit-select"
                          >
                            {editingData.options.map((option, i) => (
                              <option key={i} value={option}>
                                {String.fromCharCode(65 + i)}: {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {editingData.type === 'true-false' && (
                      <>
                        <div className="teacher-quiz-creator-edit-group">
                          <label>Câu dẫn:</label>
                          <textarea
                            value={editingData.question}
                            onChange={(e) => setEditingData({
                              ...editingData,
                              question: e.target.value
                            })}
                            className="teacher-quiz-creator-edit-textarea"
                            placeholder="Nhập câu dẫn"
                          />
                        </div>
                        {editingData.options.map((option, i) => (
                          <div key={i} className="teacher-quiz-creator-edit-option-item">
                            <label>{String.fromCharCode(97 + i)}):</label>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...editingData.options];
                                newOptions[i] = e.target.value;
                                setEditingData({
                                  ...editingData,
                                  options: newOptions
                                });
                              }}
                              className="teacher-quiz-creator-edit-input"
                              placeholder={`Phát biểu ${i + 1}`}
                            />
                            <select
                              value={editingData.correctAnswer[i]}
                              onChange={(e) => {
                                const newCorrectAnswer = [...editingData.correctAnswer];
                                newCorrectAnswer[i] = e.target.value === 'true';
                                setEditingData({
                                  ...editingData,
                                  correctAnswer: newCorrectAnswer
                                });
                              }}
                              className="teacher-quiz-creator-edit-select"
                            >
                              <option value="true">Đúng</option>
                              <option value="false">Sai</option>
                            </select>
                          </div>
                        ))}
                      </>
                    )}

                    {editingData.type === 'short-answer' && (
                      <>
                        <div className="teacher-quiz-creator-edit-group">
                          <label>Câu hỏi:</label>
                          <textarea
                            value={editingData.question}
                            onChange={(e) => setEditingData({
                              ...editingData,
                              question: e.target.value
                            })}
                            className="teacher-quiz-creator-edit-textarea"
                            placeholder="Nhập câu hỏi"
                          />
                        </div>
                        <div className="teacher-quiz-creator-edit-group">
                          <label>Đáp án:</label>
                          <input
                            type="text"
                            value={editingData.correctAnswer}
                            onChange={(e) => setEditingData({
                              ...editingData,
                              correctAnswer: e.target.value
                            })}
                            className="teacher-quiz-creator-edit-input"
                            placeholder="Nhập đáp án"
                          />
                        </div>
                      </>
                    )}

                    <div className="teacher-quiz-creator-edit-actions">
                      <button 
                        className="teacher-quiz-creator-edit-cancel"
                        onClick={handleCancelEdit}
                      >
                        Hủy
                      </button>
                      <button 
                        className="teacher-quiz-creator-edit-save"
                        onClick={() => handleSaveEdit(index)}
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>Câu {index + 1}</h3>
                    <p className="custom-quiz-question-text">{question.question}</p>

                    {question.type === 'multiple-choice' && (
                      <div className="custom-quiz-question-options">
                        {question.options.map((option, i) => (
                          <p key={i}>{String.fromCharCode(65 + i)}. {option}</p>
                        ))}
                        <p className="custom-quiz-correct-answer">
                          <strong>Đáp án đúng:</strong> {question.correctAnswer}
                        </p>
                        <p><strong>Giải thích:</strong> {question.explain}</p>
                      </div>
                    )}

                    {question.type === 'true-false' && (
                      <div className="custom-quiz-question-options">
                        {question.options.map((option, i) => (
                          <p key={i}>
                            {String.fromCharCode(97 + i)}) {option} - {question.correctAnswer[i] ? 'Đúng' : 'Sai'}
                          </p>
                        ))}
                      </div>
                    )}

                    {question.type === 'short-answer' && (
                      <div className="custom-quiz-question-options">
                        <p className="custom-quiz-correct-answer">
                          <strong>Đáp án:</strong> {question.correctAnswer}
                        </p>
                      </div>
                    )}

                    <div className="teacher-quiz-creator-actions">
                      <button 
                        className="teacher-quiz-creator-edit-btn"
                        onClick={() => handleEditClick(index, question)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="create-quiz-delete-question-btn"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        Xóa
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
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