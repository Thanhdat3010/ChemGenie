import React, { useState } from 'react';
import './CreateQuiz.css';
import { db, auth } from '../components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
    correctAnswers: ['Đúng', 'Đúng', 'Đúng', 'Đúng']
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ ...initialQuestionState });
  const [quizTitle, setQuizTitle] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: true,
    shortAnswer: true
  });

  // Thêm states cho số lượng câu hỏi mỗi loại
  const [numMultipleChoice, setNumMultipleChoice] = useState('');
  const [numTrueFalse, setNumTrueFalse] = useState('');
  const [numShortAnswer, setNumShortAnswer] = useState('');

  const closeModal = () => {
    setModalOpen(false);
  };
  

  

  const handleAddQuestionsFromAPI = async () => {
    // Tính tổng số câu hỏi đã chọn
    const selectedMultipleChoice = parseInt(numMultipleChoice) || 0;
    const selectedTrueFalse = parseInt(numTrueFalse) || 0;
    const selectedShortAnswer = parseInt(numShortAnswer) || 0;
    const totalSelectedQuestions = selectedMultipleChoice + selectedTrueFalse + selectedShortAnswer;

    // Kiểm tra tổng số câu
    if (totalSelectedQuestions === 0) {
      alert('Vui lòng nhập số lượng câu hỏi cho ít nhất một loại.');
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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
      
      const prompt = `Bạn là một chuyên gia trong việc tạo đề thi hóa học.
        Hãy tạo bộ câu hỏi hóa học lớp ${grade} với chủ đề ${topic} và độ khó ${difficulty}.
        Tổng số câu hỏi cần tạo là ${totalSelectedQuestions} câu, bao gồm:
        ${selectedMultipleChoice > 0 ? `- ${selectedMultipleChoice} câu hỏi trắc nghiệm với 4 lựa chọn` : ''}
        ${selectedTrueFalse > 0 ? `- ${selectedTrueFalse} câu hỏi đúng/sai với 4 phát biểu` : ''}
        ${selectedShortAnswer > 0 ? `- ${selectedShortAnswer} câu hỏi điền đáp án ngắn` : ''}

        Lưu ý quan trọng: nếu chủ đề không liên quan tới hóa thì tự tạo ngẫu nhiên một chủ đề liên quan tới hóa học.
        
        Yêu cầu QUAN TRỌNG về định dạng:
        1. TUYỆT ĐỐI KHÔNG sử dụng bất kỳ thẻ HTML nào (<sub>, <sup>, <br>, etc.)
        2. KHÔNG sử dụng các ký tự đặc biệt hay định dạng HTML như &nbsp;
        3. Chỉ sử dụng văn bản thuần túy (plain text)
        4. Với các công thức hóa học:
         - Viết chỉ số dưới bằng ký tự Unicode trực tiếp (ví dụ: H₂O, CO₂)
         - Sử dụng ký tự → cho mũi tên phản ứng
         - Sử dụng dấu ⇌ cho phản ứng thuận nghịch
        5. Với các đơn vị đo:
         - Viết m³ thay vì m3
         - Viết cm³ thay vì cm3
         - Viết độ C thay vì °C
        6. Với các số mũ và chỉ số:
         - Sử dụng ký tự Unicode trực tiếp (ví dụ: x², x₁, x₂)

        Các yêu cầu về nội dung:
        1. Tạo đủ số lượng câu hỏi theo yêu cầu
        2. Các câu hỏi không được giống nhau, các đáp án trong cùng một câu không được giống nhau
        3. ĐẶC BIỆT QUAN TRỌNG: Sử dụng danh pháp hóa học IUPAC (tiếng Anh) cho tất cả các chất
        4. Câu hỏi được đặt bằng tiếng Việt
        5. Đảm bảo các công thức hóa học có chỉ số dưới dạng subscript (ví dụ: CH₄)
        6. Đảm bảo các câu hỏi chỉ liên quan đến môn hóa học
        
        Yêu cầu cho từng loại câu hỏi:
        - Trắc nghiệm: 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết
        - Đúng/sai: 4 phát biểu liên kết, có câu dẫn, phát biểu cuối khó nhất
        - Trả lời ngắn: phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(không có chữ nha), bỏ các dạng toán đốt cháy.
        Trả về kết quả dưới dạng JSON với cấu trúc sau:
        ${JSON.stringify([
          {
            type: "multiple-choice",
            question: "Câu hỏi trắc nghiệm",
            options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
            correctAnswer: "Đáp án đúng",
            explain: "Giải thích cho đáp án đúng"
          },
          {
            type: "true-false",
            question: "Câu hỏi đúng/sai",
            options: ["Phát biểu A", "Phát biểu B", "Phát biểu C", "Phát biểu D"],
            correctAnswer: ["Đúng", "Sai", "Đúng", "Sai"]
          },
          {
            type: "short-answer",
            question: "Câu hỏi điền đáp án(câu hỏi tính toán)",
            correctAnswer: "Đáp án ngắn gọn(kết quả tính toán)"
          }
        ])}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();    
      
      // Làm sạch text response
      const cleanText = text
        .replace(/`/g, '')
        .replace(/json/g, '')
        .replace(/\*/g, '')
        .replace(/\\"/g, '"')
        .replace(/'/g, "'")
        .replace(/\\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

      // Parse JSON và kiểm tra
      let generatedQuestions;
      try {
        generatedQuestions = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        alert('Đã xảy ra lỗi vui lòng thử lại.');
        return;
      }

      // Đảm bảo generatedQuestions là một mảng
      const questionsArray = Array.isArray(generatedQuestions) ? generatedQuestions : [generatedQuestions];

      // Thay đổi phần này để thay thế hoàn toàn bộ câu hỏi cũ
      setQuestions(questionsArray.map(question => ({
        type: question.type,
        question: question.question,
        options: question.options || [],
        correctAnswer: question.correctAnswer,
        explain: question.explain || ''
      })));

    } catch (error) {
      console.error('Error generating questions from AI:', error);
      alert('Đã xảy ra lỗi khi tạo câu hỏi từ AI vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question.trim() === '') {
      alert('Vui lòng nhập câu hỏi.');
      return;
    }

    switch (currentQuestion.type) {
      case 'multiple-choice':
        if (currentQuestion.options.some(option => option.trim() === '')) {
          alert('Vui lòng điền đầy đủ các lựa chọn cho câu hỏi.');
          return;
        }
        if (!currentQuestion.correctAnswer) {
          alert('Vui lòng chọn đáp án đúng.');
          return;
        }
        break;

      case 'true-false':
        if (currentQuestion.options.some(option => option.trim() === '')) {
          alert('Vui lòng điền đầy đủ các phát biểu.');
          return;
        }
        if (!currentQuestion.correctAnswers || currentQuestion.correctAnswers.length !== 4) {
          alert('Vui lòng chọn đáp án đúng/sai cho tất cả các phát biểu.');
          return;
        }
        break;

      case 'short-answer':
        if (!currentQuestion.correctAnswer.trim()) {
          alert('Vui lòng nhập đáp án.');
          return;
        }
        break;
    }

    const newQuestion = {
      type: currentQuestion.type,
      question: currentQuestion.question.trim(),
      explain: currentQuestion.explain.trim(),
    };

    switch (currentQuestion.type) {
      case 'multiple-choice':
        newQuestion.options = currentQuestion.options.map(option => option.trim());
        newQuestion.correctAnswer = currentQuestion.correctAnswer.trim();
        break;
      case 'true-false':
        newQuestion.options = currentQuestion.options.map(option => option.trim());
        newQuestion.correctAnswer = currentQuestion.correctAnswers;
        break;
      case 'short-answer':
        newQuestion.correctAnswer = currentQuestion.correctAnswer.trim();
        break;
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
    
    if (name === 'type') {
      // Reset state với giá trị mặc định dựa trên loại câu hỏi
      const newState = {
        type: value,
        question: '',
        explain: '',
      };

      switch (value) {
        case 'multiple-choice':
          newState.options = ['', '', '', ''];
          newState.correctAnswer = '';
          newState.correctAnswers = undefined;
          break;
        case 'true-false':
          newState.options = ['', '', '', ''];
          newState.correctAnswers = ['Đúng', 'Đúng', 'Đúng', 'Đúng'];
          newState.correctAnswer = undefined;
          break;
        case 'short-answer':
          newState.correctAnswer = '';
          newState.options = undefined;
          newState.correctAnswers = undefined;
          break;
      }

      setCurrentQuestion(newState);
    } else {
      // Cập nhật bình thường cho các trường khác
      setCurrentQuestion(prevQuestion => ({
        ...prevQuestion,
        [name]: value,
      }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      options: newOptions,
    }));
  };

  const handleTrueFalseAnswerChange = (index, value) => {
    setCurrentQuestion(prevQuestion => {
      const newAnswers = [...prevQuestion.correctAnswers];
      newAnswers[index] = value;
      return {
        ...prevQuestion,
        correctAnswers: newAnswers
      };
    });
  };

  const handleQuestionTypeChange = (type) => {
    setQuestionTypes(prev => {
      const newTypes = { ...prev, [type]: !prev[type] };
      // Đảm bảo ít nhất một loại được chọn
      if (!newTypes.multipleChoice && !newTypes.trueFalse && !newTypes.shortAnswer) {
        return prev;
      }
      return newTypes;
    });
  };

  return (
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="create-quiz-page">
          <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
          <h2 className="solver-form-title">AI tạo đề thi</h2>
          <p className="solver-intro">Giải pháp hoàn hảo cho giáo viên và học sinh. Tự động tạo đề thi chất lượng cao, đa dạng, phù hợp mọi cấp học. Tiết kiệm thời gian, nâng cao hiệu quả</p>
          
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
        <div className="createquiz-types-container">
          <div className="createquiz-type-row">
            <label>
              <input
                type="checkbox"
                checked={questionTypes.multipleChoice}
                onChange={() => handleQuestionTypeChange('multipleChoice')}
              />
              Trắc nghiệm
            </label>
            {questionTypes.multipleChoice && (
              <input
                type="number"
                value={numMultipleChoice}
                onChange={(e) => setNumMultipleChoice(e.target.value)}
                placeholder="Số câu trắc nghiệm"
                min="0"
                className="createquiz-count-input"
              />
            )}
          </div>

          <div className="createquiz-type-row">
            <label>
              <input
                type="checkbox"
                checked={questionTypes.trueFalse}
                onChange={() => handleQuestionTypeChange('trueFalse')}
              />
              Đúng/sai
            </label>
            {questionTypes.trueFalse && (
              <input
                type="number"
                value={numTrueFalse}
                onChange={(e) => setNumTrueFalse(e.target.value)}
                placeholder="Số câu đúng/sai"
                min="0"
                className="createquiz-count-input"
              />
            )}
          </div>

          <div className="createquiz-type-row">
            <label>
              <input
                type="checkbox"
                checked={questionTypes.shortAnswer}
                onChange={() => handleQuestionTypeChange('shortAnswer')}
              />
              Điền đáp án
            </label>
            {questionTypes.shortAnswer && (
              <input
                type="number"
                value={numShortAnswer}
                onChange={(e) => setNumShortAnswer(e.target.value)}
                placeholder="Số câu điền đáp án"
                min="0"
                className="createquiz-count-input"
              />
            )}
          </div>
        </div>
    </div>
      <button className="create-quiz-add-question-btn" onClick={handleAddQuestionsFromAPI}>Tạo câu hỏi từ AI</button>
      {loading && (
  <div className="loader">
    <img src={magic} alt="Loading..." className="loading-icon" />
    <p>Đang tạo đề thi, vui lòng chờ...</p>
  </div>
)}
      <div className="create-quiz-add-questions">
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
          <option value="short-answer">Điền đáp án</option>
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
          <>
            <label className="solver-intro">Nhập 4 phát biểu và chọn đúng/sai cho mỗi phát biểu</label>
            {[0, 1, 2, 3].map(index => (
              <div key={index} className="true-false-option">
                <input
                  type="text"
                  value={currentQuestion.options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Phát biểu ${index + 1}`}
                />
                <select
                  value={currentQuestion.correctAnswers[index]}
                  onChange={(e) => handleTrueFalseAnswerChange(index, e.target.value)}
                >
                  <option value="">Chọn đáp án</option>
                  <option value="Đúng">Đúng</option>
                  <option value="Sai">Sai</option>
                </select>
              </div>
            ))}
          </>
        )}
        {currentQuestion.type === 'short-answer' && (
          <>
            <input
              type="text"
              value={currentQuestion.correctAnswer}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'correctAnswer',
                  value: e.target.value
                }
              })}
              placeholder="Nhập đáp án..."
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
    <div className="create-quiz-question-list">
      <h2 className="Createquizz-title-feature">Danh sách câu hỏi</h2>
      <ul>
        {questions && questions.length > 0 ? (
          // Sắp xếp và nhóm câu hỏi theo loại
          [...questions]
            .sort((a, b) => {
              const typeOrder = {
                'multiple-choice': 1,
                'true-false': 2,
                'short-answer': 3
              };
              return typeOrder[a.type] - typeOrder[b.type];
            })
            .map((question, index) => (
              <li key={index}>
                <div className="create-quiz-question-content">
                  <p><strong>Câu hỏi {index + 1} ({question.type}):</strong> {question.question}</p>
                  
                  {question.type === 'multiple-choice' && (
                    <div className="create-quiz-question-options">
                      {question.options.map((option, i) => (
                        <p key={i}>{String.fromCharCode(65 + i)}) {option}</p>
                      ))}
                      <p className="create-quiz-correct-answer">
                        <strong>Đáp án đúng:</strong> {question.correctAnswer}
                      </p>
                      <p><strong>Giải thích:</strong> {question.explain}</p>
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="create-quiz-question-options">
                      {question.options.map((option, i) => (
                        <p key={i}>
                          {String.fromCharCode(97 + i)}) {option} - <span className='create-quiz-correct-answer'>{question.correctAnswer[i]}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {question.type === 'short-answer' && (
                    <div className="create-quiz-question-options">
                      <p className="create-quiz-correct-answer">
                        <strong>Đáp án:</strong> {question.correctAnswer}
                      </p>
                    </div>
                  )}

                  <button 
                    className='create-quiz-delete-question-btn' 
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))
        ) : (
          <p>Chưa có câu hỏi nào.</p>
        )}
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
            </Tab>
            <Tab eventKey="teacher" title={<span style={{ color: activeTab === 'teacher' ? '#7b31c9' : 'black', fontWeight: activeTab === 'teacher' ? 'bold' : 'normal' }}>Giáo viên</span>}>
            <TeacherQuizCreator 
              quizTitle={quizTitle}
              setQuizTitle={setQuizTitle}
            />
          </Tab>
          </Tabs>
        </div>
      </section>
      <Footer />
    </container>
  );
};

export default CreateQuiz;