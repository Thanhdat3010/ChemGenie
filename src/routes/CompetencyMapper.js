import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import { API_KEY } from '../config';
import { generateWordDocument } from './generateWordDocument';
import magic from "../assets/magic-dust.png";
import Navbar from '../components/Navbar';
import './CompetencyMapper.css';

const CompetencyMapper = () => {
  const [file, setFile] = useState(null);
  const [mappedQuestions, setMappedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainTitle, setMainTitle] = useState('Trường THPT Nguyễn Chí Thanh');
  const [subTitle, setSubTitle] = useState('Đề kiểm tra hệ số 1');
  const [subject, setSubject] = useState('HÓA HỌC');
  const [examTime, setExamTime] = useState('15 phút');

  const COMPETENCY_STANDARDS = `
    HH1. NHẬN THỨC HÓA HỌC:
    HH1.1. Nhận biết và nêu được tên của các đối tượng, sự kiện, khái niệm hoặc quá trình hoá học
    HH1.2. Trình bày được các sự kiện, đặc điểm, vai trò của các đối tượng, khái niệm hoặc quá trình hoá học
    HH1.3. Mô tả được đối tượng bằng các hình thức nói, viết, công thức, sơ đồ, biểu đồ, bảng
    HH1.4. So sánh, phân loại, lựa chọn được các đối tượng, khái niệm hoặc quá trình hoá học
    HH1.5. Phân tích được các khía cạnh của các đối tượng, khái niệm hoặc quá trình hoá học
    HH1.6. Giải thích và lập luận được về mối quan hệ giữa các đối tượng, khái niệm hoặc quá trình hoá học
    HH1.7. Tìm được từ khoá, sử dụng được thuật ngữ khoa học, kết nối được thông tin theo logic
    HH1.8. Thảo luận, đưa ra được những nhận định phê phán có liên quan đến chủ đề

    HH2. TÌM HIỂU THẾ GIỚI TỰ NHIÊN:
    HH2.1. Đề xuất vấn đề: nhận ra và đặt được câu hỏi liên quan đến vấn đề
    HH2.2. Đưa ra phán đoán và xây dựng giả thuyết nghiên cứu
    HH2.3. Lập kế hoạch thực hiện: xây dựng được khung logic nội dung tìm hiểu
    HH2.4. Thực hiện kế hoạch: thu thập và phân tích dữ liệu, rút ra kết luận
    HH2.5. Viết, trình bày báo cáo và thảo luận kết quả tìm hiểu

    HH3. VẬN DỤNG KIẾN THỨC:
    HH3.1. Vận dụng để giải thích hiện tượng tự nhiên và ứng dụng trong cuộc sống
    HH3.2. Vận dụng để phản biện, đánh giá ảnh hưởng của vấn đề thực tiễn
    HH3.3. Vận dụng tổng hợp để đánh giá và đề xuất giải pháp cho vấn đề thực tiễn
    HH3.4. Định hướng được ngành nghề liên quan
    HH3.5. Ứng xử phù hợp với phát triển bền vững và bảo vệ môi trường`;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file.name.endsWith('.docx')) {
      alert('Chỉ chấp nhận file định dạng .docx');
      return;
    }
    setFile(file);
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const analyzeAndMapCompetencies = async () => {
    if (!file) {
      alert('Vui lòng tải lên file đề thi');
      return;
    }

    setLoading(true);

    try {
      const extractedText = await extractTextFromWord(file);
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

      const prompt = `Phân tích đề thi sau và gán năng lực phù hợp cho từng câu hỏi:

${extractedText}

Dựa trên chuẩn năng lực GDPT 2018:
${COMPETENCY_STANDARDS}

Yêu cầu phân tích:
1. Xác định loại câu hỏi và chuyển đổi thành một trong ba dạng:
   - Trắc nghiệm (multiple-choice): câu hỏi có 4 lựa chọn
   - Đúng/sai (true-false): câu hỏi có 4 phát biểu đúng/sai
   - Trả lời ngắn (short-answer): câu hỏi tự luận hoặc tính toán

2. Với mỗi câu hỏi, cần:
   - Xác định đáp án đúng
   - Với câu trắc nghiệm: thêm giải thích chi tiết
   - Với câu đúng/sai: xác định đúng/sai cho từng phát biểu
   - Với câu trả lời ngắn: đưa ra đáp án ngắn gọn

3. Gán năng lực phù hợp:
   - Mỗi câu trắc nghiệm và trả lời ngắn: 1 năng lực
   - Mỗi câu đúng/sai: 4 năng lực (một cho mỗi phát biểu)
   - Giải thích chi tiết cách câu hỏi đánh giá năng lực đó

4. Đảm bảo phân bố năng lực hợp lý:
   - Nhóm HH1 (Nhận thức): 40%
   - Nhóm HH2 (Tìm hiểu): 35%
   - Nhóm HH3 (Vận dụng): 25%
Lưu ý: lúc trả về đừng thêm kí tự gì ở đầu câu như A B C D, chỉ cần trả về nội dung câu hỏi
Trả về kết quả dưới dạng JSON với cấu trúc giống hệt như sau:
[
          {
            "type": "multiple-choice",
            "question": "Câu hỏi trắc nghiệm",
            "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
            "correctAnswer": "Đáp án đúng",
            "explain": "Giải thích cho đáp án đúng",
            "competency": "HH1.1",
            "competencyExplanation": "Giải thích cách câu hỏi đánh giá năng lực"
          },
          {
            "type": "true-false",
            "question": "Câu dẫn cho 4 phát biểu",
            "options": ["Phát biểu 1", "Phát biểu 2", "Phát biểu 3", "Phát biểu 4"],
            "correctAnswer": ["Đúng", "Sai", "Đúng", "Sai"],
            "competencies": ["HH1.1", "HH1.2", "HH1.3", "HH1.4"]
          },
          {
            "type": "short-answer",
            "question": "Nội dung câu hỏi tính toán",
            "correctAnswer": "Đáp án ngắn gọn",
            "competency": "HH2.4",
            "competencyExplanation": "Giải thích cách câu hỏi đánh giá năng lực"
          }
]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const cleanText = response.text()
        .replace(/`/g, '')
        .replace(/json/g, '')
        .replace(/\*/g, '')
        .replace(/\\"/g, '"')
        .replace(/'/g, "'")
        .replace(/\\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&[a-z]+;/g, '')
        .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

      const mappedData = JSON.parse(cleanText);
      setMappedQuestions(mappedData);

    } catch (error) {
      console.error('Error analyzing questions:', error);
      alert('Đã xảy ra lỗi khi phân tích đề thi');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWordDocument = () => {
    if (!mappedQuestions || mappedQuestions.length === 0) {
      alert('Chưa có dữ liệu để xuất file');
      return;
    }

    generateWordDocument(mappedQuestions, {
      mainTitle,
      subTitle,
      subject,
      examTime
    }, 'PhanTichNangLuc');
  };

  return (
    <>
      <Navbar />
      <div className="competency-mapper-page">
        <h2 className="competency-mapper-title">Phân tích năng lực đề thi</h2>
        
        <div className="competency-mapper-header">
          <input
            type="text"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="Tiêu đề chính"
            className="competency-mapper-input"
          />
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Tiêu đề phụ"
            className="competency-mapper-input"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Môn học"
            className="competency-mapper-input"
          />
          <input
            type="text"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            placeholder="Thời gian làm bài"
            className="competency-mapper-input"
          />
        </div>

        <div className="competency-mapper-upload">
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            className="competency-mapper-file-input"
          />
          <button 
            className="competency-mapper-analyze-btn"
            onClick={analyzeAndMapCompetencies}
            disabled={!file}
          >
            Phân tích đề thi
          </button>
        </div>

        {loading && (
          <div className="competency-mapper-loader">
            <img src={magic} alt="Loading..." className="competency-mapper-loading-icon" />
            <p>Đang phân tích đề thi, vui lòng chờ...</p>
          </div>
        )}

        {mappedQuestions.length > 0 && (
          <div className="competency-mapper-results">
            <h3>Kết quả phân tích</h3>
            <button 
              className="competency-mapper-export-btn"
              onClick={handleGenerateWordDocument}
            >
              <span className="competency-mapper-export-icon">📄</span>
              Xuất file Word
            </button>

            <div className="competency-mapper-questions">
              {mappedQuestions.map((question, index) => (
                <div key={index} className="competency-mapper-question">
                  <h4>Câu {index + 1}</h4>
                  <p><strong>Loại câu hỏi:</strong> {
                    question.type === 'multiple-choice' ? 'Trắc nghiệm' :
                    question.type === 'true-false' ? 'Đúng/Sai' : 'Trả lời ngắn'
                  }</p>
                  <p><strong>Nội dung:</strong> {question.question}</p>
                  
                  {question.type === 'multiple-choice' && (
                    <>
                      <div className="competency-mapper-options">
                        {question.options.map((option, i) => (
                          <p key={i}>{String.fromCharCode(65 + i)}) {option}</p>
                        ))}
                      </div>
                      <p><strong>Đáp án:</strong> {question.correctAnswer}</p>
                      <p><strong>Giải thích:</strong> {question.explain}</p>
                      <p><strong>Năng lực:</strong> {question.competency}</p>
                      <p><strong>Giải thích năng lực:</strong> {question.competencyExplanation}</p>
                    </>
                  )}

                  {question.type === 'true-false' && (
                    <>
                      <div className="competency-mapper-statements">
                        {question.options.map((statement, i) => (
                          <p key={i}>
                            {String.fromCharCode(97 + i)}) {statement} - {question.correctAnswer[i]}
                            <br />
                            <strong>Năng lực:</strong> {question.competencies[i]}
                          </p>
                        ))}
                      </div>
                    </>
                  )}

                  {question.type === 'short-answer' && (
                    <>
                      <p><strong>Đáp án:</strong> {question.correctAnswer}</p>
                      <p><strong>Năng lực:</strong> {question.competency}</p>
                      <p><strong>Giải thích năng lực:</strong> {question.competencyExplanation}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompetencyMapper; 