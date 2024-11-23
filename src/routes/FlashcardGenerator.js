import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../components/firebase';
import { collection, addDoc } from 'firebase/firestore';
import mammoth from 'mammoth';
import "./FlashcardGenerator.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import magic from "../assets/magic-dust.png";
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';
import { API_KEY } from '../config';

const genAI = new GoogleGenerativeAI(API_KEY);

function FlashcardGenerator() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [editingCard, setEditingCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [deckName, setDeckName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const extractTextFromImage = async (imageFile) => {
    const ocrResult = await Tesseract.recognize(imageFile);
    return ocrResult.data.text;
  };

  const extractTextFromWord = async (wordFile) => {
    const arrayBuffer = await wordFile.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const generateFlashcards = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      let extractedText;
      if (file.type.includes('image')) {
        extractedText = await extractTextFromImage(file);
      } else if (file.name.endsWith('.docx')) {
        extractedText = await extractTextFromWord(file);
      } else {
        throw new Error('Unsupported file type');
      }

      const flashcardStructure = {
        flashcards: [
          {
            front: "Thuật ngữ 1",
            back: "Định nghĩa chi tiết 1"
          }
          // Có thể có nhiều flashcard
        ],
        summary: "Tóm tắt chi tiết về kiến thức mà người dùng cần học (khoảng 50 từ)"
      };

      const prompt = `Bạn là một chuyên gia giáo dục có kinh nghiệm trong việc tạo flashcard. 
      Hãy tạo một bộ flashcard từ văn bản sau đây. 
      Mỗi flashcard sẽ có mặt trước là thuật ngữ quan trọng và mặt sau là định nghĩa/giải thích chi tiết.
      Nếu là môn hóa thì phải ghi đúng danh pháp quốc tế cho các chất(tiếng anh).
      Lưu ý: Ngôn ngữ phải sử dụng tiếng việt.
      Kết quả cần được trả về dưới dạng JSON với cấu trúc sau:
      ${JSON.stringify(flashcardStructure, null, 2)}
      Văn bản: ${extractedText}`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      // Clean and parse the result
      const cleanText = generatedText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/\n/g, '')
        .replace(/\*/g, '')
        .replace(/-/g, ' ')
        .trim();

      console.log("Clean text:", cleanText);

      let flashcard;
      try {
        flashcard = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Đã xảy ra lỗi khi phân tích cú pháp JSON.');
      }

      // Ensure all properties exist
      flashcard = {
        flashcards: Array.isArray(flashcard.flashcards) ? flashcard.flashcards : [],
        summary: flashcard.summary || 'Không có tóm tắt'
      };

      setFlashcards([flashcard]);
    } catch (error) {
      console.error("Lỗi khi tạo flashcard:", error);
      alert("Có lỗi xảy ra khi tạo flashcard. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveFlashcardDeck = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để lưu flashcard.");
      return;
    }

    if (!deckName.trim()) {
      alert("Vui lòng nhập tên cho bộ flashcard.");
      return;
    }

    try {
      await addDoc(collection(db, "flashcard_decks"), {
        name: deckName,
        summary: flashcards[0].summary,
        cards: flashcards[0].flashcards,
        userId: user.uid,
        createdAt: new Date(),
        lastModified: new Date()
      });
      alert("Bộ flashcard đã được lưu thành công!");
      setDeckName(''); // Reset tên sau khi lưu
    } catch (error) {
      console.error("Error saving flashcard deck:", error);
      alert("Có lỗi xảy ra khi lưu bộ flashcard. Vui lòng thử lại.");
    }
  };

  const handleEditCard = (index, side, value) => {
    const updatedFlashcards = [...flashcards];
    if (side === 'front') {
      updatedFlashcards[0].flashcards[index].front = value;
    } else {
      updatedFlashcards[0].flashcards[index].back = value;
    }
    setFlashcards(updatedFlashcards);
  };

  const handleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="flashcard-generator-page">
          <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
          <h2 className="solver-form-title">AI tạo Flashcard</h2>
          <p className="solver-intro">AI sẽ tự động tạo flashcard từ hình ảnh hoặc file Word bạn tải lên, giúp bạn học tập hiệu quả hơn.</p>
          <div className="flashcard-generator-page__file-input"
               onDragOver={handleDragOver}
               onDrop={handleDrop}>
            <label htmlFor="file-upload">
              {!file && (
                <>
                  <span className="drag-text">Kéo và thả hình ảnh hoặc file Word vào đây hoặc</span><br />
                  Nhấp để chọn file
                </>
              )}
              <input 
                type="file" 
                accept="image/*,.docx" 
                onChange={handleFileUpload} 
                id="file-upload" 
              />
              {file && (
                <div className="flashcard-generator-page__file-preview">
                  {file.type.includes('image') ? (
                    <img src={URL.createObjectURL(file)} alt="Uploaded" className="uploaded-image" />
                  ) : (
                    <p>{file.name}</p>
                  )}
                </div>
              )}
            </label>
          </div>
          
          <button 
            className="flashcard-generator-page__generate-btn" 
            onClick={generateFlashcards} 
            disabled={!file || isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Tạo Flashcard'}
          </button>
          {flashcards.length > 0 && flashcards[0] && (
            <div className="flashcard-generator-page__flashcard-content">
              <p className="AI-content"><strong>Tóm tắt:</strong> {flashcards[0].summary}</p>
              
              <div className="deck-name-input">
                <input
                  type="text"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  placeholder="Nhập tên bộ flashcard"
                  className="deck-name-field"
                />
              </div>

              <div className="flashcards-container">
                {flashcards[0].flashcards.map((card, index) => (
                  <div className="flashcard" key={index} onClick={() => handleFlip(index)}>
                    <div className={`flashcard-inner ${flippedCards[index] ? 'is-flipped' : ''}`}>
                      <div className="flashcard-front">
                        <h3>Thuật ngữ:</h3>
                        {editingCard === `${index}-front` ? (
                          <textarea
                            value={card.front}
                            onChange={(e) => handleEditCard(index, 'front', e.target.value)}
                            onBlur={() => setEditingCard(null)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            className="flashcard-edit"
                          />
                        ) : (
                          <p onClick={(e) => {
                            e.stopPropagation();
                            setEditingCard(`${index}-front`);
                          }}>{card.front}</p>
                        )}
                        <small className="edit-hint">Nhấp để chỉnh sửa</small>
                      </div>
                      <div className="flashcard-back">
                        <h3>Định nghĩa:</h3>
                        {editingCard === `${index}-back` ? (
                          <textarea
                            value={card.back}
                            onChange={(e) => handleEditCard(index, 'back', e.target.value)}
                            onBlur={() => setEditingCard(null)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            className="flashcard-edit"
                          />
                        ) : (
                          <p onClick={(e) => {
                            e.stopPropagation();
                            setEditingCard(`${index}-back`);
                          }}>{card.back}</p>
                        )}
                        <small className="edit-hint">Nhấp để chỉnh sửa</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="flashcard-generator-page__save-btn" 
                onClick={saveFlashcardDeck}
                disabled={!deckName.trim()}
              >
                Lưu Bộ Flashcard
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </container>
  );
}

export default FlashcardGenerator;