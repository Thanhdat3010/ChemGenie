import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import magic from "../assets/magic-dust.png";
import './CreateQuiz.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AIQuizGrader = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [answerKeyFile, setAnswerKeyFile] = useState(null);
  const [gradingResult, setGradingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

  const handleStudentFileUpload = (event) => {
    setStudentFile(event.target.files[0]);
  };

  const handleAnswerKeyFileUpload = (event) => {
    setAnswerKeyFile(event.target.files[0]);
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const gradeQuiz = async () => {
    if (!studentFile || !answerKeyFile) {
      alert('Vui lòng tải lên cả bài làm của học sinh và đáp án.');
      return;
    }

    setLoading(true);

    try {
      const studentAnswers = await extractTextFromWord(studentFile);
      const answerKey = await extractTextFromWord(answerKeyFile);

      const prompt = `
        Bạn là một giáo viên đang chấm bài kiểm tra. 
        Dưới đây là bài làm của học sinh:
        ${studentAnswers}

        Và đây là đáp án:
        ${answerKey}

        Hãy chấm điểm bài làm của học sinh dựa trên đáp án theo quy tắc sau:
        1. Phần I (Trắc nghiệm nhiều lựa chọn): Mỗi câu trả lời đúng được 0,25 điểm.
        2. Phần II (Trắc nghiệm đúng/sai): 
           - Mỗi câu có 4 ý.
           - Đúng 1 ý: 0,1 điểm
           - Đúng 2 ý: 0,25 điểm
           - Đúng 3 ý: 0,5 điểm
           - Đúng 4 ý: 1 điểm
        Lưu ý: 
        - Cách chấm điểm phần này là so sánh bài làm của học sinh với đáp án(ví dụ học sinh chọn đáp án là sai, đáp án trong file là sai thì phải tính đúng cho học sinh).
        - Còn nếu câu trả lời của học sinh không giống với đáp án thì không tính điểm(ví dụ đáp án là đúng mà học sinh chọn sai thì không tính điểm).

        3. Phần III (Trắc nghiệm trả lời ngắn):
            Mỗi câu đúng được 0,25 điểm
        Thang điểm này phù hợp nhất với đề 28 câu hỏi với 18 câu trắc nghiệm, 4 câu đúng/sai, 6 câu trả lời ngắn.
        Do đó khi số lượng câu hỏi thay đổi thì phải căn chỉnh chấm điểm cho phù hợp.
        Lưu ý: 
        - Chỉ so sánh phần sau "Đáp án:" trong bài làm của học sinh với đáp án để chấm điểm.
        - Tổng điểm bài thi không được vượt quá 10 điểm. Nếu tổng điểm vượt quá 10, hãy điều chỉnh để tổng điểm là 10.
        - Điểm của mỗi câu phải được nhất quán chứ không thể trong cùng 1 loại câu mà có 2 thang khác nhau.
        Đưa ra nhận xét chi tiết cho từng câu, tổng điểm và nhận xét chung về bài làm.
        Trả lời theo định dạng JSON như sau:
        {
          "detailedFeedback": [
            { "questionNumber": 1, "part": 1, "score": 0.25, "comment": "Đúng" },
            { "questionNumber": 2, "part": 2, "score": 0.5, "comment": "Đúng 3/4 ý" },
            // ... các câu khác
          ],
          "totalScore": 8.5,
          "overallComment": "Bài làm tốt, cần cải thiện..."
        }

        Hãy đảm bảo rằng bạn chấm điểm chính xác theo cấu trúc của bài kiểm tra, bao gồm cả việc phân biệt các phần khác nhau (I, II, III) và áp dụng đúng thang điểm cho từng loại câu hỏi.
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
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
        .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

      console.log(cleanText);
      let gradingResult;
      try {
        gradingResult = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        alert('Đã xảy ra lỗi khi chấm bài, xin vui lòng hãy thử lại.');
        return;
      }

      // Đảm bảo tổng điểm không vượt quá 10
      if (gradingResult.totalScore > 10) {
        gradingResult.totalScore = 10;
        gradingResult.overallComment += " Điểm đã được điều chỉnh xuống 10 do vượt quá thang điểm.";
      }

      setGradingResult(gradingResult);
    } catch (error) {
      console.error('Error grading quiz:', error);
      alert('Đã xảy ra lỗi khi chấm bài.');
    } finally {
      setLoading(false);
    }
  };

  const generateGradingReport = async () => {
    if (!gradingResult) {
      alert('Vui lòng chấm bài trước khi tạo báo cáo.');
      return;
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Báo cáo chấm bài", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Tổng điểm: ${gradingResult.totalScore}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Nhận xét chung:", bold: true }),
              new TextRun({ text: gradingResult.overallComment }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Nhận xét chi tiết:", bold: true }),
            ],
          }),
          ...gradingResult.detailedFeedback.map(feedback => 
            new Paragraph({
              children: [
                new TextRun({ text: `Câu ${feedback.questionNumber} (Phần ${feedback.part}): `, bold: true }),
                new TextRun({ text: `${feedback.score} điểm - ${feedback.comment}` }),
              ],
            })
          ),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${quizTitle || 'BaoCaoChambai'}.docx`);
  };

  return (
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="create-quiz-page">
          <div className="solver-tag"><p className="solver-name"><img alt="magic" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
          <h2 className="solver-form-title">AI chấm bài tự động</h2>
          <p className="solver-intro">Giải pháp chấm bài hiệu quả cho giáo viên. Tự động chấm điểm và đưa ra nhận xét chi tiết, tiết kiệm thời gian và nâng cao chất lượng đánh giá.</p>
          
          <div className="create-quiz-title-form">
            <h2 className="Createquizz-title-feature">Chấm bài tự động bằng AI</h2>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài kiểm tra..."
            />
          </div>

          <div className="create-quiz-file-upload">
            <h2 className="Createquizz-title-feature">Tải lên bài làm và đáp án</h2>
            <p className="solver-intro">Tải lên bài làm của học sinh và đáp án (Word)</p>
            <div className="file-upload-container">
              <label htmlFor="studentFile">Bài làm của học sinh:</label>
              <input
                id="studentFile"
                type="file"
                accept=".docx"
                onChange={handleStudentFileUpload}
              />
            </div>
            <div className="file-upload-container">
              <label htmlFor="answerKeyFile">Đáp án:</label>
              <input
                id="answerKeyFile"
                type="file"
                accept=".docx"
                onChange={handleAnswerKeyFileUpload}
              />
            </div>
          </div>

          <div className="create-quiz-add-questions">
            <button className="create-quiz-add-question-btn" onClick={gradeQuiz}>Chấm bài</button>
          </div>

          {loading && (
            <div className="loader">
              <img src={magic} alt="Loading..." className="loading-icon" />
              <p>Đang chấm bài, vui lòng chờ...</p>
            </div>
          )}

          {gradingResult && (
            <div className="create-quiz-question-list">
              <h2 className="Createquizz-title-feature">Kết quả chấm bài</h2>
              <div className="grading-result">
                <p><strong>Tổng điểm:</strong> {gradingResult.totalScore}</p>
                <p><strong>Nhận xét chung:</strong> {gradingResult.overallComment}</p>
              </div>
            </div>
          )}
          <button style={{marginTop: '20px'}} className="create-quiz-download-btn" onClick={generateGradingReport}>Tạo bài đã chấm</button>
        </div>
      </section>
      <Footer />
    </container>
  );
};

export default AIQuizGrader;
