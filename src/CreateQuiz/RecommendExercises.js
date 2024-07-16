import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './RecommendExercises.css';
import Notification from '../components/Notification';

const RecommendExercises = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const [showCongrats, setShowCongrats] = useState(false);

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
    
    const prompt = `
      Bạn là một hệ thống đề xuất bài tập hóa học và bạn đã nhận được kết quả đánh giá năng lực của học sinh như sau: ${analysis}. Dựa trên đánh giá này, bạn cần tạo ra các bài tập trắc nghiệm giúp học sinh cải thiện năng lực của mình
      Dưới đây là các bước bạn cần thực hiện
      1. Phân tích đánh giá:
      - Xác định các kỹ năng và chủ đề mà học sinh cần cải thiện dựa trên kết quả đánh giá (ví dụ: cân bằng phương trình hóa học, hiểu biết về bảng tuần hoàn, phản ứng hóa học, tính toán hóa học, v.v.).
      2. Chọn bài tập phù hợp:
      - Tìm các bài tập liên quan đến các chủ đề và kỹ năng mà học sinh cần cải thiện.
      - Đảm bảo rằng các bài tập có độ khó phù hợp với mức năng lực hiện tại của học sinh và có tính thử thách để giúp họ tiến bộ.
      3. Đề xuất bài tập:
      - Tạo danh sách các bài tập cụ thể cho học sinh, bao gồm mô tả ngắn gọn về mỗi bài tập và hướng dẫn làm bài.
      .Vui lòng trả về dưới dạng JSON với cấu trúc sau và không thêm những cái khác ngoài cấu trúc:
      
      [
        {
          type: "multiple-choice",
          "question": "Câu hỏi 1",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
          "explain": "Giải thích cho đáp án đúng"
        },
        {
          type: "multiple-choice",
          "question": "Câu hỏi 2",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
          "explain": "Giải thích cho đáp án đúng"
        }
      ]
    `;

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
    } catch (error) {
      console.error('Lỗi khi tạo bài tập:', error);
    }

    setLoading(false);
  };

  const checkScore = () => {
    const score = (answerState.filter(Boolean).length / questions.length) * 100;
    setShowCongrats(score >= 80);
  };

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

  const nextQuestion = () => {
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
      checkScore();
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswerState([]);
    setScore(0);
    setProgress(0);
    setQuizCompleted(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const formatTextWithLineBreaks = (text) => {
    if (!text) return null;  // Kiểm tra nếu text là null hoặc undefined
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return null;
  
      // Loại bỏ các ký hiệu đặc biệt
      const cleanedLine = line.replace(/^[\*\#\-\s]+/, '').replace(/\*\*/g, '');
  
      if (
        cleanedLine.startsWith('1.') || cleanedLine.startsWith('2.') ||
        cleanedLine.startsWith('3.') || cleanedLine.startsWith('4.') || cleanedLine.startsWith('5.') ||
        cleanedLine.startsWith('Phân tích kết quả') || cleanedLine.startsWith('Đánh giá kỹ năng:') ||
        cleanedLine.startsWith('Phân loại năng lực') || cleanedLine.startsWith('Đưa ra nhận xét') ||
        cleanedLine.startsWith('Nhận xét')
      ) {
        return <p key={index}><strong>{cleanedLine}</strong></p>;
      }
      return <p key={index}>{cleanedLine}</p>;
    });
  };

  if (quizCompleted) {
    return (
      <div className="recommend-exercises-hoan-thanh">
        <h2>Hoàn thành</h2>
        <div className="recommend-exercises-score-container">
          <p className="recommend-exercises-score-label">Điểm số của bạn:</p>
          <p className="recommend-exercises-score">{score}</p>
          <button onClick={resetQuiz} className="recommend-exercises-next-button">Làm lại</button>
        </div>
        {showCongrats ? (
          <p className="recommend-exercises-congrats">Chúc mừng! Bạn đã đạt trên 80%!</p>
        ) : (
          <p className="recommend-exercises-try-again">Bạn chưa đạt trên 80%. Hãy tiếp tục cố gắng!</p>
        )}
      </div>
    );
  }

  return (
    <div className="recommend-exercises-page">
      {questions.length === 0 ? (
        <>
          <h1 className="recommend-exercises-title">AI Đề Xuất Bài Tập Theo Năng Lực</h1>
          <p>Bạn có muốn cải thiện năng lực để có kết quả đánh giá tốt hơn không?</p>
          <button className="recommend-exercises-generate-btn" onClick={generateExercises} disabled={loading}>
            {loading ? 'Đang tạo bài tập...' : 'Tạo bài tập mới'}
          </button>
          <div>
          {loading && (
            <div className="recommend-exercises-loading-container">
              <div className="recommend-exercises-loader"></div>
              <p className="recommend-exercises-loading-text">Chúng tôi đang đánh giá năng lực của bạn để đưa các bài tập phù hợp cho việc huấn luyện...</p>
            </div>
          )}
        </div>
          <div className="recommend-exercises-analyze-results">
            <div className="recommend-exercises-analysis-content">
              <p>{formatTextWithLineBreaks(analysis)}</p>
            </div>
          </div>
          {showCongrats && <p className="recommend-exercises-congrats">Chúc mừng! Bạn đã đạt trên 80%!</p>}
        </>
      ) : (
        <div className="recommend-exercises-questions-container">
          <div className="recommend-exercises-progress-bar" style={{ width: `${progress}%` }}></div>
          {currentQuestion < questions.length && (
            <div className="recommend-exercises-question">
            <p dangerouslySetInnerHTML={{ __html: `${currentQuestion + 1}. ${questions[currentQuestion].question}` }} />
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
                          ? "recommend-exercises-correct"
                          : selectedOption !== null &&
                            answerState[currentQuestion] !== null &&
                            selectedOption === option &&
                            option !== questions[currentQuestion].correctAnswer
                          ? "recommend-exercises-incorrect"
                          : ""
                      }
                    >
                      <span dangerouslySetInnerHTML={{ __html: `(${String.fromCharCode(65 + index)}) ${option}` }} />
                      {selectedOption === option && answerState[currentQuestion] !== null && option === questions[currentQuestion].correctAnswer ? <span className="recommend-exercises-correct-mark">&#10003;</span> : ''}
                      {selectedOption === option && answerState[currentQuestion] !== null && option !== questions[currentQuestion].correctAnswer ? <span className="recommend-exercises-incorrect-mark">&#10007;</span> : ''}
                    </li>
                  ))}
                </ul>
              )}
              {selectedOption !== null && (
                <>
                  <button onClick={toggleExplanation} className="recommend-exercises-explanation-button">Giải thích</button>
                  {showExplanation && (
                    <div className="recommend-exercises-explanation">
                    <p>Đáp án đúng: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].correctAnswer.toString() }} /></p>
                    <p>Giải thích: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].explain }} /></p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {currentQuestion < questions.length && (
            <button onClick={nextQuestion} className="recommend-exercises-next-button">Câu hỏi tiếp theo</button>
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

export default RecommendExercises;