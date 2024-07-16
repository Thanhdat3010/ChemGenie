import React, { useState, useEffect } from 'react';
import './Chapter2cauhoi.css';
import formatChemicalFormula from '../components/formatChemicalFormula';
import Notification from '../components/Notification';
import { db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Chapter2cauhoi = ({ onCompletion, onReset }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [questions, setQuestions] = useState([]);
  const chapterId = 'Chapter 2';
  const userId = user ? user.email : 'defaultUser';
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', userId, 'chapters', chapterId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestions(data.questions);
        setCurrentQuestion(data.currentQuestion);
        setAnswerState(data.answerState);
        setScore(data.score);
        setProgress(data.progress);
        setQuizCompleted(data.quizCompleted);
      } else {
        const questions = [
          {
            type: "multiple-choice",
            question: "Loại khí nào dưới nhiệt độ cao và áp suất thấp hành xử giống nhất như một khí lý tưởng?",
            options: ["He",  "O2", "NH3", "CO2", "Ne"],
            correctAnswer: "He",
            explain: "Càng nhỏ khí, nó sẽ càng hành xử giống như khí lý tưởng hơn. Hơn nữa, khí hành xử giống như khí lý tưởng nhất khi cách xa nhau. Điều này xảy ra ở áp suất thấp và nhiệt độ cao."
          },
          {
            type: "multiple-choice",
            question: "Mẫu nào thể hiện hạt được sắp xếp theo một mẫu hình hình học đều?",
            options: ["CO2 (g)", "CO2 (s)", "CO2 (l)", "CO2 (aq)", "Không có cái nào phù hợp"],
            correctAnswer: ("CO2 (s)"),
            explain: "Một mô hình hình học đều mô tả tốt nhất một chất rắn."
          },
          {
            type: "multiple-choice",
            question: "Ở nhiệt độ nào, mẫu nước có năng lượng kinet trung bình cao nhất?",
            options: ["0 độ Celsius", "100 độ Celsius", "0 K", "100 K", "273 K"],
            correctAnswer: "100 độ Celsius",
            explain: "Năng lượng Kinet Trung bình là thuật ngữ mô tả nhiệt độ. Nhiệt độ cao nhất có mặt trong các mẫu này là 100 độ Celsius, tương ứng với 373 Kelvin."
          },
          {
            type: "multiple-choice",
            question: "Một chất lỏng sẽ sôi khi",
            options: ["Điểm đóng băng bằng với điểm nóng chảy của nó", "Một lượng muối đã được thêm vào chất lỏng", "Áp suất hơi của nó bằng với điểm nóng chảy", "Nó được đun nóng ở một nhiệt độ thấp hơn nhiệt độ sôi", "Áp suất hơi của nó bằng với áp suất xung quanh"],
            correctAnswer: "Áp suất hơi của nó bằng với áp suất xung quanh",
            explain: "Một chất lỏng sẽ sôi khi áp suất hơi của nó bằng với áp suất khí quyển xung quanh. Bởi vì áp suất khí quyển có thể thay đổi, nhiệt độ sôi của một chất lỏng cũng có thể thay đổi."
          },
          {
            type: "multiple-choice",
            question: "Khí nào được dự kiến sẽ có tỷ lệ tràn ra cao nhất?",
            options: ["O2", "F2", "H2O", "He", "CH4"],
            correctAnswer: "He",
            explain: "Khí nhẹ nhất sẽ có mật độ thấp nhất và tỷ lệ tràn ra cao nhất. Trong số các lựa chọn, helium là khí nhẹ nhất."
          },
          {
            type: "multiple-choice",
            question: "Quá trình chuyển pha nào được mô tả đúng?",
            options: ["Chuyển từ rắn sang khí được gọi là sự đặt (deposition)", "Chuyển từ khí sang rắn được gọi là quá trình hoán vị (sublimation)", "Chuyển từ lỏng sang rắn được gọi là đóng băng", "Chuyển từ rắn sang lỏng được gọi là hơi hóa", "Chuyển từ lỏng sang khí được gọi là ngưng tụ"],
            correctAnswer: "Chuyển từ lỏng sang khí được gọi là ngưng tụ",
            explain: "Quá trình đóng băng của một chất lỏng sẽ tạo ra một chất rắn."
          },
          {
            type: "multiple-choice",
            question: "Một chất rắn, chất lỏng và khí có thể tồn tại cùng một lúc ở",
            options: ["Điểm bay hơi", "Điểm tam giác", "Điểm sôi", "Điểm đóng băng", "Điểm nóng chảy"],
            correctAnswer: "Điểm tam giác",
            explain: "Điểm tam giác kết hợp các điều kiện phù hợp về áp suất và nhiệt độ để một chất có thể tồn tại ở cùng một lúc ở cả ba pha rắn, lỏng và khí."
          },
          {
            type: "multiple-choice",
            question: "Một hỗn hợp khí tồn tại trong một container kín với các phần trăm sau đây: helium 40%, neon 50%, và argon 10% Nếu áp suất tổng của các khí là 1100 torr, thì điều nào sau đây đúng về các khí này?",
            options: ["Thể tích và nhiệt độ có một mối quan hệ tỉ lệ nghịch", "Thể tích và áp suất có một mối quan hệ thuận", "Áp suất riêng của khí neon là 550 torr", "Áp suất riêng của khí argon là 100 torr", "Các áp suất riêng của các khí không thể được tính toán với thông tin đã cho"],
            correctAnswer: "Áp suất riêng của khí neon là 550 torr",
            explain: "Neon chiếm 50% số phân tử khí hiện có. Neon cũng sẽ đóng góp 50% tổng áp suất. (1100 torr)(0.50) = 550 torr."
          },
          {
            type: "multiple-choice",
            question: "Khí nào được dự kiến sẽ có mật độ thấp nhất ở STP?",
            options: ["SO2","CO2","Cl2", "Xe", "Ar"],
            correctAnswer: "Ar",
            explain: "Mật độ của một khí là khối lượng mol của khí chia cho 22.4L. Đối với argon, điều này sẽ là 39.95g/22.4L = 1.78 g/L. Hãy nhớ rằng không cần máy tính. Vì argon là khí nhẹ nhất, nó sẽ có mật độ thấp nhất."
          },
          {
            type: "multiple-choice",
            question: "Một khí lý tưởng ở STP chiếm 22.4 lít. Nếu áp suất lên khí được tăng lên 1000 torr và nhiệt độ của khí giảm xuống 250 K, điều gì có thể được nói về khí?",
            options: ["Số mol của khí đã thay đổi", "Thể tích của khí đã tăng", "Thể tích của khí đã giảm", "Áp suất và nhiệt độ có một mối quan hệ nghịch thìch", "Không có điều gì ở trên"],
            correctAnswer: "Thể tích của khí đã giảm",
            explain: "Trong vấn đề này, áp suất thay đổi từ 760 torr lên 1000 torr. Nhiệt độ thay đổi từ 273 K xuống 250 K. Cả hai thay đổi trong điều kiện đều chỉ ra một giảm thể tích. Khi Luật Khí Kết hợp được sử dụng, thể tích sẽ giảm từ 22.4 L xuống 15.6 L."
          },
          {
            type: "multiple-choice",
            question: "Điều nào không nhất quán với Lý thuyết phân tử động?",
            options: ["Các phân tử khí có lực hấp dẫn với nhau", "Các phân tử khí di chuyển theo hướng ngẫu nhiên, thẳng", "Các phân tử khí có một khối lượng có thể bỏ qua so với khối lượng chúng chiếm", "Các va chạm giữa các phân tử khí dẫn đến sự truyền năng lượng được bảo toàn", "Tất cả các câu trên đều đúng"],
            correctAnswer: "Các phân tử khí có lực hấp dẫn với nhau",
            explain: "Lí tưởng, các phân tử khí cần phải xa cách nhau và không có sức hấp dẫn cho nhau. Hơn nữa, các khí nhỏ như hydro và helium là lý tưởng."
          },
          {
            type: "multiple-choice",
            question: "Tham khảo các lựa chọn sau: I. Định luật Boyle II. Định luật Charles III. Định luật Khí kết hợp Cái nào trong số trên có thể được sử dụng để tính toán sự thay đổi về thể tích khi có sự thay đổi về áp suất ở nhiệt độ không đổi?",
            options: ["Chỉ I", "Chỉ II", "II và III", "I và III", "I và II"],
            correctAnswer: "I và III",
            explain: "Cả Luật Boyle và Luật Khí Kết hợp đều có biến số cho áp suất và thể tích. Luật Charles chỉ xem xét sự thay đổi về thể tích khi có sự thay đổi về nhiệt độ."
          },
          {
            type: "multiple-choice",
            question: "Tham chiếu đến đồ thị nhiệt độ trong Hình 2.7, điều nào sau đây không liên quan đến đồ thị nhiệt độ của nước?",
            options: ["Cung cấp năng lượng nhiệt", "Nóng chảy", "Sôi", "Tăng năng lượng động", "Ngưng tụ"],
            correctAnswer: "Ngưng tụ",
            explain: "Đồ thị nhiệt độ cho một chất sẽ không cho thấy khi một chất trực tiếp. Tuy nhiên, quá trình trực tiếp này có thể được chỉ ra trong đồ thị bao gồm điểm tam giác."
          },
          {
            type: "true-false",
            question: "Năng lượng có khối lượng và chiếm không gian.",
            correctAnswer: false,
            explain: "Vật chất, không phải năng lượng, là thuật ngữ được sử dụng cho cái gì đó có khối lượng và chiếm không gian.",
          },
          {
            type: "fill-in-the-blank",
            question: "Năng lượng cần thiết để bắt đầu một phản ứng được gọi là ________.",
            correctAnswer: "năng lượng kích hoạt",
            explain: "Năng lượng kích hoạt là năng lượng cần thiết để đạt tới phức hợp được kích hoạt, điểm mà chất phản ứng trở thành sản phẩm.",
          },
        ];
        const shuffledQuestions = shuffleArray([...questions]);
        setQuestions(shuffledQuestions);
        await setDoc(docRef, {
          questions: shuffledQuestions,
          currentQuestion: 0,
          answerState: Array(shuffledQuestions.length).fill(null),
          score: 0,
          progress: 0,
          quizCompleted: false,
        });
      }
    };
    fetchData();
  }, [chapterId, userId]);

  useEffect(() => {
    if (questions.length > 0) {
      const docRef = doc(db, 'users', userId, 'chapters', chapterId);
      setDoc(docRef, {
        questions,
        currentQuestion,
        answerState,
        score,
        progress,
        quizCompleted,
      });
    }
  }, [currentQuestion, answerState, score, progress, quizCompleted, userId, chapterId, questions]);

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const handleOptionClick = (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);
      setShowExplanation(false);

      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleTrueFalseClick = (selectedAnswer) => {
    if (selectedOption === null) {
      setSelectedOption(selectedAnswer);
      setShowExplanation(false);

      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleFillInTheBlankSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === null) {
      const userAnswer = event.target.elements[0].value.trim().toLowerCase();
      setSelectedOption(userAnswer);
      setShowExplanation(false);
  
      const isCorrect = userAnswer === questions[currentQuestion].correctAnswer.toLowerCase();
      const newAnswerState = [...answerState];
      newAnswerState[currentQuestion] = isCorrect;
      setAnswerState(newAnswerState);
  
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      event.target.elements[0].classList.toggle('correct-answer', isCorrect);
      event.target.elements[0].classList.toggle('incorrect-answer', !isCorrect);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const submitButton = document.getElementById('submit-button');
      submitButton.click();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextQuestion = () => {
    if (selectedOption === null) {
      setNotificationMessage("Bạn cần chọn đáp án trước khi tiếp tục.");
      setShowNotification(true);
      return;
    }

    setSelectedOption(null);
    setShowExplanation(false);

    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
      const newProgress = (nextQ / questions.length) * 100;
      setProgress(newProgress);
    } else {
      setQuizCompleted(true);
      onCompletion();
    }
  };

  const resetQuiz = async () => {
    const shuffledQuestions = shuffleArray([...questions]);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswerState(Array(questions.length).fill(null));
    setScore(0);
    setProgress(0);
    setQuizCompleted(false);
    await setDoc(doc(db, 'users', userId, 'chapters', chapterId), {
      questions: shuffledQuestions,
      currentQuestion: 0,
      answerState: Array(questions.length).fill(null),
      score: 0,
      progress: 0,
      quizCompleted: false,
    });
    onReset();
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  if (quizCompleted) {
    return (
      <div className="questions-page">
        <h1>Chapter 2</h1>
        <h2>Hoàn thành</h2>
        <div className="score-container">
          <p className="score-label">Điểm số của bạn:</p>
          <p className="score">{score}</p>
          <button onClick={resetQuiz} className="next-button">Làm lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-page">
      <h1>Chapter 2</h1>
      <div className="questions-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {currentQuestion < questions.length && (
          <div className="question">
            <p>{currentQuestion + 1}. {questions[currentQuestion].question}</p>
            {questions[currentQuestion].type === "multiple-choice" && (
              <ul>
                {questions[currentQuestion].options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={
                      selectedOption !== null &&
                      answerState[currentQuestion] !== null &&
                      option === questions[currentQuestion].correctAnswer
                        ? "correct"
                        : selectedOption !== null &&
                          answerState[currentQuestion] !== null &&
                          selectedOption === option &&
                          option !== questions[currentQuestion].correctAnswer
                        ? "incorrect"
                        : ""
                    }
                  >
                    ({String.fromCharCode(65 + index)}) {formatChemicalFormula(option)}
                    {selectedOption === option && answerState[currentQuestion] !== null && option === questions[currentQuestion].correctAnswer ? <span className="correct-mark">&#10003;</span> : ''}
                    {selectedOption === option && answerState[currentQuestion] !== null && option !== questions[currentQuestion].correctAnswer ? <span className="incorrect-mark">&#10007;</span> : ''}
                  </li>
                ))}
              </ul>
            )}
            {questions[currentQuestion].type === "true-false" && (
              <ul>
                <li
                  onClick={() => handleTrueFalseClick(true)}
                  className={
                    selectedOption !== null &&
                    answerState[currentQuestion] !== null &&
                    true === questions[currentQuestion].correctAnswer
                      ? "correct"
                      : selectedOption !== null &&
                        answerState[currentQuestion] !== null &&
                        selectedOption === true &&
                        true !== questions[currentQuestion].correctAnswer
                      ? "incorrect"
                      : ""
                  }
                >
                  (A) True
                  {selectedOption === true && answerState[currentQuestion] !== null && true === questions[currentQuestion].correctAnswer ? <span className="correct-mark">&#10003;</span> : ''}
                  {selectedOption === true && answerState[currentQuestion] !== null && true !== questions[currentQuestion].correctAnswer ? <span className="incorrect-mark">&#10007;</span> : ''}
                </li>
                <li
                  onClick={() => handleTrueFalseClick(false)}
                  className={
                    selectedOption !== null &&
                    answerState[currentQuestion] !== null &&
                    false === questions[currentQuestion].correctAnswer
                      ? "correct"
                      : selectedOption !== null &&
                        answerState[currentQuestion] !== null &&
                        selectedOption === false &&
                        false !== questions[currentQuestion].correctAnswer
                      ? "incorrect"
                      : ""
                  }
                >
                  (B) False
                  {selectedOption === false && answerState[currentQuestion] !== null && false === questions[currentQuestion].correctAnswer ? <span className="correct-mark">&#10003;</span> : ''}
                  {selectedOption === false && answerState[currentQuestion] !== null && false !== questions[currentQuestion].correctAnswer ? <span className="incorrect-mark">&#10007;</span> : ''}
                </li>
              </ul>
            )}
            {questions[currentQuestion].type === "fill-in-the-blank" && (
              <form onSubmit={handleFillInTheBlankSubmit} className="fill-in-the-blank-form">
              <input type="text" 
              className="fill-in-the-blank-input" 

              />
              <button type="submit" id="submit-button" className="submit-button">submit</button>
              {/* Hiển thị dấu tích hoặc dấu x tùy thuộc vào đáp án */}
            </form>
            )}
            {selectedOption !== null && (
              <>
                <button onClick={toggleExplanation} className="explanation-button">Giải thích</button>
                {showExplanation && (
                  <div className="explanation">
                    <p>Đáp án đúng: {questions[currentQuestion].correctAnswer.toString()}</p>
                    <p>Giải thích: {questions[currentQuestion].explain}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {currentQuestion < questions.length && (
          <button onClick={nextQuestion} className="next-button">Câu hỏi tiếp theo</button>
        )}
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Chapter2cauhoi;
