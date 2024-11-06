import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import Navbar from '../components/Navbar';
import "./FlashcardDetail.css";
import { GoogleGenerativeAI } from '@google/generative-ai';

function FlashcardDetail() {
  const [flashcard, setFlashcard] = useState(null);
  const [studyMode, setStudyMode] = useState('preview'); // preview, flashcard, write, quiz
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomWord, setRandomWord] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [quizOptions, setQuizOptions] = useState({});
  const [userWrittenAnswer, setUserWrittenAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [hintText, setHintText] = useState('');
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");
  const { id } = useParams();
  const navigate = useNavigate();
  const [writeScore, setWriteScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [writingProgress, setWritingProgress] = useState({});
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); // 0: chưa xem, 1: gợi ý nhẹ, 2: gợi ý chi tiết

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const docRef = doc(db, "flashcard_decks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setFlashcard(data);
          // Chọn một từ ngẫu nhiên từ bộ flashcard
          const randomIndex = Math.floor(Math.random() * data.cards.length);
          setRandomWord(data.cards[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching flashcard:", error);
      }
    };

    fetchFlashcard();
  }, [id]);

  useEffect(() => {
    if (flashcard && flashcard.cards) {
      const options = {};
      flashcard.cards.forEach((card, index) => {
        options[index] = generateQuizOptions(card.back);
      });
      setQuizOptions(options);
    }
  }, [flashcard]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => 
      prev === flashcard.cards.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => 
      prev === 0 ? flashcard.cards.length - 1 : prev - 1
    );
  };

  const handleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleOptionClick = (questionIndex, selectedAnswer) => {
    if (!quizCompleted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedAnswer
      }));
    }
  };

  const areAllQuestionsAnswered = () => {
    return flashcard.cards.every((_, index) => userAnswers[index] !== undefined);
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    flashcard.cards.forEach((card, index) => {
      if (userAnswers[index] === card.back) {
        correctAnswers++;
      }
    });

    const totalQuestions = flashcard.cards.length;
    setScore(correctAnswers);
    setQuizCompleted(true);
    
    setNotificationMessage(`Điểm của bạn: ${correctAnswers}/${totalQuestions}`);
    setShowNotification(true);
  };

  const calculateScore = (feedback) => {
    if (feedback.toLowerCase().includes('đúng')) return 10;
    if (feedback.toLowerCase().includes('gần đúng')) return 5;
    return 0;
  };

  const checkAnswerWithAI = async () => {
    if (!userWrittenAnswer.trim()) {
      alert('Vui lòng nhập câu trả lời của bạn');
      return;
    }

    setIsCheckingAnswer(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
      const prompt = `Với câu hỏi: "${flashcard.cards[currentCardIndex].front}"
      
      Đáp án mẫu: "${flashcard.cards[currentCardIndex].back}"
      
      Câu trả lời của học sinh: "${userWrittenAnswer}"
      
      Hãy đánh giá câu trả lời theo format sau:
      [Đánh giá]: (đúng/gần đúng/sai)
      [Điểm số]: (10/5/0)
      [Nhận xét]: (nhận xét ngắn gọn về câu trả lời)
      [Gợi ý cải thiện]: (đề xuất cụ thể để cải thiện)`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const feedback = response.text();
      setAiFeedback(feedback);

      // Tính điểm và cập nhật progress
      const score = calculateScore(feedback);
      const newProgress = {
        ...writingProgress,
        [currentCardIndex]: {
          attempted: true,
          score: score,
          answer: userWrittenAnswer,
          feedback: feedback
        }
      };
      setWritingProgress(newProgress);
      setWriteScore(prevScore => prevScore + score);
      setTotalAttempts(prevAttempts => prevAttempts + 1);

      // Kiểm tra nếu đã hoàn thành tất cả các thẻ
      if (Object.keys(newProgress).length === flashcard.cards.length) {
        setShowScoreModal(true);
      }
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      setAiFeedback('Đã có lỗi xảy ra khi kiểm tra câu trả lời. Vui lòng thử lại.');
    } finally {
      setIsCheckingAnswer(false);
    }
  };

  const getHint = async (level) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
      const prompt = `Với câu hỏi: "${flashcard.cards[currentCardIndex].front}"
      Đáp án đầy đủ: "${flashcard.cards[currentCardIndex].back}"
      
      ${level === 1 ? 
        'Hãy đưa ra một gợi ý nhẹ, không tiết lộ đáp án nhưng giúp người học định hướng câu trả lời.' :
        'Hãy đưa ra gợi ý chi tiết hơn, bao gồm các từ khóa chính hoặc cấu trúc câu trả lời, nhưng vẫn không tiết lộ hoàn toàn đáp án.'
      }
      
      Lưu ý: Gợi ý phải ngắn gọn, súc tích, không quá 2 câu.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setHintText(response.text());
    } catch (error) {
      console.error('Error getting hint:', error);
      setHintText('Không thể lấy gợi ý lúc này. Vui lòng thử lại.');
    }
  };

  const renderStudyModeContent = () => {
    if (!flashcard || !flashcard.cards || flashcard.cards.length === 0) {
      return <div className="flashcard-detail__no-data">Không có dữ liệu flashcard</div>;
    }

    switch (studyMode) {
      case 'preview':
        return (
          <div className="flashcard-detail__preview-mode">
            <div className="flashcard-detail__random-word">
              <h3>Từ gợi ý hôm nay:</h3>
              {randomWord && (
                <div className="flashcard" onClick={() => setIsFlipped(!isFlipped)}>
                  <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    <div className="flashcard-front">
                      <h3>Thuật ngữ:</h3>
                      <p>{randomWord.front}</p>
                    </div>
                    <div className="flashcard-back">
                      <h3>Định nghĩa:</h3>
                      <p>{randomWord.back}</p>
                    </div>
                  </div>
                </div>
              )}
              <p className="flashcard-detail__preview-hint">
                Đây là từ được gợi ý cho bạn hôm nay. Hãy nhấp vào thẻ để xem định nghĩa!
              </p>
            </div>
          </div>
        );

      case 'flashcard':
        return (
          <div className="flashcards-container">
            <div className="flashcard" onClick={() => handleFlip(currentCardIndex)}>
              <div className={`flashcard-inner ${flippedCards[currentCardIndex] ? 'is-flipped' : ''}`}>
                <div className="flashcard-front">
                  <h3>Thuật ngữ:</h3>
                  <p>{flashcard.cards[currentCardIndex].front}</p>
                </div>
                <div className="flashcard-back">
                  <h3>Định nghĩa:</h3>
                  <p>{flashcard.cards[currentCardIndex].back}</p>
                </div>
              </div>
            </div>
            <div className="flashcard-detail__navigation">
              <button onClick={handlePrevCard}>Trước</button>
              <span>{currentCardIndex + 1}/{flashcard.cards.length}</span>
              <button onClick={handleNextCard}>Sau</button>
            </div>
          </div>
        );

      case 'write':
        return (
          <div className="flashcard-detail__write-mode">
            <div className="flashcard-detail__progress-bar">
              <div 
                className="flashcard-detail__progress-fill"
                style={{ 
                  width: `${(Object.keys(writingProgress).length / flashcard.cards.length) * 100}%` 
                }}
              />
              <span className="flashcard-detail__progress-text">
                {Object.keys(writingProgress).length}/{flashcard.cards.length} câu
              </span>
            </div>

            <div className="flashcard-detail__score-display">
              <span>Điểm: {writeScore}</span>
              <span>Đã làm: {totalAttempts} câu</span>
            </div>

            <div className="flashcard-detail__term">
              <h3>Câu hỏi {currentCardIndex + 1}:</h3>
              <p>{flashcard.cards[currentCardIndex].front}</p>
            </div>

            <textarea 
              placeholder="Nhập định nghĩa của bạn..."
              className="flashcard-detail__write-answer"
              value={userWrittenAnswer}
              onChange={(e) => setUserWrittenAnswer(e.target.value)}
              disabled={writingProgress[currentCardIndex]?.attempted}
            />

            <div className="flashcard-detail__write-actions">
              {!writingProgress[currentCardIndex]?.attempted ? (
                <>
                  <button 
                    className="flashcard-detail__check-answer"
                    onClick={checkAnswerWithAI}
                    disabled={isCheckingAnswer}
                  >
                    {isCheckingAnswer ? 'Đang kiểm tra...' : 'Kiểm tra câu trả lời'}
                  </button>
                  <button 
                    className="flashcard-detail__hint-button"
                    onClick={async () => {
                      if (hintLevel < 2) {
                        const newLevel = hintLevel + 1;
                        await getHint(newLevel);
                        setHintLevel(newLevel);
                        setShowHint(true);
                      }
                    }}
                  >
                    {hintLevel === 0 ? 'Xem gợi ý' : 
                     hintLevel === 1 ? 'Gợi ý thêm' : 'Đã hết gợi ý'}
                  </button>
                </>
              ) : (
                <div className="flashcard-detail__previous-attempt">
                  <p>Đã trả lời - Điểm: {writingProgress[currentCardIndex].score}/10</p>
                </div>
              )}
            </div>

            {showHint && (
              <div className="flashcard-detail__hint-box">
                <h4>Gợi ý {hintLevel}/2:</h4>
                <p>{hintText}</p>
              </div>
            )}

            {writingProgress[currentCardIndex]?.attempted && (
              <div className="flashcard-detail__ai-feedback">
                <h4>Nhận xét của AI:</h4>
                <p>{aiFeedback}</p>
              </div>
            )}

            <div className="flashcard-detail__navigation">
              <button 
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
              >
                Trước
              </button>
              <span>{currentCardIndex + 1}/{flashcard.cards.length}</span>
              <button 
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcard.cards.length - 1}
              >
                Sau
              </button>
            </div>

            {showScoreModal && (
              <div className="flashcard-detail__score-modal">
                <div className="score-modal-content">
                  <h3>Kết quả luyện tập</h3>
                  <p>Tổng điểm: {writeScore}/{flashcard.cards.length * 10}</p>
                  <p>Số câu đã làm: {totalAttempts}/{flashcard.cards.length}</p>
                  <button onClick={() => setShowScoreModal(false)}>Đóng</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="flashcard-detail__quiz-mode">
            <div className="flashcard-detail__questions-section">
              {flashcard.cards.map((card, index) => (
                <div key={index} className="flashcard-detail__question-box">
                  <h3>Câu {index + 1}</h3>
                  <p className="flashcard-detail__question-text">{card.front}</p>
                  <div className="flashcard-detail__options-grid">
                    {quizOptions[index]?.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`flashcard-detail__option-button 
                          ${userAnswers[index] === option ? 'selected' : ''} 
                          ${quizCompleted ? 
                            option === card.back ? 'correct' : // Đáp án đúng
                            userAnswers[index] === option ? 'incorrect' : '' // Đáp án sai người dùng đã chọn
                            : ''
                          }`}
                        onClick={() => handleOptionClick(index, option)}
                        disabled={quizCompleted}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flashcard-detail__quiz-submit">
              {!quizCompleted ? (
                <button
                  className="flashcard-detail__submit-button"
                  onClick={handleSubmitQuiz}
                  disabled={!areAllQuestionsAnswered()}
                >
                  Nộp bài
                </button>
              ) : (
                <div className="flashcard-detail__quiz-result">
                  <h3>Kết quả: {score}/{flashcard.cards.length} câu đúng</h3>
                  <button
                    className="flashcard-detail__retry-button"
                    onClick={() => {
                      setQuizCompleted(false);
                      setUserAnswers({});
                      setScore(0);
                    }}
                  >
                    Làm lại
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div className="flashcard-detail__no-mode">Chọn chế độ học</div>;
    }
  };

  // Hàm tạo các lựa chọn cho chế độ quiz
  const generateQuizOptions = (correctAnswer) => {
    const options = [correctAnswer];
    const otherCards = flashcard.cards.filter(card => card.back !== correctAnswer);
    
    // Chọn ngẫu nhiên 3 đáp án khác
    for (let i = 0; i < 3 && otherCards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * otherCards.length);
      options.push(otherCards[randomIndex].back);
      otherCards.splice(randomIndex, 1);
    }

    // Trộn ngẫu nhiên các đáp án và trả về
    return options.sort(() => Math.random() - 0.5);
  };

  if (!flashcard) {
    return <div className="flashcard-detail__loading">Đang tải...</div>;
  }

  return (
    <div className="flashcard-detail">
      <Navbar />
      <div className="flashcard-detail__container">
        <h2 className="flashcard-detail__title">{flashcard.name}</h2>
        <div className="flashcard-detail__study-modes">
          <button 
            onClick={() => setStudyMode('preview')}
            className={`flashcard-detail__mode-btn ${studyMode === 'preview' ? 'active' : ''}`}
          >
            Xem tổng quan
          </button>
          <button 
            onClick={() => setStudyMode('flashcard')}
            className={`flashcard-detail__mode-btn ${studyMode === 'flashcard' ? 'active' : ''}`}
          >
            Thẻ ghi nhớ
          </button>
          <button 
            onClick={() => setStudyMode('write')}
            className={`flashcard-detail__mode-btn ${studyMode === 'write' ? 'active' : ''}`}
          >
            Luyện viết
          </button>
          <button 
            onClick={() => setStudyMode('quiz')}
            className={`flashcard-detail__mode-btn ${studyMode === 'quiz' ? 'active' : ''}`}
          >
            Trắc nghiệm
          </button>
        </div>
        <div className="flashcard-detail__content">
          {renderStudyModeContent()}
        </div>
      </div>
    </div>
  );
}

export default FlashcardDetail;