import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun,  AlignmentType, TabStopPosition, TabStopType } from 'docx';
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
  const [extractedText, setExtractedText] = useState(''); // Add this new state

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
      // Đảm bảo ít nhất một loại được chọn
      if (!newTypes.multipleChoice && !newTypes.trueFalse && !newTypes.shortAnswer) {
        return prev;
      }
      return newTypes;
    });
  };

  const supplementMissingQuestions = async (existingQuestions, targetCounts, originalText, difficultyDistribution) => {
    const currentCounts = {
      'multiple-choice': existingQuestions.filter(q => q.type === 'multiple-choice').length,
      'true-false': existingQuestions.filter(q => q.type === 'true-false').length,
      'short-answer': existingQuestions.filter(q => q.type === 'short-answer').length
    };

    const missingCounts = {
      'multiple-choice': questionTypes.multipleChoice ? Math.max(0, targetCounts.multipleChoice - currentCounts['multiple-choice']) : 0,
      'true-false': questionTypes.trueFalse ? Math.max(0, targetCounts.trueFalse - currentCounts['true-false']) : 0,
      'short-answer': questionTypes.shortAnswer ? Math.max(0, targetCounts.shortAnswer - currentCounts['short-answer']) : 0
    };

    // Nếu đã đủ số lượng câu hỏi, trả về luôn mảng hiện tại
    if (Object.values(missingCounts).every(count => count === 0)) {
      return existingQuestions;
    }

    // Tạo mảng các yêu cầu chỉ cho những loại câu hỏi còn thiếu
    const missingRequests = [];
    if (missingCounts['multiple-choice'] > 0) {
      missingRequests.push(`${missingCounts['multiple-choice']} câu hỏi trắc nghiệm với 4 lựa chọn, 1 đáp án đúng và giải thích`);
    }
    if (missingCounts['true-false'] > 0) {
      missingRequests.push(`${missingCounts['true-false']} câu hỏi đúng/sai với 4 phát biểu đúng/sai liên kết`);
    }
    if (missingCounts['short-answer'] > 0) {
      missingRequests.push(`${missingCounts['short-answer']} câu hỏi trả lời ngắn dạng tính toán`);
    }

    const supplementPrompt = `Từ nội dung bài giảng sau: ${originalText}

    Hiện tại đã có các câu hỏi: ${JSON.stringify(existingQuestions)}

    Hãy tạo thêm:
    ${missingRequests.join('\n')}

    Yêu cầu quan trọng về định dạng:
    1. KHÔNG sử dụng bất kỳ thẻ HTML nào trong câu hỏi và đáp án
    2. KHÔNG sử dụng các ký tự đặc biệt hay định dạng HTML như &nbsp; hay <br>
    3. Chỉ sử dụng văn bản thuần túy (plain text)
    4. Sử dụng dấu xuống dòng thông thường nếu cần thiết

    Các yêu cầu về nội dung:
    1. Các câu hỏi mới KHÔNG ĐƯỢC TRÙNG LẶP với các câu hỏi hiện có
    2. Phải tuân theo phân bố độ khó: ${difficultyDistribution}
    3. QUAN TRỌNG: Giữ nguyên danh pháp hóa học giống trong file ở cả câu hỏi và các đáp án (danh pháp hóa học tiếng anh)
    4. Câu hỏi được đặt bằng tiếng Việt
    5. Đảm bảo các công thức hóa học có chỉ số dưới dạng subscript (ví dụ: CH₄)

    Yêu cầu cho từng loại câu hỏi:
    ${missingCounts['multiple-choice'] > 0 ? '- Trắc nghiệm: 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết' : ''}
    ${missingCounts['true-false'] > 0 ? '- Đúng/sai: 4 phát biểu liên kết, có câu dẫn, phát biểu cuối khó nhất' : ''}
    ${missingCounts['short-answer'] > 0 ? '- Trả lời ngắn: phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(không có chữ nha), bỏ các dạng toán đốt cháy' : ''}

    Trả về kết quả dưới dạng JSON với cấu trúc sau:
    [
      {
        "type": "multiple-choice",
        "question": "Nội dung câu hỏi",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explain": "Giải thích chi tiết"
      },
      {
        "type": "true-false",
        "question": "Câu dẫn + Nội dung câu hỏi",
        "options": ["Phát biểu 1", "Phát biểu 2", "Phát biểu 3", "Phát biểu khó nhất"],
        "correctAnswer": ["Đúng", "Sai", "Đúng", "Sai"]
      },
      {
        "type": "short-answer",
        "question": "Nội dung câu hỏi tính toán",
        "correctAnswer": "Đáp án ngắn gọn"
      }
    ]`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
      const result = await model.generateContent(supplementPrompt);
      const response = await result.response;
      const cleanText = response.text()
        .replace(/`/g, '')
        .replace(/json/g, '')
        .replace(/\*/g, '')
        .replace(/\\"/g, '"')
        .replace(/'/g, "'")
        .replace(/\\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace HTML non-breaking spaces
        .replace(/&[a-z]+;/g, '') // Remove other HTML entities
        .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

      let supplementaryQuestions = JSON.parse(cleanText);
      
      // Đảm bảo supplementaryQuestions luôn là mảng
      if (!Array.isArray(supplementaryQuestions)) {
        supplementaryQuestions = [supplementaryQuestions];
      }

      // Chuẩn hóa format cho từng câu hỏi
      supplementaryQuestions = supplementaryQuestions.map(question => {
        switch (question.type) {
          case 'multiple-choice':
            return {
              type: 'multiple-choice',
              question: question.question,
              options: question.options || [],
              correctAnswer: question.correctAnswer || question.options?.[0],
              explain: question.explain || 'Không có giải thích'
            };
          case 'true-false':
            return {
              type: 'true-false',
              question: question.question,
              options: question.options || [],
              correctAnswer: Array.isArray(question.correctAnswer) ? 
                question.correctAnswer : 
                question.options?.map(() => 'Đúng') || []
            };
          case 'short-answer':
            return {
              type: 'short-answer',
              question: question.question,
              correctAnswer: question.correctAnswer || ''
            };
          default:
            return question;
        }
      });

      return [...existingQuestions, ...supplementaryQuestions];
    } catch (error) {
      console.error('Error supplementing questions:', error);
      throw new Error('Không thể tạo thêm câu hỏi bổ sung');
    }
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
      const extractedContent = await extractTextFromWord(teacherFile);
      setExtractedText(extractedContent);

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
        default:
          difficultyDistribution = "Mức độ không hợp lệ";
      }

      const prompt = `Hãy tạo 
        ${questionTypes.multipleChoice ? teacherNumMultipleChoice + ' câu hỏi trắc nghiệm' : ''} 
        ${questionTypes.multipleChoice && (questionTypes.trueFalse || questionTypes.shortAnswer) ? 'và' : ''} 
        ${questionTypes.trueFalse ? teacherNumTrueFalse + ' câu hỏi đúng/sai' : ''}
        ${(questionTypes.multipleChoice || questionTypes.trueFalse) && questionTypes.shortAnswer ? 'và' : ''}
        ${questionTypes.shortAnswer ? teacherNumShortAnswer + ' câu hỏi trả lời ngắn' : ''}
        từ Nội dung bài giảng này: ${extractedContent}.

        Yêu cầu quan trọng về định dạng:
        1. KHÔNG sử dụng bất kỳ thẻ HTML nào trong câu hỏi và đáp án
        2. KHÔNG sử dụng các ký tự đặc biệt hay định dạng HTML như &nbsp; hay <br>
        3. Chỉ sử dụng văn bản thuần túy (plain text)
        4. Sử dụng dấu xuống dòng thông thường nếu cần thiết

        Các yêu cầu về nội dung:
        1. Tạo đủ số lượng câu hỏi theo yêu cầu
        2. Độ khó đa dạng để tạo độ phân hóa: ${difficultyDistribution}
        3. Không tự ý thêm câu hỏi không có trong bài giảng
        4. Các câu hỏi không được lặp lại
        5. QUAN TRỌNG: Giữ nguyên danh pháp hóa học giống trong file ở cả câu hỏi và các đáp án (danh pháp hóa học tiếng anh)
        6. Câu hỏi được đặt bằng tiếng Việt
        7. Đảm bảo các công thức hóa học có chỉ số dưới dạng subscript (ví dụ: CH₄)

        Yêu cầu cho từng loại câu hỏi:
        - Trắc nghiệm: 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết
        - Đúng/sai: 4 phát biểu liên kết, có câu dẫn, phát biểu cuối khó nhất
        - Trả lời ngắn: phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(không có chữ nha), bỏ các dạng toán đốt cháy.

        Trả về kết quả dưới dạng JSON với cấu trúc sau: ${JSON.stringify([
          {
            type: "multiple-choice",
            question: "Câu hỏi trắc nghiệm 1",
            options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
            correctAnswer: "Đáp án đúng",
            explain: "Giải thích cho đáp án đúng",
          },
          {
            type: "true-false",
            question: "Câu hỏi đúng/sai 1",
            options: ["Phát biểu A", "Phát biểu B", "Phát biểu C", "Phát biểu D"],
            correctAnswer: ["Đúng", "Sai", "Đúng", "Sai"],
          },
          {
            type: "short-answer",
            question: "Câu hỏi trả lời ngắn 1",
            correctAnswer: "Đáp án ngắn gọn",
          }
        ])}.`;

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
      let generatedQuestions;
      try {
        generatedQuestions = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        alert('Đã xảy ra lỗi khi tạo đề, xin vui lòng hãy tạo lại.');
        return;
      }

      const questionsArray = Array.isArray(generatedQuestions) ? generatedQuestions : [generatedQuestions];
      
      // Filter questions based on selected types
      const filteredQuestions = questionsArray.filter(q => 
        (questionTypes.multipleChoice && q.type === 'multiple-choice') ||
        (questionTypes.trueFalse && q.type === 'true-false') ||
        (questionTypes.shortAnswer && q.type === 'short-answer')
      );
      
      const finalQuestions = await supplementMissingQuestions(
        filteredQuestions, 
        {
          multipleChoice: parseInt(teacherNumMultipleChoice) || 0,
          trueFalse: parseInt(teacherNumTrueFalse) || 0,
          shortAnswer: parseInt(teacherNumShortAnswer) || 0
        },
        extractedContent,
        difficultyDistribution
      );

      // Update questions state
      const multipleChoiceQuestions = finalQuestions.filter(q => q.type === 'multiple-choice');
      setQuestions(multipleChoiceQuestions);

      // Update all questions state
      setAllQuestions(finalQuestions);

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
  
    // Thêm metadata ẩn để liên kết với file đáp án
    doc.coreProperties.keywords = `answer_file:${quizTitle}_answers.docx`;

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${quizTitle}.docx`);
  };

  // hàm tạo file đáp án
  const generateAnswerDocument = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Đáp án", bold: true })],
            alignment: AlignmentType.CENTER,
          }),
          // Phần I: Trắc nghiệm
          new Paragraph({
            children: [new TextRun({ text: "PHẦN I. TRẮC NGHIỆM", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          ...allQuestions
            .filter(q => q.type === 'multiple-choice')
            .map((question, index) => {
              const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
              const correctAnswerLabel = String.fromCharCode(65 + correctAnswerIndex); // A, B, C, D
              return new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${index + 1}: `, bold: true }),
                  new TextRun({ text: `${correctAnswerLabel}` }), // Hiển thị đáp án đúng là A, B, C, D
                ],
              });
            }),
          // Phần II: Đúng/Sai
          ...(allQuestions.some(q => q.type === 'true-false') ? [
            new Paragraph({
              children: [new TextRun({ text: "PHẦN II. ĐÚNG/SAI", bold: true })],
              alignment: AlignmentType.LEFT,
            }),
            ...allQuestions
              .filter(q => q.type === 'true-false')
              .map((question, index) => {
                const startIndex = allQuestions.filter(q => q.type === 'multiple-choice').length;
                return new Paragraph({
                  children: [
                    new TextRun({ text: `Câu ${startIndex + index + 1}: `, bold: true }),
                    ...question.correctAnswer.map((ans, i) => 
                      new TextRun({ text: `${String.fromCharCode(97 + i)}) ${ans}  ` })
                    ),
                  ],
                });
              })
          ] : []),
          // Phần III: Trả lời ngắn
          ...(allQuestions.some(q => q.type === 'short-answer') ? [
            new Paragraph({
              children: [new TextRun({ text: "PHẦN III. TRẢ LỜI NGẮN", bold: true })],
              alignment: AlignmentType.LEFT,
            }),
            ...allQuestions
              .filter(q => q.type === 'short-answer')
              .map((question, index) => {
                const startIndex = allQuestions.filter(q => 
                  q.type === 'multiple-choice' || q.type === 'true-false'
                ).length;
                return new Paragraph({
                  children: [
                    new TextRun({ text: `Câu ${startIndex + index + 1}: `, bold: true }),
                    new TextRun({ text: question.correctAnswer }),
                  ],
                });
              })
          ] : []),
        ],
      }],
    });
  
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${quizTitle}_answers.docx`);
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
      <button className="create-quiz-download-btn" onClick={generateAnswerDocument}>Tạo file đáp án</button>
    </div>
  );
};

export default TeacherQuizCreator;
