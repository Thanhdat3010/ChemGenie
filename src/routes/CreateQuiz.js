import React, { useState } from 'react';
import './CreateQuiz.css';
import { db, auth } from '../components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Tesseract from 'tesseract.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import magic from "../assets/magic-dust.png";
import { Tabs, Tab } from 'react-bootstrap';
import TeacherQuizCreator from './TeacherQuizCreator';
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
  const [difficulty, setDifficulty] = useState('medium');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const extractTextFromImage = async (file) => {
    const text = await Tesseract.recognize(file, 'eng');
    return text.data.text;
  };

  const generateQuestionsFromAI = async (text) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Bạn là một chuyên gia hóa học có kinh nghiệm trong việc thiết kế câu hỏi trắc nghiệm cho giáo dục. 
      Hãy tạo cho tôi ${numQuestions} câu hỏi trắc nghiệm với độ khó: ${difficulty}. Các câu hỏi được tạo dựa trên văn bản sau: ${text}. 
      Mỗi câu hỏi cần có bốn lựa chọn đáp án, một đáp án đúng và giải thích kèm theo. 
      Đảm bảo rằng các công thức hóa học trong câu hỏi và đáp án có các chỉ số hóa học được hiển thị dưới dạng subscript (ví dụ: CH₄ thay vì CH4). 
      Câu hỏi phải được viết bằng tiếng Việt, nhưng tất cả các chất hóa học (trong câu hỏi, đáp án và giải thích) phải được viết theo danh pháp IUPAC (tiếng Anh).
      Kết quả trả về dưới dạng JSON với cấu trúc sau:
      ${JSON.stringify([
      {
        type: "multiple-choice",
        question: "Câu hỏi 1",
        options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        correctAnswer: "Đáp án đúng",
        explain: "Giải thích cho đáp án đúng"
      }
    ])}
    `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const cleanText = response.text()
      .replace(/`/g, '')
      .replace(/json/g, '')
      .replace(/\*/g, '')
      .replace(/\\"/g, '"')
      .replace(/'/g, "'") // Remove the backslash before the single quote
      .replace(/\\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
      console.log(cleanText);
      let generatedQuestions;
    try {
      generatedQuestions = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      alert('Đã xảy ra lỗi khi phân tích cú pháp JSON.');
      return;
    }
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
    setLoading(true);

    try {
      if (fileType.startsWith('image/')) {
        extractedText = await extractTextFromImage(file);
      }
      await generateQuestionsFromAI(extractedText);
    } catch (error) {
      console.error('Error extracting text from file:', error);
      alert('Đã xảy ra lỗi khi trích xuất văn bản từ tệp.');
    }finally {
      // Tắt trạng thái loading sau khi hoàn tất
      setLoading(false);
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
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Thêm một bước kiểm tra chủ đề trước khi tạo câu hỏi
      const checkTopicPrompt = `Chủ đề "${topic}" có phải là một chủ đ trong môn hóa học không? Trả lời "yes" hoặc "no".`;
      const checkTopicResult = await model.generateContent(checkTopicPrompt);
      const isChemistryTopic = checkTopicResult.response.text().toLowerCase().includes('yes');

      let finalTopic = topic;
      if (!isChemistryTopic) {
        finalTopic = "hóa học ngẫu nhiên";
      }

      const prompt = `Bạn là một chuyên gia hóa học có kinh nghiệm trong việc thiết kế câu hỏi trắc nghim cho giáo dục. 
      Hãy tạo cho tôi ${numQuestions} câu hỏi trắc nghiệm môn hóa học lớp ${grade} với chủ đề ${finalTopic} và độ khó: ${difficulty}. 
      Mỗi câu hỏi cần có đáp án đúng và giải thích chi tiết kèm theo.
      Câu hỏi phải đa dạng về nội dung và hình thức.
      Đảm bảo rằng các công thức hóa học trong câu hỏi và đáp án có các chỉ số hóa học được hiển thị dưới dạng subscript (ví dụ: CH₄ thay vì CH4). 
      Lưu ý:Câu hỏi được đặt bằng tiếng Việt, nhưng tất cả các chất hóa học (trong câu hỏi, đáp án và giải thích) phải được viết theo danh pháp IUPAC (tiếng Anh). 
      Đảm bảo rằng các câu hỏi chỉ liên quan đến môn hóa học.
      Kết quả cần được trả về dưới dạng JSON với cấu trúc sau:
      ${JSON.stringify([
        {
          type: "multiple-choice",
          question: "Câu hỏi 1",
          options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          correctAnswer: "Đáp án đúng",
          explain: "Giải thích cho đáp án đúng"
        }
      ])}
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();    
      // Giả sử text trả về là một chuỗi JSON các câu hỏi
      const cleanText = text
      .replace(/`/g, '')
      .replace(/json/g, '')
      .replace(/\*/g, '')
      .replace(/\\"/g, '"')
      .replace(/'/g, "'") // Remove the backslash before the single quote
      .replace(/\\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
      console.log(cleanText);

      // Kiểm tra nếu cleanText là JSON hợp lệ
      let generatedQuestions;
      try {
        generatedQuestions = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        alert('Đã xảy ra lỗi vui lòng thử lại.');
        return;
      }

      // Kiểm tra nếu generatedQuestions là một mảng
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
      alert('Đã xảy ra lỗi khi tạo câu hỏi từ AI vui lòng thử lại.');
    }finally {
      // Tắt trạng thái loading sau khi hoàn tất
      setLoading(false);
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
      setModalOpen(true);
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
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="create-quiz-page">
          <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
          <h2 className="solver-form-title">AI tạo đề thi</h2>
          <p className="solver-intro">Giải pháp hoàn hảo cho giáo viên và học sinh. Tự động tạo đề thi chất lợng cao, đa dạng, phù hợp mọi cấp học. Tiết kiệm thời gian, nâng cao hiệu quả</p>
          
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="student" title={<span style={{ color: activeTab === 'student' ? '#7b31c9' : 'black', fontWeight: activeTab === 'student' ? 'bold' : 'normal' }}>Học sinh</span>}>
            <div className="create-quiz-title-form">
      <h2 className="Createquizz-title-feature">Tạo bộ đề thi cho riêng bạn</h2>
      <input
        id="quizTitle"
        name="quizTitle"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Nhập tiêu đề bộ đề thi"
      />
          <input
          id="numQuestions"
          name="numQuestions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          placeholder="Nhập số lượng câu hỏi"
          min="1"

        />
         <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
        <select
          id="grade"
          name="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Chọn lớp của bạn</option>
          {[...Array(3)].map((_, i) => (
            <option key={i} value={10 + i}>{10 + i}</option>
          ))}
        </select>
        <input
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Nhập chủ đề của đề thi"
        />
    </div>
      <button className="create-quiz-add-question-btn" onClick={handleAddQuestionsFromAPI}>Tạo câu hỏi từ AI</button>
      {loading && (
  <div className="loader">
    <img src={magic} alt="Loading..." className="loading-icon" />
    <p>Đang tạo đề thi, vui lòng chờ...</p>
  </div>
)}
      <div className="create-quiz-file-upload">
      <h2 className="Createquizz-title-feature">Biến hình ảnh thành bài tập chỉ trong nháy mắt!</h2>
      <p className="solver-intro">Nếu bạn có hình ảnh câu hỏi hãy dùng tính năng này tạo đề thi</p>
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
      <h2 className="Createquizz-title-feature">Tự do sáng tạo đề: Bổ sung câu hỏi, tùy chỉnh theo ý muốn.</h2>
      <p className="solver-intro">Bổ sung câu hỏi vào bộ đề của bạn, hãy tạo câu hỏi tại đây</p>
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
            <label className="solver-intro">Tùy chỉnh các lựa chọn của câu hỏi</label>
            {[0, 1, 2, 3].map(index => (
              <input
                key={index}
                type="text"
                value={currentQuestion.options[index]}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Lựa chọn ${String.fromCharCode(65 + index)}`}
              />
            ))}
            <select
              id="correctAnswer"
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
            >
              <option value="">Chọn đáp án đúng</option>
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
            <select
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
            >
              <option value="">Chọn đáp án</option>
              <option value="true">Đúng</option>
              <option value="false">Sai</option>
            </select>
          </div>
        )}
        {currentQuestion.type === 'fill-in-the-blank' && (
          <>
            <input
              id="correctAnswer"
              name="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleInputChange}
              placeholder="Nhập đáp án đúng..."
            />
          </>
        )}
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
            </Tab>
            <Tab eventKey="teacher" title={<span style={{ color: activeTab === 'teacher' ? '#7b31c9' : 'black', fontWeight: activeTab === 'teacher' ? 'bold' : 'normal' }}>Giáo viên</span>}>
            <TeacherQuizCreator 
              quizTitle={quizTitle}
              setQuizTitle={setQuizTitle}
              questions={questions}
              setQuestions={setQuestions}
            />
          </Tab>
          </Tabs>
          <div className="create-quiz-question-list">
      <h2 className="Createquizz-title-feature">Danh sách câu hỏi</h2>
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
          {modalOpen && (
            <div className="modal" style={{ display: 'flex' }}>
              <div className="modal-content">
                <p>Bộ câu hỏi đã được lưu thành công!</p>
                <button className="close-btn" onClick={closeModal}>Đóng</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </container>
  );
};

export default CreateQuiz;