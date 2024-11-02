import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './RecommendExercises.css';
import magic from "../assets/magic-dust.png";
import icon4 from "../assets/magic-dust.png";
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';
import icon3 from '../assets/highlighter.png';
import Notification from '../components/Notification';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const RecommendExercises = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?.email || 'defaultUser';
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setAnalysis(userData.analysis || 'Chưa có phân tích nào.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ Firestore:', error);
    }
  };

  const generateExercises = async () => {
    setLoading(true);
    
    const prompt = `Bạn là một chuyên gia trong việc tạo đề thi hóa học.
      Dựa trên kết quả đánh giá năng lực của học sinh: ${analysis}

      Hãy tạo một bộ câu hỏi hỗn hợp bao gồm:
      - 5 câu hỏi trắc nghiệm
      - 3 câu hỏi đúng/sai (mỗi câu có 4 phát biểu liên kết)
      - 2 câu hỏi trả lời ngắn (dạng tính toán)

      Yêu cầu QUAN TRỌNG về định dạng:
      1. TUYỆT ĐỐI KHÔNG sử dụng bất kỳ thẻ HTML nào
      2. KHÔNG sử dụng các ký tự đặc biệt hay định dạng HTML
      3. Chỉ sử dụng văn bản thuần túy (plain text)
      4. Với các công thức hóa học:
        - Viết chỉ số dưới bằng ký tự Unicode trực tiếp (ví dụ: H₂O, CO₂)
        - Sử dụng ký tự → cho mũi tên phản ứng
        - Sử dụng dấu ⇌ cho phản ứng thuận nghịch
      5. Với các đơn vị đo:
        - Viết m³ thay vì m3
        - Viết cm³ thay vì cm3
        - Viết độ C thay vì °C

      Yêu cầu về nội dung:
      1. Câu hỏi phải phù hợp với năng lực hiện tại của học sinh
      2. Độ khó tăng dần theo thứ tự câu hỏi
      3. Giữ nguyên danh pháp hóa học (IUPAC)
      4. Câu hỏi được đặt bằng tiếng Việt
      5. Mỗi câu hỏi phải có giải thích chi tiết

      Trả về dưới dạng JSON với cấu trúc sau:
      [
        {
          "type": "multiple-choice",
          "question": "Nội dung câu hỏi",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "explain": "Giải thích chi tiết"
        },
        {
          "type": "true-false",
          "question": "Câu dẫn + Nội dung câu hỏi",
          "options": ["Phát biểu 1", "Phát biểu 2", "Phát biểu 3", "Phát biểu 4"],
          "correctAnswer": ["Đúng", "Sai", "Đúng", "Sai"]
        },
        {
          "type": "short-answer",
          "question": "Nội dung câu hỏi tính toán",
          "correctAnswer": "Đáp án ngắn gọn",
          "explain": "Giải thích chi tiết"
        }
      ]`;

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanText = text.replace(/`/g, ''); // Thay thế tất cả các backtick
      const cleanText1 = cleanText.replace(/json/g, ''); // Thay thế tất cả các backtick
      
      console.log(cleanText1);
      const exercises = JSON.parse(cleanText1);
      const formattedExercises = exercises.map((ex, index) => ({
        type: ex.type,
        question: ex.question,
        options: ex.options,
        correctAnswer: ex.correctAnswer,
        explain: ex.explain,
        id: index
      }));

      setQuestions(formattedExercises);
      
      checkScore();
      setIsQuizStarted(true);
    } catch (error) {
      console.error('Lỗi khi tạo bài tập:', error);
    }

    setLoading(false);
  };

  const checkScore = () => {
    // Convert object values to array and count non-empty answers
    const answeredQuestions = Object.values(userAnswers).filter(Boolean).length;
    const score = (answeredQuestions / questions.length) * 100;
    setScore(score);
  };

  const handleOptionClick = (questionIndex, selectedAnswer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedAnswer
      }));
    }
  };

  const handleTrueFalseClick = (questionIndex, optionIndex, selectedAnswer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: {
          ...(prev[questionIndex] || {}),
          [optionIndex]: selectedAnswer === true
        }
      }));
    }
  };

  const handleShortAnswerChange = (questionIndex, answer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: answer.trim()
      }));
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

  const handleSubmitQuiz = async () => {
    // Kiểm tra xem đã trả lời hết các câu hỏi chưa
    const allQuestionsAnswered = questions.every((_, index) => isQuestionAnswered(index));
    
    if (!allQuestionsAnswered) {
      setNotificationMessage("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!");
      setShowNotification(true);
      return;
    }

    try {
      let totalScore = 0;
      const detailedAnswers = questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        let isCorrect = false;
        let questionScore = 0;
        
        console.log(`Question ${index + 1}:`, {
          type: question.type,
          userAnswer,
          correctAnswer
        });

        if (question.type === 'multiple-choice') {
          isCorrect = String(userAnswer).trim() === String(correctAnswer).trim();
          questionScore = isCorrect ? 1 : 0;
        } 
        else if (question.type === 'true-false') {
          const correctCount = question.options.reduce((count, _, optIdx) => {
            const userBool = Boolean(userAnswer[optIdx]);
            const correctBool = correctAnswer[optIdx] === "Đúng" || correctAnswer[optIdx] === true;
            return count + (userBool === correctBool ? 1 : 0);
          }, 0);
          
          questionScore = (correctCount / 4) * 2;
          isCorrect = correctCount === 4;
        } 
        else if (question.type === 'short-answer') {
          const normalizedUser = String(userAnswer).toLowerCase().trim();
          const normalizedCorrect = String(correctAnswer).toLowerCase().trim();
          isCorrect = normalizedUser === normalizedCorrect;
          questionScore = isCorrect ? 3 : 0;
        }

        totalScore += questionScore;

        console.log(`Score for question ${index + 1}:`, {
          isCorrect,
          questionScore,
          totalScore
        });

        return {
          questionType: question.type,
          question: question.question,
          userAnswer,
          correctAnswer,
          isCorrect,
          score: questionScore
        };
      });

      const finalScore = (totalScore * 10) / 13;
      setScore(Math.round(finalScore * 100) / 100);
      setIsSubmitted(true);
      setNotificationMessage("Nộp bài thành công!");
      setShowNotification(true);

      console.log('Final calculation:', {
        totalScore,
        finalScore: Math.round(finalScore * 100) / 100
      });

    } catch (error) {
      console.error('Error submitting quiz:', error);
      setNotificationMessage("Có lỗi xảy ra khi nộp bài: " + error.message);
      setShowNotification(true);
    }
  };

  const scrollToQuestion = (questionIndex) => {
    const questionElement = document.getElementById(`question-${questionIndex}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatTextWithLineBreaks = (text) => {
    if (!text) return null;  // Kiểm tra nếu text là null hoặc undefined
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return null;
  
      // Loại bỏ các ký hiệu đặc biệt
      const cleanedLine = line.replace(/^[\*\#\-\s]+/, '').replace(/\*\*/g, '');
  
      let iconSrc = '';
  
      if (cleanedLine.startsWith('1.') || cleanedLine.startsWith('Phân tích kết quả')) {
        iconSrc = icon4;
      } else if (cleanedLine.startsWith('2.') || cleanedLine.startsWith('Đánh giá kỹ năng:')) {
        iconSrc = icon1;
      } else if (cleanedLine.startsWith('3.') || cleanedLine.startsWith('Phân loại năng lực')) {
        iconSrc = icon2;
      } else if (cleanedLine.startsWith('4.') || cleanedLine.startsWith('Nhận xét')) {
        iconSrc = icon3;
      }
  
      if (iconSrc) {
        return (
          <p key={index}>
            <img src={iconSrc} alt="icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
            <strong style={{ color: '#7b31c9',}}>{cleanedLine}</strong>
          </p>
        );
      }
  
      return <p key={index} className="AI-content">{cleanedLine}</p>;
    });
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (!isQuizStarted) {
    return (
      <container fluid>
        <Navbar />
        <section className="full-screen">
          <div className="recommend-exercises-page">
            <div className="solver-tag">
              <p className="solver-name">
                <img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục
              </p>
            </div>
            <h2 className="solver-form-title">Trợ lý học tập AI</h2>
            <p className="solver-intro">
              AI sẽ tự động tạo ra bộ bài tập dựa trên kết quả tính toán năng lực hiện tại của bạn, 
              trợ lý học tập của chúng tôi sẽ đồng hành với bạn trên chặng đường học tập.
            </p>
            <button 
              className="recommend-exercises-generate-btn" 
              onClick={generateExercises} 
              disabled={loading}
            >
              {loading ? 'Đang tạo bài tập...' : 'Tạo bài tập mới'}
            </button>
            
            {loading && (
              <div className="recommend-exercises-loading-container">
                <div className="recommend-exercises-loader"></div>
                <p className="recommend-exercises-loading-text">
                  Chúng tôi đang đánh giá năng lực của bạn để đưa các bài tập phù hợp cho việc huấn luyện...
                </p>
              </div>
            )}
            
            <div className="recommend-exercises-analyze-results">
              <div className="recommend-exercises-analysis-content">
                <p>{formatTextWithLineBreaks(analysis)}</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </container>
    );
  }

  if (isSubmitted) {
    return (
      <div className="quiz-room-page">
        <div className="quiz-result">
          <h2>Kết quả</h2>
          <p>Điểm số của bạn: {score}/{questions.length}</p>
          
          <div className="detailed-results">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              let isCorrect = false;
              let partiallyCorrect = false;
              let correctCount = 0;
              
              if (question.type === 'multiple-choice') {
                isCorrect = userAnswer === question.correctAnswer;
              } else if (question.type === 'true-false') {
                correctCount = question.options.reduce((count, _, optIdx) => {
                  const userBool = Boolean(userAnswer[optIdx]);
                  const correctBool = question.correctAnswer[optIdx] === "Đúng" || question.correctAnswer[optIdx] === true;
                  return count + (userBool === correctBool ? 1 : 0);
                }, 0);
                isCorrect = correctCount === 4;
                partiallyCorrect = correctCount > 0 && correctCount < 4;
              } else if (question.type === 'short-answer') {
                isCorrect = userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase();
              }

              return (
                <div key={index} className={`result-item ${isCorrect ? 'correct' : partiallyCorrect ? 'partially-correct' : 'incorrect'}`}>
                  <h3>Câu {index + 1}</h3>
                  <p className="question-text">{question.question}</p>
                  
                  {question.type === 'true-false' ? (
                    <>
                      <p className="answer-status">
                        {correctCount}/4 phát biểu đúng
                      </p>
                      <div className="true-false-results">
                        {question.options.map((option, optIdx) => {
                          const userBool = Boolean(userAnswer[optIdx]);
                          const correctBool = question.correctAnswer[optIdx] === "Đúng" || question.correctAnswer[optIdx] === true;
                          const isOptionCorrect = userBool === correctBool;
                          
                          return (
                            <div key={optIdx} className={`true-false-result ${isOptionCorrect ? 'correct' : 'incorrect'}`}>
                              <span className="option-text">{option}</span>
                              <span className="result-indicator">
                                {isOptionCorrect ? '✓' : '✗'} 
                                (Bạn chọn: {userBool ? 'Đúng' : 'Sai'}, 
                                Đáp án: {correctBool ? 'Đúng' : 'Sai'})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="answer-status">
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </p>
                  )}
                  
                  {question.explain && (
                    <div className="explanation">
                      <h4>Giải thích:</h4>
                      <p>{question.explain}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="recommend-exercises-buttons">
            <button onClick={handleReturnHome} className="recommend-exercises-home">
              Về trang chủ
            </button>
            <button 
              onClick={() => {
                setIsQuizStarted(false);
                setIsSubmitted(false);
                setUserAnswers({});
                setScore(0);
              }} 
              className="recommend-exercises-retry"
            >
              Làm lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommend-exercises-wrapper">
      <div className="recommend-exercises-content">
        <div className="recommend-exercises-quiz-container">
          <div className="recommend-exercises-questions-section">
            <div className="recommend-exercises-questions-container">
              {questions.map((question, index) => (
                <div key={index} id={`question-${index}`} className="recommend-exercises-question-box">
                  <h3>Câu {index + 1}</h3>
                  <p className="recommend-exercises-question-text">{question.question}</p>

                  {question.type === 'multiple-choice' && (
                    <div className="recommend-exercises-options-grid">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`recommend-exercises-option-button ${
                            userAnswers[index] === option ? 'selected' : ''
                          }`}
                          onClick={() => handleOptionClick(index, option)}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="recommend-exercises-true-false-options">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="recommend-exercises-true-false-option">
                          <div className="recommend-exercises-option-row">
                            <span className="recommend-exercises-option-text">{option}</span>
                            <div className="recommend-exercises-radio-group">
                              <label className="recommend-exercises-radio-label">
                                <input
                                  type="radio"
                                  name={`q${index}-opt${optionIndex}`}
                                  checked={userAnswers[index]?.[optionIndex] === true}
                                  onChange={() => handleTrueFalseClick(index, optionIndex, true)}
                                />
                                <span className="recommend-exercises-radio-text">Đúng</span>
                              </label>
                              <label className="recommend-exercises-radio-label">
                                <input
                                  type="radio"
                                  name={`q${index}-opt${optionIndex}`}
                                  checked={userAnswers[index]?.[optionIndex] === false}
                                  onChange={() => handleTrueFalseClick(index, optionIndex, false)}
                                />
                                <span className="recommend-exercises-radio-text">Sai</span>
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
                      className="recommend-exercises-short-answer-input"
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                      placeholder="Nhập câu trả lời..."
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="recommend-exercises-question-navigator">
            <h3>Danh sách câu hỏi</h3>
            <div className="recommend-exercises-question-grid">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`recommend-exercises-question-number ${
                    isQuestionAnswered(index) ? 'answered' : ''
                  }`}
                  onClick={() => scrollToQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recommend-exercises-submit-section">
          <button
            className="recommend-exercises-submit-button"
            onClick={handleSubmitQuiz}
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendExercises;
