import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './QuizMate.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

const QuizMate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const genAI = new GoogleGenerativeAI('AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Vui lòng tải ghi chú PDF.');
      return;
    }
    if (selectedFile.size > 20971520) {
      setError('Kích thước tệp quá lớn. Vui lòng chọn tệp nhỏ hơn 20MB.');
      return;
    }
    setLoading(true);
    setError('');
  
    const fileToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
  
    try {
      const pdfBase64 = await fileToBase64(selectedFile);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Tạo ${numQuestions} câu hỏi trắc nghiệm từ ghi chú PDF này với độ khó ${difficulty}. Vui lòng trả về dưới dạng JSON chỉ bao gồm nội dung JSON và không thêm bất kỳ văn bản nào khác:
      [
        {
          "type": "multiple-choice",
          "question": "Câu hỏi 1",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
          "explain": "Giải thích cho đáp án đúng"
        },
        {
          "type": "multiple-choice",
          "question": "Câu hỏi 2",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
          "explain": "Giải thích cho đáp án đúng"
        }
      ]`;
  
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: pdfBase64, mimeType: selectedFile.type } },
      ]);
  
      // Kiểm tra phản hồi từ API
      const responseText = result.response.text(); // Chắc chắn phản hồi là văn bản
      console.log('API Response:', responseText); // In ra phản hồi
  
      // Làm sạch phản hồi nếu cần
      const cleanText = responseText.replace(/```json|```/g, ''); // Xóa bỏ các ký tự không cần thiết
  
      const quizData = JSON.parse(cleanText); // Phân tích JSON từ văn bản sạch
      const formattedQuestions = quizData.map((q, index) => ({
        ...q,
        id: index,
      }));
  
      setQuizResult(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
      setLoading(false);
    }
  };

  const handleOptionClick = (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);
      const isCorrect = selectedAnswer === quizResult[currentQuestion].correctAnswer;
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (selectedOption === null) {
      setNotificationMessage('Bạn cần chọn đáp án trước khi tiếp tục.');
      setShowNotification(true);
      return;
    }

    setSelectedOption(null);

    const nextQ = currentQuestion + 1;
    if (nextQ < quizResult.length) {
      setCurrentQuestion(nextQ);
      const newProgress = (nextQ / quizResult.length) * 100;
      setProgress(newProgress);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizResult(null);
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

  return (
    <div className="quizmate-container">
      <section className="quizmate-section">
        <h2>QuizMate - Trợ thủ học tập của bạn</h2>
        <p>Biến ghi chú của bạn thành các câu đố tương tác và nhận phản hồi ngay lập tức.</p>
        {!quizResult ? (
          <form className="quizmate-form" onSubmit={handleSubmit}>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <label>Số lượng câu hỏi:</label>
            <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} min={1} max={50} />
            <label>Mức độ khó:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Đang tạo...' : 'Tạo bài kiểm tra'}</button>
          </form>
        ) : (
          <div className="quizmate-quiz">
            <div className="quizmate-progress-bar" style={{ width: `${progress}%` }}></div>
            {!quizCompleted ? (
              <div className="quizmate-question-container">
                <p dangerouslySetInnerHTML={{ __html: `${currentQuestion + 1}. ${quizResult[currentQuestion].question}` }} />
                <ul>
                  {quizResult[currentQuestion].options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={
                        selectedOption !== null &&
                        option === quizResult[currentQuestion].correctAnswer
                          ? 'quizmate-correct'
                          : selectedOption !== null &&
                            selectedOption === option &&
                            option !== quizResult[currentQuestion].correctAnswer
                          ? 'quizmate-incorrect'
                          : ''
                      }
                    >
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
                {selectedOption !== null && (
                  <>
                    <button onClick={toggleExplanation} className="quizmate-explanation-button">Giải thích</button>
                    {showExplanation && (
                      <div className="quizmate-explanation">
                        <p>Đáp án đúng: {quizResult[currentQuestion].correctAnswer}</p>
                        <p>Giải thích: {quizResult[currentQuestion].explain}</p>
                      </div>
                    )}
                  </>
                )}
                <button onClick={nextQuestion} className="quizmate-next-button">Câu hỏi tiếp theo</button>
                {showNotification && (
                  <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                  />
                )}
              </div>
            ) : (
              <div className="quizmate-completed">
                <h3>Hoàn thành</h3>
                <p>Điểm của bạn: {score} / {quizResult.length}</p>
                <button onClick={resetQuiz} className="quizmate-reset-button">Làm lại</button>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default QuizMate;

