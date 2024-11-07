import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import Navbar from '../components/Navbar';
import "./FlashcardDetail.css";
import { GoogleGenerativeAI } from '@google/generative-ai';
import flipSound from '../assets/flipSound.mp3'
import matchSound from '../assets/correctSound.mp3'
import wrongSound from '../assets/wrongSound.mp3'
import victorySound from '../assets/victorySound.mp3'




function FlashcardDetail() {
  const [flashcard, setFlashcard] = useState(null);
  const [studyMode, setStudyMode] = useState('preview'); // preview, flashcard, write, memory
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomWord, setRandomWord] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
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
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryStartTime, setMemoryStartTime] = useState(null);
  const [memoryCompleted, setMemoryCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState(null); // 'easy', 'medium', 'hard'
  const [gameStarted, setGameStarted] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const sounds = {
    flip: new Audio(flipSound),
    match: new Audio(matchSound),
    wrong: new Audio(wrongSound),
    victory: new Audio(victorySound)
  };

  const playSound = (soundName) => {
    if (isSoundEnabled) {
      sounds[soundName].currentTime = 0; // Reset sound to start
      sounds[soundName].play();
    }
  };

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

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
                <div className="flashcard-detail__card" onClick={() => setIsFlipped(!isFlipped)}>
                  <div className={`flashcard-detail__card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    <div className="flashcard-detail__card-front">
                      <h3>Thuật ngữ:</h3>
                      <p>{randomWord.front}</p>
                    </div>
                    <div className="flashcard-detail__card-back">
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
          <div className="flashcard-detail__flashcards-container">
            <div className="flashcard-detail__flashcard" onClick={() => handleFlip(currentCardIndex)}>
              <div className={`flashcard-detail__flashcard-inner ${flippedCards[currentCardIndex] ? 'is-flipped' : ''}`}>
                <div className="flashcard-detail__flashcard-front">
                  <h3>Thuật ngữ:</h3>
                  <p>{flashcard.cards[currentCardIndex].front}</p>
                </div>
                <div className="flashcard-detail__flashcard-back">
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
                  <p>Số câu đã lm: {totalAttempts}/{flashcard.cards.length}</p>
                  <button onClick={() => setShowScoreModal(false)}>Đóng</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'memory':
        return (
          <div className="flashcard-detail__memory">
            {!gameStarted ? (
              <div className="flashcard-detail__memory-menu">
                <h3>Chọn độ khó</h3>
                <div className="flashcard-detail__memory-difficulties">
                  <button 
                    className="flashcard-detail__memory-difficulty-btn"
                    onClick={() => initializeMemoryGame('easy')}
                  >
                    Dễ (4 cặp)
                  </button>
                  <button 
                    className="flashcard-detail__memory-difficulty-btn"
                    onClick={() => initializeMemoryGame('medium')}
                  >
                    Trung bình (6 cặp)
                  </button>
                  <button 
                    className="flashcard-detail__memory-difficulty-btn"
                    onClick={() => initializeMemoryGame('hard')}
                  >
                    Khó (8 cặp)
                  </button>
                </div>
                <p className="flashcard-detail__memory-instruction">
                  Chọn độ khó phù hợp với bạn. Càng nhiều cặp thẻ, trò chơi càng thử thách!
                </p>
                <div className="flashcard-detail__memory-sound">
                  <button 
                    className="flashcard-detail__memory-sound-btn"
                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  >
                    {isSoundEnabled ? '🔊 Tắt âm thanh' : '🔈 Bật âm thanh'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flashcard-detail__memory-stats">
                  <span>Độ khó: {
                    difficulty === 'easy' ? 'Dễ' : 
                    difficulty === 'medium' ? 'Trung bình' : 'Khó'
                  }</span>
                  <span>Số lượt: {memoryMoves}</span>
                  <span>Cặp đã ghép: {matchedPairs.length / 2}</span>
                  <button 
                    className="flashcard-detail__memory-restart"
                    onClick={() => setGameStarted(false)}
                  >
                    Chơi lại
                  </button>
                  <button 
                    className="flashcard-detail__memory-sound-btn"
                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  >
                    {isSoundEnabled ? '🔊' : '🔈'}
                  </button>
                </div>
                <div className="flashcard-detail__memory-grid">
                  {memoryCards.map((card, index) => (
                    <div
                      key={card.id}
                      className={`flashcard-detail__memory-card ${
                        flippedIndexes.includes(index) || matchedPairs.includes(index)
                          ? 'is-flipped'
                          : ''
                      } ${matchedPairs.includes(index) ? 'is-matched' : ''}`}
                      onClick={() => handleMemoryCardClick(index)}
                    >
                      <div className="flashcard-detail__memory-card-inner">
                        <div className="flashcard-detail__memory-card-front">?</div>
                        <div className="flashcard-detail__memory-card-back">{card.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {memoryCompleted && (
                  <div className="flashcard-detail__memory-complete">
                    <h3>Chúc mừng! Bạn đã hoàn thành!</h3>
                    <p>Độ khó: {
                      difficulty === 'easy' ? 'Dễ' : 
                      difficulty === 'medium' ? 'Trung bình' : 'Khó'
                    }</p>
                    <p>Số lượt: {memoryMoves}</p>
                    <p>Thời gian: {Math.floor((Date.now() - memoryStartTime) / 1000)} giây</p>
                    <button 
                      className="flashcard-detail__memory-restart"
                      onClick={() => setGameStarted(false)}
                    >
                      Chơi lại
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );

      default:
        return <div className="flashcard-detail__no-mode">Chọn chế độ học</div>;
    }
  };

  // Thêm hàm khởi tạo trò chơi memory
  const initializeMemoryGame = (selectedDifficulty) => {
    if (!flashcard?.cards) return;
    
    // Xác định số cặp thẻ dựa theo độ khó
    let numberOfPairs;
    switch (selectedDifficulty) {
      case 'easy':
        numberOfPairs = 4; // 8 thẻ
        break;
      case 'medium':
        numberOfPairs = 6; // 12 thẻ
        break;
      case 'hard':
        numberOfPairs = 8; // 16 thẻ
        break;
      default:
        return;
    }

    // Lấy ngẫu nhiên số cặp thẻ theo độ khó
    const randomCards = shuffleArray([...flashcard.cards])
      .slice(0, numberOfPairs)
      .map((card, index) => [
        { id: `term-${index}`, content: card.front, type: 'term' },
        { id: `def-${index}`, content: card.back, type: 'definition' }
      ]).flat();
    
    setMemoryCards(shuffleArray([...randomCards]));
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setMemoryMoves(0);
    setMemoryStartTime(Date.now());
    setMemoryCompleted(false);
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  // Thêm hàm xử lý lật thẻ trong memory game
  const handleMemoryCardClick = (index) => {
    if (flippedIndexes.length === 2 || flippedIndexes.includes(index) || matchedPairs.includes(index)) {
      return;
    }

    playSound('flip'); // Phát âm thanh lật thẻ

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = memoryCards[firstIndex];
      const secondCard = memoryCards[secondIndex];

      if (
        firstCard.type !== secondCard.type &&
        ((firstCard.type === 'term' && secondCard.type === 'definition') || 
         (firstCard.type === 'definition' && secondCard.type === 'term')) &&
        firstCard.id.split('-')[1] === secondCard.id.split('-')[1]
      ) {
        // Ghép đúng
        setTimeout(() => {
          playSound('match');
          setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
          setFlippedIndexes([]);
          
          // Kiểm tra chiến thắng
          if (matchedPairs.length + 2 === memoryCards.length) {
            setTimeout(() => {
              playSound('victory');
              setMemoryCompleted(true);
            }, 500);
          }
        }, 500);
      } else {
        // Ghép sai
        setTimeout(() => {
          playSound('wrong');
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const calculateScore = (feedback) => {
    // Tìm dòng chứa [Điểm số]:
    const scoreMatch = feedback.match(/\[Điểm số\]:\s*(\d+)/);
    if (scoreMatch && scoreMatch[1]) {
      return parseInt(scoreMatch[1]);
    }
    return 0;
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
            onClick={() => setStudyMode('memory')}
            className={`flashcard-detail__mode-btn ${studyMode === 'memory' ? 'active' : ''}`}
          >
            Trò chơi trí nhớ
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

