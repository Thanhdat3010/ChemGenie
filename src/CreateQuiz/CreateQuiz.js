import React, { useState } from 'react';
import './CreateQuiz.css';
import { db, auth } from '../components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Tesseract from 'tesseract.js';
const CreateQuiz = () => {
  const initialQuestionState = {
    type: 'multiple-choice',
    question: '',
    correctAnswer: '',
    explain: '',
    options: ['', '', '', ''],
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ ...initialQuestionState });
  const [quizTitle, setQuizTitle] = useState('');
  const [numQuestions, setNumQuestions] = useState(1);
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
  
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };


  const extractTextFromImage = async (file) => {
    const text = await Tesseract.recognize(file, 'eng');
    return text.data.text;
  };

  const generateQuestionsFromAI = async (text) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Hãy tạo cho tôi ${numQuestions} câu hỏi trắc nghiệm có đáp án và giải thích kèm theo từ văn bản sau: ${text} với cấu trúc:
      [
        {
          type: "multiple-choice",
          "question": "Câu hỏi 1",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": "Đáp án đúng",
          "explain": "Giải thích cho đáp án đúng"
        },
      ]. Kết quả trả về dạng JSON
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const cleanText = response.text().replace(/`/g, '').replace(/json/g, '');
      console.log(cleanText);
      const generatedQuestions = JSON.parse(cleanText);
      const questionsArray = Array.isArray(generatedQuestions) ? generatedQuestions : [generatedQuestions];
      questionsArray.forEach(question => {
        const newQuestion = {
          type: 'multiple-choice',
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explain: question.explain,
        };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      });
    } catch (error) {
      console.error('Error generating questions from AI:', error);
      alert('Đã xảy ra lỗi khi tạo câu hỏi từ AI.');
    }
  };

  const handleGenerateQuestions = async () => {
    if (!numQuestions || numQuestions <= 0) {
      alert('Vui lòng nhập số lượng câu hỏi hợp lệ.');
      return;
    }
    if (!file) {
      alert('Vui lòng tải lên tệp để trích xuất văn bản.');
      return;
    }
  
    let extractedText = '';
    const fileType = file.type;
    try {
      if (fileType.startsWith('image/')) {
        extractedText = await extractTextFromImage(file);
      }
      await generateQuestionsFromAI(extractedText);
    } catch (error) {
      console.error('Error extracting text from file:', error);
      alert('Đã xảy ra lỗi khi trích xuất văn bản từ tệp.');
    }
  };

  const handleAddQuestionsFromAPI = async () => {
    // Kiểm tra các thông tin bắt buộc
    if (!numQuestions || numQuestions <= 0) {
      alert('Vui lòng nhập số lượng câu hỏi hợp lệ.');
      return;
    }
  
    if (!grade) {
      alert('Vui lòng chọn lớp.');
      return;
    }
  
    if (!topic.trim()) {
      alert('Vui lòng nhập chủ đề.');
      return;
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Hãy tạo cho tôi ${numQuestions} câu hỏi trắc nghiệm môn hoá lớp ${grade} với chủ đề ${topic} có đáp án và giải thích kèm theo. Kết quả trả ra dạng JSON`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();    
      // Giả sử text trả về là một chuỗi JSON các câu hỏi
      const cleanText = text.replace(/`/g, ''); // Thay thế tất cả các backtick
      const cleanText1 = cleanText.replace(/json/g, ''); // Thay thế tất cả các backtick
      const generatedQuestions = JSON.parse(cleanText1);
      // Kiểm tra nếu generatedQuestions là một mảng
      const questionsArray = Array.isArray(generatedQuestions) ? generatedQuestions : [generatedQuestions];
      questionsArray.forEach(generatedQuestions => {
        const newQuestion = {
            type: 'multiple-choice',
            question: generatedQuestions.question,
            options: generatedQuestions.options,
            correctAnswer: generatedQuestions.answer,
            explain: generatedQuestions.explanation,
        };
  
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      });
    } catch (error) {
      console.error('Error generating questions from AI:', error);
      alert('Đã xảy ra lỗi khi tạo câu hỏi từ AI.');
    }
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question.trim() === '') {
      alert('Vui lòng nhập câu hỏi.');
      return;
    }

    if (currentQuestion.type === 'multiple-choice' && currentQuestion.options.some(option => option.trim() === '')) {
      alert('Vui lòng điền đầy đủ các lựa chọn cho câu hỏi.');
      return;
    }

    if (currentQuestion.type === 'fill-in-the-blank' && currentQuestion.correctAnswer.trim() === '') {
      alert('Vui lòng nhập đáp án cho câu hỏi điền từ.');
      return;
    }

    const newQuestion = {
      type: currentQuestion.type,
      question: currentQuestion.question.trim(),
      correctAnswer: currentQuestion.correctAnswer.trim(),
      explain: currentQuestion.explain.trim(),
    };

    if (currentQuestion.type === 'multiple-choice') {
      newQuestion.options = currentQuestion.options.map(option => option.trim());
    }

    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setCurrentQuestion({ ...initialQuestionState });
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
  };

  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (!user) {
      alert('Bạn cần đăng nhập để lưu bộ câu hỏi.');
      return;
    }
  
    if (quizTitle.trim() === '') {
      alert('Vui lòng nhập tiêu đề cho bộ câu hỏi.');
      return;
    }
  
    if (questions.length === 0) {
      alert('Bạn phải thêm ít nhất một câu hỏi để lưu.');
      return;
    }
  
    // Kiểm tra và loại bỏ các thuộc tính có giá trị undefined
    const cleanQuestions = questions.map(question => {
      const cleanedQuestion = { ...question };
      for (const key in cleanedQuestion) {
        if (cleanedQuestion[key] === undefined) {
          cleanedQuestion[key] = ''; // Hoặc giá trị mặc định phù hợp
        }
      }
      return cleanedQuestion;
    });
  
    try {
      const userId = user.uid;
      const docRef = doc(db, 'createdQuizzes', `${quizTitle}-${userId}`);
      await setDoc(docRef, { userId, title: quizTitle, questions: cleanQuestions });
      alert('Bộ câu hỏi đã được lưu thành công.');
      setQuizTitle('');
      setQuestions([]);
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Đã xảy ra lỗi khi lưu bộ câu hỏi.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      options: newOptions,
    }));
  };

  return (
    <div className="create-quiz-page">
      <h1 className="create-quiz-title">Tạo Bộ Câu Hỏi</h1>
      <div className="create-quiz-title-form">
      <label htmlFor="quizTitle">Tiêu đề bộ câu hỏi:</label>
      <input
        id="quizTitle"
        name="quizTitle"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Nhập tiêu đề bộ câu hỏi..."
      />
    </div>
      <div className="create-quiz-config">
        <label htmlFor="numQuestions">Số lượng câu hỏi:</label>
        <input
          id="numQuestions"
          name="numQuestions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          placeholder="Nhập số lượng câu hỏi..."
        />
        <label htmlFor="grade">Lớp:</label>
        <select
          id="grade"
          name="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">-- Chọn lớp --</option>
          {[...Array(3)].map((_, i) => (
            <option key={i} value={10 + i}>{10 + i}</option>
          ))}
        </select>
        <label htmlFor="topic">Chủ đề:</label>
        <input
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Nhập chủ đề..."
        />
      </div>
      <button className="create-quiz-add-question-btn" onClick={handleAddQuestionsFromAPI}>Tạo câu hỏi từ AI</button>
      <div className="create-quiz-file-upload">
      <label htmlFor="file">Tải lên tệp (png, jpg, ...):</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleFileUpload}
      />
    </div>
    <div className="create-quiz-add-questions">
    <button onClick={handleGenerateQuestions}>Tạo câu hỏi tự động</button>
      </div>
      <div className="create-quiz-question-form">
      <label htmlFor="questionType">Loại câu hỏi:</label>
        <select
          id="questionType"
          name="type"
          value={currentQuestion.type}
          onChange={handleInputChange}
        >
          <option value="multiple-choice">Trắc nghiệm</option>
          <option value="true-false">Đúng/Sai</option>
          <option value="fill-in-the-blank">Điền từ</option>
        </select>
        <label htmlFor="question">Câu hỏi:</label>
        <textarea
          id="question"
          name="question"
          value={currentQuestion.question}
          onChange={handleInputChange}
          rows={3}
          placeholder="Nhập câu hỏi của bạn..."
        />
        {currentQuestion.type === 'multiple-choice' && (
          <>
            <label>Các lựa chọn:</label>
            {[0, 1, 2, 3].map(index => (
              <input
                key={index}
                type="text"
                value={currentQuestion.options[index]}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Lựa chọn ${String.fromCharCode(65 + index)}`}
              />
            ))}
            <label htmlFor="correctAnswer">Đáp án đúng:</label>
            <select
              id="correctAnswer"
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn đáp án đúng --</option>
              {[0, 1, 2, 3].map(index => (
                <option key={index} value={currentQuestion.options[index]}>
                  {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </>
        )}
        {currentQuestion.type === 'true-false' && (
          <div>
            <label>Đáp án đúng:</label>
            <select
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn đáp án --</option>
              <option value="true">Đúng</option>
              <option value="false">Sai</option>
            </select>
          </div>
        )}
        {currentQuestion.type === 'fill-in-the-blank' && (
          <>
            <label htmlFor="correctAnswer">Đáp án đúng:</label>
            <input
              id="correctAnswer"
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
              placeholder="Nhập đáp án đúng..."
            />
          </>
        )}
        <label htmlFor="explain">Giải thích:</label>
        <textarea
          id="explain"
          name="explain"
          value={currentQuestion.explain}
          onChange={handleInputChange}
          rows={3}
          placeholder="Nhập giải thích cho câu hỏi..."
        />
    <button className="create-quiz-add-question-btn" onClick={handleAddQuestion}>Thêm câu hỏi</button>
    </div>
        <div className="create-quiz-question-list">
      <h2>Danh sách câu hỏi</h2>
      <ul>
      {questions.map((question, index) => (
      <li key={index}>
        <div className="create-quiz-question-content">
          <p dangerouslySetInnerHTML={{ __html: `<strong>Câu hỏi:</strong> ${question.question}` }} />            
          {question.type === 'multiple-choice' && (
            <div className="create-quiz-question-options">
              {question.options.map((option, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: `${String.fromCharCode(65 + i)} ${option}` }} />
              ))}
            </div>
          )}
          {question.type === 'fill-in-the-blank' && (
            <p><strong>Đáp án:</strong> {question.correctAnswer}</p>
          )}
          <p className="create-quiz-correct-answer" dangerouslySetInnerHTML={{ __html: `<strong>Đáp án đúng:</strong> ${question.correctAnswer || ''}` }} />
          <p dangerouslySetInnerHTML={{ __html: `<strong>Giải thích:</strong> ${question.explain}` }} />
          <button className='create-quiz-delete-question-btn' onClick={() => handleDeleteQuestion(index)}>Xóa</button>
        </div>
      </li>
    ))}
      </ul>
    </div>

    <button className="create-quiz-save-quiz-btn" onClick={handleSaveQuiz}>Lưu Bộ Câu Hỏi</button>
    </div>
  );
};

export default CreateQuiz;