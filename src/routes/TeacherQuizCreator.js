import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, TabStopPosition, TabStopType } from 'docx';
import { saveAs } from 'file-saver';
import magic from "../assets/magic-dust.png";
import './CreateQuiz.css';

const TeacherQuizCreator = ({ quizTitle, setQuizTitle, questions, setQuestions }) => {
  const [teacherFile, setTeacherFile] = useState(null);
  const [teacherNumMultipleChoice, setTeacherNumMultipleChoice] = useState();
  const [teacherNumTrueFalse, setTeacherNumTrueFalse] = useState();
  const [differentiationLevel, setDifferentiationLevel] = useState('medium');
  const [mainTitle, setMainTitle] = useState('Trường THPT Nguyễn Chí Thanh');
  const [subTitle, setSubTitle] = useState('ĐỀ KIỂM TRA 15 PHÚT');
  const [subject, setSubject] = useState('HÓA HỌC');
  const [examTime, setExamTime] = useState('15 phút');
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [teacherNumShortAnswer, setTeacherNumShortAnswer] = useState();
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: true,
    shortAnswer: true
  });

  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

  const handleTeacherFileUpload = (event) => {
    setTeacherFile(event.target.files[0]);
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleQuestionTypeChange = (type) => {
    setQuestionTypes(prev => {
      const newTypes = { ...prev, [type]: !prev[type] };
      // Ensure at least one type is selected
      if (!newTypes.multipleChoice && !newTypes.trueFalse && !newTypes.shortAnswer) {
        return prev; // Revert the change if it would result in no types selected
      }
      return newTypes;
    });
  };

  const generateQuestionsFromWord = async () => {
    if (!teacherFile || !teacherFile.name.endsWith('.docx')) {
      alert('Vui lòng tải lên tệp Word (.docx).');
      return;
    }

    if (!questionTypes.multipleChoice && !questionTypes.trueFalse && !questionTypes.shortAnswer) {
      alert('Vui lòng chọn ít nhất một loại câu hỏi.');
      return;
    }

    if ((questionTypes.multipleChoice && !teacherNumMultipleChoice) || 
        (questionTypes.trueFalse && !teacherNumTrueFalse) ||
        (questionTypes.shortAnswer && !teacherNumShortAnswer)) {
      alert('Vui lòng nhập số lượng cho loại câu hỏi đã chọn.');
      return;
    }

    setLoading(true);

    try {
      const extractedText = await extractTextFromWord(teacherFile);
      let difficultyDistribution;
      switch (differentiationLevel) {
        case 'low':
          difficultyDistribution = "40% câu hỏi ở mức độ dễ, 40% câu hỏi ở mức độ trung bình, 20% câu hỏi ở mức độ khó";
          break;
        case 'medium':
          difficultyDistribution = "20% câu hỏi ở mức độ dễ, 50% câu hỏi ở mức độ trung bình, 30% câu hỏi ở mức độ khó";
          break;
        case 'high':
          difficultyDistribution = "10% câu hỏi ở mức độ dễ, 40% câu hỏi ở mức độ trung bình, 50% câu hỏi ở mức độ khó";
          break;
      }

      const prompt = `Nội dung bài giảng: ${extractedText}. Dựa trên nội dung này, hãy tạo 
        ${questionTypes.multipleChoice ? teacherNumMultipleChoice + ' câu hỏi trắc nghiệm' : ''} 
        ${questionTypes.multipleChoice && (questionTypes.trueFalse || questionTypes.shortAnswer) ? 'và' : ''} 
        ${questionTypes.trueFalse ? teacherNumTrueFalse + ' câu hỏi đúng/sai' : ''}
        ${(questionTypes.multipleChoice || questionTypes.trueFalse) && questionTypes.shortAnswer ? 'và' : ''}
        ${questionTypes.shortAnswer ? teacherNumShortAnswer + ' câu hỏi trả lời ngắn' : ''}
        với độ khó đa dạng để tạo độ phân hóa. Cụ thể:
        ${difficultyDistribution}
        Tôi không muốn bạn tự ý thêm câu hỏi mà không có trong bài giảng.
        Các câu hỏi không được lặp lại.
        Lưu ý quan trọng: Câu hỏi và các đáp án phải giữ nguyên danh pháp hóa học giống trong file (danh pháp hóa học tiếng anh). Không được tự ý đổi về danh pháp hóa học tiếng Việt(ví dụ: ester thì không tự ý đổi thành este, acid thì không tự ý đổi thành axit).
        Đối với câu hỏi trắc nghiệm: Mỗi câu hỏi cần có 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết.
        Đối với câu hỏi đúng/sai: Mỗi câu hỏi cần có 4 phát biểu và xác định đúng/sai cho từng phát biểu.
        Đối với câu hỏi trả lời ngắn: Tôi muốn phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(thường câu khó nằm ở phần này).
        Đảm bảo rằng các công thức hóa học trong câu hỏi và đáp án có các chỉ số hóa học được hiển thị dưới dạng subscript (ví dụ: CH₄ thay vì CH4).
        Kết quả cần được trả về dưới dạng JSON với cấu trúc sau: ${JSON.stringify([
          {
            type: "multiple-choice",
            question: "Câu hỏi trắc nghiệm 1",
            options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
            correctAnswer: "Đáp án đúng",
            explain: "Giải thích cho đáp án đúng",
            difficulty: "easy|medium|hard"
          },
          {
            type: "true-false",
            question: "Câu hỏi đúng/sai 1",
            options: ["Phát biểu A", "Phát biểu B", "Phát biểu C", "Phát biểu D"],
            correctAnswer: ["true", "false", "true", "false"],
            difficulty: "easy|medium|hard"
          },
          {
            type: "short-answer",
            question: "Câu hỏi trả lời ngắn 1",
            answer: "Đáp án ngắn gọn",
            difficulty: "easy|medium|hard"
          }
        ])}.`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
      let generatedQuestions;
      try {
        generatedQuestions = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        alert('Đã xảy ra lỗi khi phân tích cú pháp JSON.');
        return;
      }

      const questionsArray = Array.isArray(generatedQuestions) ? generatedQuestions : [generatedQuestions];
      
      // Filter questions based on selected types
      const filteredQuestions = questionsArray.filter(q => 
        (questionTypes.multipleChoice && q.type === 'multiple-choice') ||
        (questionTypes.trueFalse && q.type === 'true-false') ||
        (questionTypes.shortAnswer && q.type === 'short-answer')
      );
      
      // Update questions state
      const multipleChoiceQuestions = filteredQuestions.filter(q => q.type === 'multiple-choice');
      setQuestions(multipleChoiceQuestions);

      // Update all questions state
      setAllQuestions(filteredQuestions);

    } catch (error) {
      console.error('Error generating questions from Word:', error);
      alert('Đã xảy ra lỗi khi tạo câu hỏi từ tệp Word.');
    } finally {
      setLoading(false);
    }
  };

  const generateWordDocument = async (questions, headerInfo) => {
    const multipleChoiceQuestions = questions.filter(q => q.type === 'multiple-choice');
    const trueFalseQuestions = questions.filter(q => q.type === 'true-false');
    const shortAnswerQuestions = questions.filter(q => q.type === 'short-answer');

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: headerInfo.mainTitle, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: headerInfo.subTitle, bold: true }),
            ],
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Môn: ${headerInfo.subject}`, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: `Thời gian làm bài: ${headerInfo.examTime} (không kể thời gian giao đề)`, italics: true }),
            ],
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "(Đề thi gồm ....trang, có ... câu)" }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: "Ngày thi :.../.../...."}),
            ],
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: " " }), // Adding a blank line for spacing
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Họ và tên thí sinh:.......................................................",bold: true }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Số báo danh: ............................................................", bold: true }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: " " }), // Adding a blank line for spacing
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn. Thí sinh trả lời từ câu 1 đến câu ${multipleChoiceQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.`, bold: true }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          ...multipleChoiceQuestions.flatMap((question, index) => [
            new Paragraph({
              children: [
                new TextRun({ text: `Câu ${index + 1}:`, bold: true }),
                new TextRun({ text: ` ${question.question}` }),
              ],
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'A.', bold: true }),
                new TextRun(` ${question.options[0]}`),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'B.', bold: true }),
                new TextRun(` ${question.options[1]}`),
              ],
              tabStops: [
                {
                  type: TabStopType.LEFT,
                  position: TabStopPosition.MAX / 2,
                },
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'C.', bold: true }),
                new TextRun(` ${question.options[2]}`),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'D.', bold: true }),
                new TextRun(` ${question.options[3]}`),
              ],
              tabStops: [
                {
                  type: TabStopType.LEFT,
                  position: TabStopPosition.MAX / 2,
                },
              ],
            }),
          ]),
          ...(trueFalseQuestions.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: " " }), // Adding a blank line for spacing
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `PHẦN II. Câu trắc nghiệm đúng sai. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + 1} đến câu ${multipleChoiceQuestions.length + trueFalseQuestions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.`, bold: true }),
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...trueFalseQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu `, bold: true }),
                  new TextRun({ text: `${multipleChoiceQuestions.length + index + 1}: `, bold: true }),
                  new TextRun({ text: `${question.question}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'a) ', bold: true }),
                  new TextRun({ text: `${question.options[0]}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'b) ', bold: true }),
                  new TextRun({ text: `${question.options[1]}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'c) ', bold: true }),
                  new TextRun({ text: `${question.options[2]}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'd) ', bold: true }),
                  new TextRun({ text: `${question.options[3]}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ]),
          ] : []),
          ...(shortAnswerQuestions.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: " " }), // Adding a blank line for spacing
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `PHẦN III: Câu trắc nghiệm yêu cầu trả lời ngắn. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + 1} đến câu ${questions.length}.`, bold: true }),
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...shortAnswerQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + index + 1}: `, bold: true }),
                  new TextRun({ text: `${question.question}` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `Đáp án: `, bold: true }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ]),
          ] : []),
          new Paragraph({
            children: [
              new TextRun({ text: " " }), // Adding a blank line for spacing
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: " " }), // Adding a blank line for spacing
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "HẾT", bold: true }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      }],
    });
  
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${quizTitle}.docx`);
  };

  return (
    <div className="create-quiz-title-form">
      <h2 className="Createquizz-title-feature">Tạo bài tập từ bài giảng</h2>
      <input
        type="text"
        id="quizTitle"
        name="quizTitle"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Nhập tiêu đề bài tập..."
      />
      <p className="solver-intro">Tải lên tệp bài giảng (Word) để tạo câu hỏi tự động</p>
      <input
        type="file"
        accept=".docx"
        onChange={handleTeacherFileUpload}
      />
      {questionTypes.multipleChoice && (
        <input
          id="numMultipleChoice"
          name="numMultipleChoice"
          type="number"
          value={teacherNumMultipleChoice}
          onChange={(e) => setTeacherNumMultipleChoice(e.target.value)}
          placeholder="Số lượng câu hỏi trắc nghiệm"
          min="1"
        />
      )}
      {questionTypes.trueFalse && (
        <input
          id="numTrueFalse"
          name="numTrueFalse"
          type="number"
          value={teacherNumTrueFalse}
          onChange={(e) => setTeacherNumTrueFalse(e.target.value)}
          placeholder="Số lượng câu hỏi đúng/sai"
          min="1"
        />
      )}
      {questionTypes.shortAnswer && (
        <input
          id="numShortAnswer"
          name="numShortAnswer"
          type="number"
          value={teacherNumShortAnswer}
          onChange={(e) => setTeacherNumShortAnswer(e.target.value)}
          placeholder="Số lượng câu hỏi trả lời ngắn"
          min="1"
        />
      )}
      <select
        value={differentiationLevel}
        onChange={(e) => setDifferentiationLevel(e.target.value)}
      >
        <option value="low">Độ phân hóa thấp</option>
        <option value="medium">Độ phân hóa trung bình</option>
        <option value="high">Độ phân hóa cao</option>
      </select>
      <div className="question-type-selection">
        <label>
          <input
            type="checkbox"
            checked={questionTypes.multipleChoice}
            onChange={() => handleQuestionTypeChange('multipleChoice')}
          />
          trắc nghiệm
        </label>
        <label>
          <input
            type="checkbox"
            checked={questionTypes.trueFalse}
            onChange={() => handleQuestionTypeChange('trueFalse')}
          />
          đúng/sai
        </label>
        <label>
          <input
            type="checkbox"
            checked={questionTypes.shortAnswer}
            onChange={() => handleQuestionTypeChange('shortAnswer')}
          />
          trả lời ngắn
        </label>
      </div>
      <button className="create-quiz-add-question-btn" onClick={generateQuestionsFromWord}>Tạo câu hỏi từ bài giảng</button>
      {loading && (
        <div className="loader">
          <img src={magic} alt="Loading..." className="loading-icon" />
          <p>Đang tạo đề thi, vui lòng chờ...</p>
        </div>
      )}
      <div className="header-customization">
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          placeholder="Tiêu đề chính"
        />
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Tiêu đề phụ"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Môn học"
        />
        <input
          type="text"
          value={examTime}
          onChange={(e) => setExamTime(e.target.value)}
          placeholder="Thời gian làm bài"
        />
      </div>
      <button className="create-quiz-download-btn" onClick={() => generateWordDocument(allQuestions, {
        mainTitle,
        subTitle,
        subject,
        examTime,
      })}>Tạo file Word</button>
    </div>
  );
};

export default TeacherQuizCreator;