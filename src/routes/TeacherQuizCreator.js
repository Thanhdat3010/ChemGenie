import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';

import mammoth from 'mammoth';
import magic from "../assets/magic-dust.png";
import './TeacherQuizCreator.css';
import { API_KEY } from '../config';
import { generateWordDocument, generateAnswerDocument } from './generateWordDocument';
const TeacherQuizCreator = ({ quizTitle, setQuizTitle }) => {
  const [teacherFiles, setTeacherFiles] = useState([]);
  const [teacherNumMultipleChoice, setTeacherNumMultipleChoice] = useState();
  const [teacherNumTrueFalse, setTeacherNumTrueFalse] = useState();
  const [differentiationLevel, setDifferentiationLevel] = useState('medium');
  const [mainTitle, setMainTitle] = useState('Trường THPT Nguyễn Chí Thanh');
  const [subTitle, setSubTitle] = useState('Đề kiểm tra hệ số 1');
  const [subject, setSubject] = useState('HÓA HỌC');
  const [examTime, setExamTime] = useState('15 phút');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [teacherNumShortAnswer, setTeacherNumShortAnswer] = useState();
  const closeModal = () => {
    setModalOpen(false);
  };
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: true,
    shortAnswer: true
  });
  const [extractedText, setExtractedText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [combinedContent, setCombinedContent] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const genAI = new GoogleGenerativeAI(API_KEY);
  // AIzaSyBc1fHj2tGSwmVraM39ZXzFjvy_qubMct8 API dự phòng
  const handleTeacherFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.some(file => !file.name.endsWith('.docx'))) {
      alert('Chỉ chấp nhận file định dạng .docx');
      return;
    }
    setTeacherFiles(prevFiles => [...prevFiles, ...newFiles]);
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
      .replace(/\s+/g, ' ')           // Gộp nhiều khoảng trắng thành một
      .replace(/^\s*[\r\n]/gm, '')    // Xóa dòng trống
      .replace(/[\r\n]+/g, '\n')      // Gộp nhiều dòng trống thành một
      
      // Xử lý các ký tự đặc biệt
      .replace(/[""]/g, '"')          // Chuẩn hóa dấu ngoặc kép
      .replace(/['']/g, "'")          // Chuẩn hóa dấu ngoặc đơn
      
      // Xử lý công thức hóa học
      .replace(/(\d+)([A-Za-z])/g, '$1 $2')  // Thêm khoảng trắng giữa số và chữ
      .replace(/([A-Za-z])(\d+)/g, '$1₍$2₎') // Chuyển số thành chỉ số dưới
      
      // Xử lý các đơn vị đo lường
      .replace(/(\d+)\s*(ml|g|kg|m|cm|mm|L)/gi, '$1 $2')
      
      // Loại bỏ khoảng trắng đầu và cuối
      .trim();

    // Xử lý thêm cho văn bản tiếng Việt
    cleanedText = cleanedText
      // Đảm bảo khoảng trắng sau dấu câu tiếng Việt
      .replace(/([.,!?;:])\s*([^\s])/g, '$1 $2')
      
      // Xử lý dấu gạch ngang trong từ ghép
      .replace(/\s+-\s+/g, '-')
      
      // Chuẩn hóa khoảng trắng trong ngoặc
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      
      // Xử lý các từ viết tắt phổ biến
      .replace(/([A-Z]+)\s+([A-Z]+)/g, '$1$2')  // VD: T P H C M -> TPHCM
      
      // Đảm bảo không có khoảng trắng trước dấu phẩy và chấm
      .replace(/\s+([.,])/g, '$1');

    return cleanedText;
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

    CHUẨN NĂNG LỰC CẦN ĐÁNH GIÁ (GDPT 2018):
    ${COMPETENCY_STANDARDS}

    ĐẶC BIỆT QUAN TRỌNG: 
    + Giữ nguyên danh pháp hóa học giống trong bài giảng ở cả câu hỏi và các đáp án về các thuật ngữ hóa học và các chất hóa học (danh pháp hóa học tiếng anh, IUPAC)
    + Đối với các thuật ngữ hóa học bạn thêm vào cũng để tiếng anh cho tôi
   Lưu ý QUAN TRỌNG về phân bổ năng lực:
        1. Phải đảm bảo sử dụng đều các nhóm năng lực (HH1, HH2, HH3)
        2. Trong mỗi nhóm, cần phân bổ đều các năng lực con
        3. Tỷ lệ phân bổ các nhóm năng lực:
           - Nhóm HH1 (Nhận thức): 40%
           - Nhóm HH2 (Tìm hiểu): 35%
           - Nhóm HH3 (Vận dụng): 25%
        4. Không được sử dụng lặp lại một năng lực quá nhiều lần
        5. Với câu hỏi đúng/sai, 4 phát biểu phải sử dụng năng lực từ các nhóm khác nhau

        Lưu ý quan trọng câu hỏi phải có:
            - Mã năng lực được đánh giá (theo chuẩn GDPT 2018 ở trên)
            - Mỗi câu chỉ được DUY NHẤT 1 năng lực (riêng câu đúng/sai có 4 năng lực tương ứng với 4 phát biểu)
            - Giải thích cách đánh giá năng lực đó
            - Quan trọng nhất: Mỗi câu hỏi đều bắt buộc có năng lực
            - Phải sử dụng hết các năng lực đã được định sẵn
            - Giải thích đánh giá năng lực PHẢI theo format:
              "Đánh giấ năng lực: (Mã năng lực) [trích nguyên văn mô tả năng lực từ chuẩn], câu hỏi này đánh giá thông qua việc [mô tả cụ thể cách câu hỏi đánh giá năng lực đó]"
              
              Ví dụ: 
              - "Đánh giá năng lực: (HH1.1) Nhận biết và nêu được tên của các đối tượng, sự kiện, khái niệm hoặc quá trình hoá học, câu hỏi này đánh giá thông qua việc yêu cầu học sinh nhận biết và nêu tên các chất trong phản ứng hóa học"
              
              - "Đánh giá năng lực: (HH2.4) Thu thập và phân tích dữ liệu, rút ra kết luận, câu hỏi này đánh giá thông qua việc yêu cầu học sinh phân tích dữ kiện bài toán và tính toán kết quả"
              
              - "Đánh giá năng lực: (HH3.1) Vận dụng để giải thích hiện tượng tự nhiên và ứng dụng trong cuộc sống, câu hỏi này đánh giá thông qua việc yêu cầu học sinh giải thích hiện tượng hóa học trong thực tế"

            - Quan trọng nhất: Mỗi câu hỏi đều bắt buộc có năng lực và giải thích chi tiết
            - Phải sử dụng hết các năng lực đã được định sẵn
            - TUYỆT ĐỐI KHÔNG được tự ý thêm bớt nội dung của chuẩn năng lực, phải trích nguyên văn

    Hãy tạo thêm:
    ${missingRequests.join('\n')}

    Yêu cầu quan trọng về định dạng:
    1. KHÔNG sử dụng bất kỳ thẻ HTML nào trong câu hỏi và đáp án
    2. KHÔNG sử dụng các ký tự đặc biệt hay định dạng HTML như &nbsp; hay <br>
    3. Chỉ sử dụng văn bản thuần túy (plain text)
    4. Với các công thức hóa học:
       - Viết chỉ số dưới bằng ký tự Unicode trực tiếp (ví dụ: H₂O thay vì H<sub>2</sub>O)
       - Sử dụng ký tự → cho mũi tên phản ứng
       - Sử dụng dấu ⇌ cho phản ứng thuận nghịch
    5. Với các đơn vị đo:
       - Viết m³ thay vì m<sup>3</sup>
       - Viết cm³ thay vì cm<sup>3</sup>
       - Tương tự cho các đơn vị khác

    Các yêu cầu về nội dung:
    1. Các câu hỏi mới KHÔNG ĐƯỢC TRÙNG LẶP với các câu hỏi hiện có
    2. Phải tuân theo phân bố độ khó: ${difficultyDistribution}
    3. Câu hỏi được đặt bằng tiếng Việt
    4. Đảm bảo các công thức hóa học có chỉ số dưới dạng subscript (ví dụ: CH₄)
    

    Yêu cầu cho từng loại câu hỏi:
    ${missingCounts['multiple-choice'] > 0 ? '- Trắc nghiệm: 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết' : ''}
    ${missingCounts['true-false'] > 0 ? '- Đúng/sai: mỗi câu hỏi sẽ có 4 phát biểu liên kết, có câu dẫn, phát biểu cuối khó nhất' : ''}
    ${missingCounts['short-answer'] > 0 ? '- Trả lời ngắn: phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(không có chữ nha), bỏ các dạng toán đốt cháy' : ''}

    Trả về kết quả dưới dạng JSON với cấu trúc sau:
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

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
        .replace(/<[^>]*>/g, '') 
        .replace(/&nbsp;/g, ' ') 
        .replace(/&[a-z]+;/g, '')
        .replace(/\\u([a-fA-F0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

      let supplementaryQuestions = JSON.parse(cleanText);
      
      // Đảm bảo supplementaryQuestions luôn là mảng
      if (!Array.isArray(supplementaryQuestions)) {
        supplementaryQuestions = [supplementaryQuestions];
      }

      // Chuẩn hóa format cho từng câu hỏi
      supplementaryQuestions = supplementaryQuestions.map(question => {
        if (!question.type || !question.question) return null;

        const baseQuestion = {
          type: question.type,
          question: question.question
        };

        switch (question.type) {
          case 'multiple-choice':
            if (!question.options?.length || !question.correctAnswer || !question.explain) return null;
            return {
              ...baseQuestion,
              options: question.options,
              correctAnswer: question.correctAnswer,
              explain: question.explain,
              competency: question.competency || '',
              competencyExplanation: question.competencyExplanation || ''
            };

          case 'true-false':
            if (!question.options?.length || !question.correctAnswer?.length) return null;
            return {
              ...baseQuestion,
              options: question.options,
              correctAnswer: question.correctAnswer,
              competencies: question.competencies || []
            };

          case 'short-answer':
            if (!question.correctAnswer) return null;
            return {
              ...baseQuestion,
              correctAnswer: question.correctAnswer,
              competency: question.competency || '',
              competencyExplanation: question.competencyExplanation || ''
            };

          default:
            return null;
        }
      }).filter(Boolean); // Lọc bỏ các câu hỏi null

      // Validate từng câu hỏi
      const validQuestions = supplementaryQuestions.filter(question => {
        switch (question.type) {
          case 'multiple-choice':
            return question.options.length === 4 &&
                   question.correctAnswer &&
                   question.explain &&
                   question.competency &&
                   question.competencyExplanation;

          case 'true-false':
            return question.options.length === 4 &&
                   question.correctAnswer.length === 4 &&
                   question.competencies?.length === 4;

          case 'short-answer':
            return question.correctAnswer &&
                   question.competency &&
                   question.competencyExplanation;

          default:
            return false;
        }
      });

      if (validQuestions.length < supplementaryQuestions.length) {
        console.error('Một số câu hỏi bổ sung không hợp lệ:', 
          supplementaryQuestions.filter(q => !validQuestions.includes(q))
        );
        throw new Error('Một số câu hỏi bổ sung thiếu thông tin. Vui lòng tạo lại.');
      }

      return [...existingQuestions, ...validQuestions];
    } catch (error) {
      console.error('Error supplementing questions:', error);
      throw new Error('Không thể tạo thêm câu hỏi bổ sung: ' + error.message);
    }
  };

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

  const generateQuestionsFromWord = async () => {
    if (teacherFiles.length === 0) {
      alert('Vui lòng tải lên ít nhất một tệp Word (.docx)');
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
      const contents = await Promise.all(
        teacherFiles.map(async (file) => {
          const content = await extractTextFromWord(file);
          return content;
        })
      );
      
      // Kết hợp nhiều file với phân cách rõ ràng
      const combined = contents
        .filter(content => content.trim().length > 0)
        .join('\n\n=== Tài liệu mới ===\n\n');
      
      setCombinedContent(combined);
      setExtractedText(combined);

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

      const prompt = `Bạn là một chuyên gia trong việc tạo đề thi hóa học.
        Hãy tạo 
        ${questionTypes.multipleChoice ? teacherNumMultipleChoice + ' câu hỏi trắc nghiệm' : ''} 
        ${questionTypes.multipleChoice && (questionTypes.trueFalse || questionTypes.shortAnswer) ? 'và' : ''} 
        ${questionTypes.trueFalse ? teacherNumTrueFalse + ' câu hỏi đúng/sai' : ''}
        ${(questionTypes.multipleChoice || questionTypes.trueFalse) && questionTypes.shortAnswer ? 'và' : ''}
        ${questionTypes.shortAnswer ? teacherNumShortAnswer + ' câu hỏi trả lời ngắn' : ''}
        từ Nội dung bài giảng này: ${combined}.

        CHUẨN NĂNG LỰC CẦN ĐÁNH GIÁ (GDPT 2018):
        ${COMPETENCY_STANDARDS}
      
        ĐẶC BIỆT QUAN TRỌNG: 
        + Giữ nguyên danh pháp hóa học giống trong bài giảng ở cả câu hỏi và các đáp án về các thuật ngữ hóa học và các chất hóa học (danh pháp hóa học tiếng anh, IUPAC)
        + Đối với các thuật ngữ hóa học bạn thêm vào cũng để tiếng anh cho tôi

       Lưu ý QUAN TRỌNG về phân bổ năng lực:
        1. Phải đảm bảo sử dụng đều các nhóm năng lực (HH1, HH2, HH3)
        2. Trong mỗi nhóm, cần phân bổ đều các năng lực con
        3. Tỷ lệ phân bổ các nhóm năng lực:
           - Nhóm HH1 (Nhận thức): 40%
           - Nhóm HH2 (Tìm hiểu): 35%
           - Nhóm HH3 (Vận dụng): 25%
        4. Không được sử dụng lặp lại một năng lực quá nhiều lần
        5. Với câu hỏi đúng/sai, 4 phát biểu phải sử dụng năng lực từ các nhóm khác nhau

        Lưu ý quan trọng câu hỏi phải có:
            - Mã năng lực được đánh giá (theo chuẩn GDPT 2018 ở trên)
            - Mỗi câu chỉ được DUY NHẤT 1 năng lực (riêng câu đúng/sai có 4 năng lực tương ứng với 4 phát biểu)
            - Giải thích cách đánh giá năng lực đó
            - Quan trọng nhất: Mỗi câu hỏi đều bắt buộc có năng lực
            - Phải sử dụng hết các năng lực đã được định sẵn
            - Giải thích đánh giá năng lực PHẢI theo format:
              "Đánh giấ năng lực: (Mã năng lực) [trích nguyên văn mô tả năng lực từ chuẩn], câu hỏi này đánh giá thông qua việc [mô tả cụ thể cách câu hỏi đánh giá năng lực đó]"
              
               Ví dụ: 
              - "Đánh giá năng lực: (HH1.1) Nhận biết và nêu được tên của các đối tượng, sự kiện, khái niệm hoặc quá trình hoá học, câu hỏi này đánh giá thông qua việc yêu cầu học sinh nhận biết và nêu tên các chất trong phản ứng hóa học"
              
              - "Đánh giá năng lực: (HH2.4) Thu thập và phân tích dữ liệu, rút ra kết luận, câu hỏi này đánh giá thông qua việc yêu cầu học sinh phân tích dữ kiện bài toán và tính toán kết quả"
              
              - "Đánh giá năng lực: (HH3.1) Vận dụng để giải thích hiện tượng tự nhiên và ứng dụng trong cuộc sống, câu hỏi này đánh giá thông qua việc yêu cầu học sinh giải thích hiện tượng hóa học trong thực tế"

            - Quan trọng nhất: Mỗi câu hỏi đều bắt buộc có năng lực và giải thích chi tiết
            - Phải sử dụng hết các năng lực đã được định sẵn
            - TUYỆT ĐỐI KHÔNG được tự ý thêm bớt nội dung của chuẩn năng lực, phải trích nguyên văn

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
        2. Độ khó đa dạng để tạo độ phân hóa: ${difficultyDistribution}
        3. Không tự ý thêm câu hỏi không có trong bài giảng
        4. Các câu hỏi không được giống nhau, các đáp án trong cùng một câu không được giống nhau
        5. Câu hỏi được đặt bằng tiếng Việt
        6. Đảm bảo các công thức hóa học có chỉ số dưới dạng subscript (ví dụ: CH₄)
        7. Phân bố câu hỏi đều giữa các bài giảng, không tập trung quá nhiều vào một bài
        8. Tạo các câu hỏi có tính liên kết giữa các bài giảng khi có thể
        

        Yêu cầu cho từng loại câu hỏi:
        - Trắc nghiệm: 4 lựa chọn, 1 đáp án đúng và giải thích chi tiết, mỗi câu có 1 năng lực đánh giá
        - Đúng/sai: mỗi câu có 4 phát biểu liên kết, có câu dẫn, phát biểu cuối khó nhất. ĐẶC BIỆT: Mỗi câu sẽ có 4 năng lực tương ứng với 4 phát biểu
        - Trả lời ngắn: phần này luôn trả về câu hỏi là câu hỏi tính toán và có đáp án ngắn gọn(không có chữ nha), bỏ các dạng toán đốt cháy, mỗi câu có 1 năng lực đánh giá

        Trả về kết quả dưới dạng JSON với cấu trúc sau: ${JSON.stringify([
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
        ])}.`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
      const result = await model.generateContent(prompt);
      console.log(prompt);
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
        combined,
        difficultyDistribution
      );

      // Sắp xếp câu hỏi theo thứ tự mong muốn
      const sortedQuestions = finalQuestions.sort((a, b) => {
        const typeOrder = {
          'multiple-choice': 1,
          'true-false': 2,
          'short-answer': 3
        };
        return typeOrder[a.type] - typeOrder[b.type];
      });

      // Update questions state với danh sách đã được sắp xếp
      setQuestions(sortedQuestions);

    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Đã xảy ra lỗi khi tạo câu hỏi');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWordDocument = () => {
    generateWordDocument(questions, {
      mainTitle,
      subTitle,
      subject,
      examTime,
    }, quizTitle);
  };

  const handleGenerateAnswerDocument = () => {
    generateAnswerDocument(questions, quizTitle);
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
  
    try {
      const userId = user.uid;
      const docRef = doc(db, 'createdQuizzes', `${quizTitle}-${userId}`);
      await setDoc(docRef, { 
        userId, 
        title: quizTitle, 
        questions: questions // Lưu trực tiếp questions vì đã có đủ thông tin
      });
      setModalOpen(true);
      setQuizTitle('');
      setQuestions([]);
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Đã xảy ra lỗi khi lưu bộ câu hỏi.');
    }
  };

  const handleRemoveFile = (index) => {
    setTeacherFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setCombinedContent('');
  };

  const handleEditClick = (index, question) => {
    setEditingQuestion(index);
    setEditingData({ ...question });
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditingData(null);
  };

  const handleSaveEdit = (index) => {
    const newQuestions = [...questions];
    newQuestions[index] = editingData;
    setQuestions(newQuestions);
    setEditingQuestion(null);
    setEditingData(null);
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
      <div className="file-upload-section">
        <input
          type="file"
          accept=".docx"
          onChange={handleTeacherFileUpload}
          multiple
        />
        
        {teacherFiles.length > 0 && (
          <div className="uploaded-files-list">
            <h3>Danh sách file đã tải lên:</h3>
            {teacherFiles.map((file, index) => (
              <div key={index} className="uploaded-file-item">
                <span>{file.name}</span>
                <button onClick={() => handleRemoveFile(index)}>
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
      <button className="create-quiz-download-btn" onClick={handleGenerateWordDocument}>Tạo file Word</button>
      <button className="create-quiz-download-btn" onClick={handleGenerateAnswerDocument}>Tạo file đáp án</button>
      <div className="create-quiz-question-list">
        <h2 className="Createquizz-title-feature">Danh sách câu hỏi</h2>
        <ul>
          {questions && questions.length > 0 ? (
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
                    {editingQuestion === index ? (
                      <div className="teacher-quiz-creator-edit-form">
                        {editingData.type === 'multiple-choice' && (
                          <>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Câu hỏi:</label>
                              <textarea
                                value={editingData.question}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  question: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-textarea"
                                placeholder="Nhập câu hỏi"
                              />
                            </div>
                            <div className="teacher-quiz-creator-edit-options">
                              {editingData.options.map((option, i) => (
                                <div key={i} className="teacher-quiz-creator-edit-option-item">
                                  <label>{String.fromCharCode(65 + i)}:</label>
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...editingData.options];
                                      newOptions[i] = e.target.value;
                                      setEditingData({
                                        ...editingData,
                                        options: newOptions
                                      });
                                    }}
                                    className="teacher-quiz-creator-edit-input"
                                    placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Đáp án đúng:</label>
                              <select
                                value={editingData.correctAnswer}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  correctAnswer: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-select"
                              >
                                {editingData.options.map((option, i) => (
                                  <option key={i} value={option}>
                                    {String.fromCharCode(65 + i)}: {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Giải thích:</label>
                              <textarea
                                value={editingData.explain}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  explain: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-textarea"
                                placeholder="Giải thích đáp án"
                              />
                            </div>
                          </>
                        )}

                        {editingData.type === 'true-false' && (
                          <>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Câu dẫn:</label>
                              <textarea
                                value={editingData.question}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  question: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-textarea"
                                placeholder="Nhập câu dẫn"
                              />
                            </div>
                            {editingData.options.map((option, i) => (
                              <div key={i} className="teacher-quiz-creator-edit-option-item">
                                <label>{String.fromCharCode(97 + i)}):</label>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...editingData.options];
                                    newOptions[i] = e.target.value;
                                    setEditingData({
                                      ...editingData,
                                      options: newOptions
                                    });
                                  }}
                                  className="teacher-quiz-creator-edit-input"
                                  placeholder={`Phát biểu ${i + 1}`}
                                />
                                <select
                                  value={editingData.correctAnswer[i]}
                                  onChange={(e) => {
                                    const newCorrectAnswer = [...editingData.correctAnswer];
                                    newCorrectAnswer[i] = e.target.value;
                                    setEditingData({
                                      ...editingData,
                                      correctAnswer: newCorrectAnswer
                                    });
                                  }}
                                  className="teacher-quiz-creator-edit-select"
                                >
                                  <option value="Đúng">Đúng</option>
                                  <option value="Sai">Sai</option>
                                </select>
                              </div>
                            ))}
                          </>
                        )}

                        {editingData.type === 'short-answer' && (
                          <>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Câu hỏi:</label>
                              <textarea
                                value={editingData.question}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  question: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-textarea"
                                placeholder="Nhập câu hỏi"
                              />
                            </div>
                            <div className="teacher-quiz-creator-edit-group">
                              <label>Đáp án:</label>
                              <input
                                type="text"
                                value={editingData.correctAnswer}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  correctAnswer: e.target.value
                                })}
                                className="teacher-quiz-creator-edit-input"
                                placeholder="Nhập đáp án"
                              />
                            </div>
                          </>
                        )}

                        <div className="teacher-quiz-creator-edit-actions">
                          <button 
                            className="teacher-quiz-creator-edit-cancel"
                            onClick={handleCancelEdit}
                          >
                            Hủy
                          </button>
                          <button 
                            className="teacher-quiz-creator-edit-save"
                            onClick={() => handleSaveEdit(index)}
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>
                          <strong>Câu {index + 1} {
                            question.type === 'true-false' 
                              ? `(${question.competencies?.join(', ')})` 
                              : `(${question.competency})`
                          }:</strong> {question.question}
                        </p>
                        
                        {question.type === 'multiple-choice' && (
                          <div className="create-quiz-question-options">
                            {question.options.map((option, i) => (
                              <p key={i}>{String.fromCharCode(65 + i)}) {option}</p>
                            ))}
                            <p className="create-quiz-correct-answer">
                              <strong>Đáp án đúng:</strong> {question.correctAnswer}
                            </p>
                            <p><strong>Giải thích:</strong> {question.explain}</p>
                            <p className="competency-explanation">
                              <strong>Đánh giá năng lực:</strong> {question.competencyExplanation}
                            </p>
                          </div>
                        )}

                        {question.type === 'true-false' && (
                          <div className="create-quiz-question-options">
                            <div className="create-quiz-question-options">
                              <p>
                                <strong>a) </strong>
                                {question.options[0]} ({question.competencies[0]})
                              </p>
                              <p>
                                <strong>b) </strong>
                                {question.options[1]} ({question.competencies[1]})
                              </p>
                              <p>
                                <strong>c) </strong>
                                {question.options[2]} ({question.competencies[2]})
                              </p>
                              <p>
                                <strong>d) </strong>
                                {question.options[3]} ({question.competencies[3]})
                              </p>
                            </div>
                          </div>
                        )}

                        {question.type === 'short-answer' && (
                          <div className="create-quiz-question-options">
                            <p className="create-quiz-correct-answer">
                              <strong>Đáp án:</strong> {question.correctAnswer}
                            </p>
                            <p className="competency-explanation">
                              <strong>Đánh giá năng lực:</strong> {question.competencyExplanation}
                            </p>
                          </div>
                        )}

                        <div className="teacher-quiz-creator-actions">
                          <button 
                            className="teacher-quiz-creator-edit-btn"
                            onClick={() => handleEditClick(index, question)}
                          >
                            Sửa
                          </button>
                          <button 
                            className="create-quiz-delete-question-btn"
                            onClick={() => {
                              const newQuestions = questions.filter((_, i) => i !== index);
                              setQuestions(newQuestions);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </>
                    )}
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
  );
};

export default TeacherQuizCreator;
