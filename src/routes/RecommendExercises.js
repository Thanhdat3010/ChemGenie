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
import { API_KEY } from '../config';
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
      3. Sử dụng danh pháp hóa học quốc tế (tiếng anh)
      4. Câu hỏi được đặt bằng tiếng Việt
      5. Mỗi câu hỏi phải có giải thích chi tiết

      Trả về dưới dạng JSON với cấu trúc sau:
      [
        {
          "type": "multiple-choice",
          "question": "Câu hỏi trắc nghiệm 1",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
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
      const genAI = new GoogleGenerativeAI(API_KEY);
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
            const userChoice = userAnswer[optIdx] === true ? "Đúng" : "Sai";
            return userChoice === correctAnswer[optIdx] ? count + 1 : count;
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

      // Quy đi về thang điểm 10
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
      setIsSubmitted(true);
      setNotificationMessage("Nộp bài thành công!");
      setShowNotification(true);

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
      <div className="recommend-exercises-result-page">
        <div className="recommend-exercises-result-container">
          <h2>Kết quả</h2>
          <div className="recommend-exercises-score">
            <span>Điểm số của bạn:</span>
            <span>{score}/10</span>
          </div>
          
          <div className="recommend-exercises-detailed-results">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              let isCorrect = false;
              let partiallyCorrect = false;
              let correctCount = 0;
              
              if (question.type === 'multiple-choice') {
                isCorrect = userAnswer === question.correctAnswer;
              } else if (question.type === 'true-false') {
                correctCount = question.options.reduce((count, _, optIdx) => {
                  const userChoice = userAnswer[optIdx] === true ? "Đúng" : "Sai";
                  return userChoice === question.correctAnswer[optIdx] ? count + 1 : count;
                }, 0);
                isCorrect = correctCount === 4;
                partiallyCorrect = correctCount > 0 && correctCount < 4;
              } else if (question.type === 'short-answer') {
                isCorrect = userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase();
              }

              return (
                <div key={index} className={`recommend-exercises-result-item ${
                  isCorrect ? 'recommend-exercises-correct' : 
                  partiallyCorrect ? 'recommend-exercises-partially-correct' : 
                  'recommend-exercises-incorrect'
                }`}>
                  <h3>Câu {index + 1}</h3>
                  <p className="recommend-exercises-question-text">{question.question}</p>
                  
                  {question.type === 'true-false' ? (
                    <>
                      <p className="recommend-exercises-answer-status">
                        {correctCount}/4 phát biểu đúng
                      </p>
                      <div className="recommend-exercises-true-false-results">
                        {question.options.map((option, optIdx) => {
                          const userChoice = userAnswer[optIdx] === true ? "Đúng" : "Sai";
                          const isOptionCorrect = userChoice === question.correctAnswer[optIdx];
                          
                          return (
                            <div key={optIdx} className={`recommend-exercises-true-false-result ${isOptionCorrect ? 'recommend-exercises-correct' : 'recommend-exercises-incorrect'}`}>
                              <span className="recommend-exercises-option-text">{option}</span>
                              <span className="recommend-exercises-result-indicator">
                                {isOptionCorrect ? '✓' : '✗'} 
                                (Bạn chọn: {userChoice}, 
                                Đáp án: {question.correctAnswer[optIdx]})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="recommend-exercises-answer-status">
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </p>
                  )}
                  
                  {question.explain && (
                    <div className="recommend-exercises-explanation">
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
