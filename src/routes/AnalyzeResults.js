import React, { useState, useEffect } from 'react';
import { db, auth } from '../components/firebase';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AnalyzeResults.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import magic from "../assets/magic-dust.png";
import icon4 from "../assets/magic-dust.png";
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';
import icon3 from '../assets/highlighter.png';



const AnalyzeResults = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedType, setSelectedType] = useState('chapter');
  const [selectedItem, setSelectedItem] = useState('');
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))?.email || 'defaultUser';
        const chaptersColRef = collection(db, 'users', userId, 'chapters');
        const chapterSnapshot = await getDocs(chaptersColRef);
        const chapterList = chapterSnapshot.docs.map(doc => doc.id);
        setChapters(chapterList);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chapters:', error);
      }
    };

    fetchChapters();
  }, []);
  
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
      }
    };

    fetchQuizzes();
  }, []);
  
  const fetchQuizData = async (type, itemId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in.');

      let questions = [];
      let detailedAnswers = [];

      if (type === 'quiz') {
        // Fetch quiz submission data
        const submissionRef = doc(db, 'quizSubmissions', `${user.uid}_${itemId}`);
        const submissionSnap = await getDoc(submissionRef);
        
        if (submissionSnap.exists()) {
          const submissionData = submissionSnap.data();
          detailedAnswers = submissionData.detailedAnswers || [];
          
          // Convert detailed answers to the format needed for analysis
          questions = detailedAnswers.map(answer => ({
            question: answer.question,
            type: answer.questionType
          }));
          
          const answerState = detailedAnswers.map(answer => answer.isCorrect);
          return { answerState, questions, detailedAnswers };
        }
      } else {
        // Logic phân tích chương hiện có
        const userId = JSON.parse(localStorage.getItem('user'))?.email || 'defaultUser';
        const docRef = doc(db, 'users', userId, 'chapters', itemId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          questions = data.questions || [];
          const answerState = data.answerState || [];
          return { answerState, questions };
        }
      }

      throw new Error('No data found');
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      return { answerState: [], questions: [], detailedAnswers: [] };
    }
  };

  const handleAnalyzeResults = async () => {
    setLoading(true);

    const { answerState, questions, detailedAnswers } = await fetchQuizData(selectedType, selectedItem);

    if (answerState.length === 0 || questions.length === 0) {
      setAnalysis('Không có dữ liệu để phân tích.');
      setLoading(false);
      return;
    }

    const prompt = `
      Dưới đây là dữ liệu đầu vào cho hệ thống đánh giá:
      Kết quả bài kiểm tra:
      ${questions.map((question, index) => {
        const detail = detailedAnswers?.[index];
        return `
          Câu ${index + 1}: ${question.question}
          ${detail ? `
          Loại câu hỏi: ${detail.questionType}
          Câu trả lời của học sinh: ${detail.userAnswer}
          Đáp án đúng: ${detail.correctAnswer}
          Kết quả: ${detail.isCorrect ? 'Đúng' : 'Sai'}
          ` : `Kết quả: ${answerState[index] ? 'Đúng' : 'Sai'}`}
        `;
      }).join('\n\n')}
      
      Dựa trên các thông tin này, hãy:
      1. Phân tích kết quả:
      - Xác định số câu trả lời đúng và sai.
      - Xác định các câu hỏi học sinh trả lời đúng và sai.
      - Tính toán điểm tổng cộng và tỷ lệ phần trăm đúng.
      2. Đánh giá kỹ năng:
      - Đánh giá các kỹ năng cụ thể dựa trên các câu hỏi đúng và sai.
      - Nhận diện các chủ đề mà học sinh có vẻ yếu kém hoặc mạnh mẽ.
      3. Phân loại năng lực:
      - Phân loại học sinh vào các mức năng lực khác nhau dựa trên kết quả.
      - Đưa ra lời khuyên cho học sinh về các chủ đề cần cải thiện.
      4. Đưa ra nhận xét:
      - Viết một đoạn nhận xét chi tiết cho học sinh, bao gồm các điểm mạnh, điểm yếu, và đề xuất cách cải thiện.
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysisText = await response.text();
      setAnalysis(analysisText);
      const userId = JSON.parse(localStorage.getItem('user'))?.email || 'defaultUser';
      const userDocRef = doc(db, 'users', userId);

      await setDoc(userDocRef, { analysis: analysisText }, { merge: true });
    } catch (error) {
      console.error('Lỗi khi phân tích kết quả:', error);
      setAnalysis('Đã xảy ra lỗi khi phân tích kết quả.');
    }
    
    setLoading(false);
  };

  const formatTextWithLineBreaks = (text) => {
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

  return (
    <container fluid >
      <Navbar />
      <section className="full-screen">
      <div className="analyze-results-page">
  <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
      <h2 className="solver-form-title">AI phân tích năng lực</h2>
      <p className="solver-intro">AI sẽ tự động phân tích năng lực của bạn thông qua bài kiểm tra đã làm, đưa ra hướng phát triển tiếp theo cho bạn.</p>
  <div className="analyze-results-page__type-select">
    <label htmlFor="type">Chọn Bài Tập:</label>
    <select 
      id="type" 
      value={selectedType} 
      onChange={(e) => {
        setSelectedType(e.target.value);
        setSelectedItem(''); // reset selected item when type changes
      }}
      className="analyze-results-page__select"
    >
      <option value="chapter">Chương</option>
      <option value="quiz">Bài kiểm tra</option>
    </select>
  </div>
  <div className="analyze-results-page__item-select">
    <label htmlFor="item">{selectedType === 'chapter' ? 'Chọn Chương:' : 'Chọn Bài Kiểm Tra:'}</label>
    <select 
      id="item" 
      value={selectedItem} 
      onChange={(e) => setSelectedItem(e.target.value)}
      className="analyze-results-page__select"
    >
      <option value="">Chọn {selectedType === 'chapter' ? 'chương' : 'bài kiểm tra'}</option>
      {(selectedType === 'chapter' ? chapters : quizzes).map((item) => (
        <option key={item.id || item} value={item.id || item}>{item.title || item}</option>
      ))}
    </select>
  </div>
  <button 
    className="analyze-results-page__analyze-btn" 
    onClick={handleAnalyzeResults} 
    disabled={loading || !selectedItem}
  >
    {loading ? 'Đang phân tích...' : 'Phân tích kết quả'}
  </button>
  {analysis && (
    <div className="analyze-results-page__analysis-content">
      <p>{formatTextWithLineBreaks(analysis)}</p>
    </div>
  )}
</div>
      </section>

<Footer />
    </container>

  );
};

export default AnalyzeResults;