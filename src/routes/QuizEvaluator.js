import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../config';
import mammoth from 'mammoth';
import './QuizEvaluator.css';
import icon4 from "../assets/magic-dust.png";
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';
import icon3 from '../assets/highlighter.png';

const QuizEvaluator = () => {
  const [quizFile, setQuizFile] = useState(null);
  const [theoryFiles, setTheoryFiles] = useState([]);
  const [quizContent, setQuizContent] = useState('');
  const [theoryContent, setTheoryContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const COMPETENCY_STANDARDS = `
    CHUẨN NĂNG LỰC MÔN HÓA HỌC THEO CHƯƠNG TRÌNH GDPT 2018:

    1. Nhóm năng lực hóa học (HH):
    HH1. Nhận thức hóa học
      HH1.1: Hiểu và vận dụng kiến thức hóa học cơ bản
      HH1.2: Phân tích và giải thích hiện tượng hóa học
      HH1.3: Vận dụng tư duy hóa học vào thực tiễn
      HH1.4: Đánh giá tác động của hóa học với đời sống

    HH2. Tìm hiểu thế giới tự nhiên
      HH2.1: Quan sát và mô tả hiện tượng hóa học
      HH2.2: Thu thập và xử lý thông tin hóa học
      HH2.3: Thiết kế và thực hiện thí nghiệm
      HH2.4: Giải quyết vấn đề thông qua thực nghiệm

    HH3. Vận dụng kiến thức
      HH3.1: Áp dụng kiến thức vào tình huống mới
      HH3.2: Phân tích và đánh giá dữ liệu
      HH3.3: Đề xuất và lựa chọn giải pháp
      HH3.4: Thiết kế và đánh giá quy trình

    2. Nhóm năng lực chung:
    NC1. Tự chủ và tự học
    NC2. Giao tiếp và hợp tác
    NC3. Giải quyết vấn đề và sáng tạo
  `;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleQuizFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.docx')) {
      alert('Chỉ chấp nhận file định dạng .docx');
      return;
    }

    setQuizFile(file);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setQuizContent(result.value);
    } catch (error) {
      console.error('Error extracting quiz content:', error);
      alert('Lỗi khi đọc file đề thi');
    }
  };

  const handleTheoryFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.some(file => !file.name.endsWith('.docx'))) {
      alert('Chỉ chấp nhận file định dạng .docx');
      return;
    }

    setTheoryFiles(files);
    try {
      const contents = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          return result.value;
        })
      );
      
      const combined = contents
        .filter(content => content.trim().length > 0)
        .join('\n\n=== Tài liệu mới ===\n\n');
      
      setTheoryContent(combined);
    } catch (error) {
      console.error('Error extracting theory content:', error);
      alert('Lỗi khi đọc file lý thuyết');
    }
  };

  const handleRemoveTheoryFile = (index) => {
    setTheoryFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    // Làm sạch văn bản đã trích xuất
    let cleanedText = result.value
      // Chuẩn hóa dấu câu tiếng Việt
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s*\.\s*/g, '. ')
      .replace(/\s*;\s*/g, '; ')
      .replace(/\s*:\s*/g, ': ')
      .replace(/\s*\?\s*/g, '? ')
      .replace(/\s*!\s*/g, '! ')
      
      // Xử lý khoảng trắng và xuống dòng
      .replace(/\s+/g, ' ')           
      .replace(/^\s*[\r\n]/gm, '')    
      .replace(/[\r\n]+/g, '\n')      
      
      // Xử lý các ký tự đặc biệt
      .replace(/[""]/g, '"')          
      .replace(/['']/g, "'")          
      
      // Xử lý công thức hóa học
      .replace(/(\d+)([A-Za-z])/g, '$1 $2')  
      .replace(/([A-Za-z])(\d+)/g, '$1₍$2₎') 
      
      // Xử lý các đơn vị đo lường
      .replace(/(\d+)\s*(ml|g|kg|m|cm|mm|L)/gi, '$1 $2')
      
      .trim();

    // Xử lý thêm cho văn bản tiếng Việt
    cleanedText = cleanedText
      .replace(/([.,!?;:])\s*([^\s])/g, '$1 $2')
      .replace(/\s+-\s+/g, '-')
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/([A-Z]+)\s+([A-Z]+)/g, '$1$2')
      .replace(/\s+([.,])/g, '$1');

    return cleanedText;
  };


  const evaluateQuiz = async () => {
    if (!quizContent || !theoryContent) {
      alert('Vui lòng tải lên đầy đủ đề thi và tài liệu lý thuyết');
      return;
    }

    setLoading(true);

    try {
      const evaluationPrompt = `Với vai trò là chuyên gia đánh giá đề thi hóa học, hãy đánh giá chất lượng đề thi sau dựa trên Chuẩn GDPT 2018 và đối chiếu với nội dung lý thuyết:

      ${COMPETENCY_STANDARDS}

      ĐỀ THI CẦN ĐÁNH GIÁ:
      ${quizContent}

      NỘI DUNG LÝ THUYẾT ĐỐI CHIẾU:
      ${theoryContent}

      Hãy phân tích theo các mục sau và đảm bảo bắt đầu mỗi mục bằng ký hiệu tương ứng:

      1. Đánh giá năng lực (30đ):
      - Mức độ bao phủ các năng lực theo chuẩn GDPT 2018
      - Sự phân bố giữa các nhóm năng lực
      - Tính phù hợp của câu hỏi với năng lực đánh giá

      2. Cấu trúc và hình thức (20đ):
      - Tính đa dạng của dạng câu hỏi
      - Tính logic trong trình tự
      - Độ rõ ràng trong trình bày
      - Tính chính xác của ngôn ngữ hóa học

      3. Nội dung chuyên môn (25đ):
      - Độ chính xác của kiến thức
      - Tính phù hợp với chuẩn kiến thức
      - Tính thực tiễn và ứng dụng
      - Mức độ tích hợp liên môn

      4. Phân hóa học sinh (25đ):
      - Phân bố các mức độ nhận thức
      - Tỷ lệ độ khó
      - Khả năng phân loại học sinh`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(evaluationPrompt);
      const response = await result.response;
      setEvaluation(response.text());
    } catch (error) {
      console.error('Error evaluating quiz:', error);
      alert('Đã xảy ra lỗi khi đánh giá đề thi');
    } finally {
      setLoading(false);
    }
  };

  const formatEvaluationText = (text) => {
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return null;

      const cleanedLine = line
        .replace(/^[\*\#\-\s]+/, '')
        .replace(/\*/g, '')
        .trim();

      let iconSrc = '';
      
      // Xác định icon dựa trên tiêu đề mục
      if (cleanedLine.startsWith('1.') || cleanedLine.includes('Đánh giá năng lực')) {
        iconSrc = icon4;
      } else if (cleanedLine.startsWith('2.') || cleanedLine.includes('Cấu trúc và hình thức')) {
        iconSrc = icon1;
      } else if (cleanedLine.startsWith('3.') || cleanedLine.includes('Nội dung chuyên môn')) {
        iconSrc = icon2;
      } else if (cleanedLine.startsWith('4.') || cleanedLine.includes('Phân hóa học sinh')) {
        iconSrc = icon3;
      }

      if (iconSrc) {
        return (
          <p key={index}>
            <img src={iconSrc} alt="icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
            <strong style={{ color: '#7b31c9' }}>{cleanedLine}</strong>
          </p>
        );
      }

      // Format bullet points
      if (cleanedLine.startsWith('-')) {
        return (
          <p key={index} className="quiz-evaluator-bullet">
            • {cleanedLine.substring(1).trim()}
          </p>
        );
      }

      return <p key={index} className="quiz-evaluator-text">{cleanedLine}</p>;
    });
  };

  return (
    <div className="quiz-evaluator">
      <h2>Đánh giá chất lượng đề thi</h2>
      
      <div className="quiz-evaluator-upload-section">
        <div className="quiz-evaluator-quiz-upload">
          <h3>Tải lên đề thi cần đánh giá (.docx)</h3>
          <input
            type="file"
            accept=".docx"
            onChange={handleQuizFileUpload}
          />
          {quizFile && (
            <div className="quiz-evaluator-uploaded-file">
              <span>{quizFile.name}</span>
              <button onClick={() => setQuizFile(null)}>Xóa</button>
            </div>
          )}
        </div>

        <div className="quiz-evaluator-theory-upload">
          <h3>Tải lên tài liệu lý thuyết (.docx)</h3>
          <input
            type="file"
            accept=".docx"
            onChange={handleTheoryFileUpload}
            multiple
          />
          {theoryFiles.length > 0 && (
            <div className="quiz-evaluator-uploaded-files">
              <h4>Danh sách file lý thuyết:</h4>
              {theoryFiles.map((file, index) => (
                <div key={index} className="quiz-evaluator-uploaded-file-item">
                  <span>{file.name}</span>
                  <button onClick={() => handleRemoveTheoryFile(index)}>
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          className="quiz-evaluator-evaluate-btn"
          onClick={evaluateQuiz}
          disabled={loading || !quizFile || theoryFiles.length === 0}
        >
          {loading ? 'Đang đánh giá...' : 'Đánh giá đề thi'}
        </button>
      </div>

      {evaluation && (
        <div className="quiz-evaluator-result">
          <h3>Kết quả đánh giá</h3>
          <div className="quiz-evaluator-content">
            {formatEvaluationText(evaluation)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizEvaluator;