import React, { useState, useEffect } from 'react';
import { db, auth } from '../components/firebase';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AnalyzeResults.css';

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
      const userId = JSON.parse(localStorage.getItem('user'))?.email || 'defaultUser';
      let docRef;
      
      if (type === 'chapter') {
        docRef = doc(db, 'users', userId, 'chapters', itemId);
      } else {
        const user = auth.currentUser;
        if (user) {
          docRef = doc(db, 'quizProgress', `${user.uid}_${itemId}`);
        } else {
          throw new Error('No user is logged in.');
        }
      }

      const docSnap = await getDoc(docRef);
      let questions = [];
      let answerState = [];
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        questions = data.questions || [];
        answerState = data.answerState || [];
      }

      return { answerState, questions };
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ Firestore:', error);
      return { answerState: [], questions: [] };
    }
  };

  const handleAnalyzeResults = async () => {
    setLoading(true);

    const { answerState, questions } = await fetchQuizData(selectedType, selectedItem);

    if (answerState.length === 0 || questions.length === 0) {
      setAnalysis('Không có dữ liệu để phân tích.');
      setLoading(false);
      return;
    }

    const prompt = `
      Dưới đây là dữ liệu đầu vào cho hệ thống đánh giá:
      Kết quả bài kiểm tra:
      ${questions.map((question, index) => `
        Câu ${index + 1}: ${question.question}
        Kết quả: ${answerState[index] ? 'Đúng' : 'Sai'}
      `).join('\n\n')}
      
      Dựa trên các thông tin này, hãy:
      1. Phân tích kết quả:
      - Xác định số câu trả lời đúng và sai.
      - Xác định các câu hỏi học sinh trả lời đúng và sai.
      - Tính toán điểm tổng cộng và tỷ lệ phần trăm đúng.
      2. Đánh giá kỹ năng:
      - Đánh giá các kỹ năng cụ thể dựa trên các câu hỏi đúng và sai (ví dụ: hiểu biết về phản ứng hóa học, khả năng cân bằng phương trình, hiểu biết về bảng tuần hoàn, v.v.).
      - Nhận diện các chủ đề mà học sinh có vẻ yếu kém hoặc mạnh mẽ.
      3. Phân loại năng lực:
      - Phân loại học sinh vào các mức năng lực khác nhau dựa trên kết quả (ví dụ: xuất sắc, giỏi, khá, trung bình, yếu).
      - Đưa ra lời khuyên cho học sinh về các chủ đề cần cải thiện và các tài liệu học tập có liên quan.
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

  return (
    <div className="analyze-results-page">
  <h1 className="analyze-results-page__title">Phân Tích Kết Quả</h1>
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
  );
};

export default AnalyzeResults;