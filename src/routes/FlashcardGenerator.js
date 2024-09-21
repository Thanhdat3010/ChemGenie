import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../components/firebase';
import { collection, addDoc } from 'firebase/firestore';
import "./FlashcardGenerator.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import magic from "../assets/magic-dust.png";
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';

const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

function FlashcardGenerator() {
  const [image, setImage] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
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
      setImage(event.dataTransfer.files[0]);
    }
  };

  const generateFlashcards = async () => {
    if (!image) return;

    setIsLoading(true);

    try {
      // OCR
      const ocrResult = await Tesseract.recognize(image);
      const extractedText = ocrResult.data.text;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const flashcardStructure = {
        title: "Tiêu đề ngắn gọn",
        summary: "Tóm tắt ngắn gọn về nội dung chính (không quá 50 từ)",
        keyPoints: [
          "Điểm chính 1",
          "Điểm chính 2",
          "Điểm chính 3",
          "Điểm chính 4",
          "Tùy theo bài dài hay ngắn mà số lượng điểm chính có thể thay đổi"
        ]
      };
      const prompt = `Bạn là một chuyên gia giáo dục có kinh nghiệm trong việc tạo flashcard. 
      Hãy tạo một flashcard từ văn bản sau đây. Flashcard nên tóm tắt thông tin chính của văn bản. 
      Kết quả cần được trả về dưới dạng JSON với cấu trúc sau:
      ${JSON.stringify(flashcardStructure, null, 2)}
      Văn bản: ${extractedText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      // Clean and parse the result
      const cleanText = generatedText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/\n/g, '')
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
        title: flashcard.title || 'Không có tiêu đề',
        summary: flashcard.summary || 'Không có tóm tắt',
        keyPoints: Array.isArray(flashcard.keyPoints) ? flashcard.keyPoints : []
      };

      setFlashcards([flashcard]);
    } catch (error) {
      console.error("Lỗi khi tạo flashcard:", error);
      alert("Có lỗi xảy ra khi tạo flashcard. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveFlashcard = async (flashcard) => {
    if (!user) {
      alert("Vui lòng đăng nhập để lưu flashcard.");
      return;
    }

    try {
      await addDoc(collection(db, 'flashcards'), {
        ...flashcard,
        userId: user.uid,
        createdAt: new Date()
      });
      alert("Flashcard đã được lưu thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu flashcard:", error);
      alert("Có lỗi xảy ra khi lưu flashcard. Vui lòng thử lại.");
    }
  };

  const goToFlashcardStorage = () => {
    navigate('/FlashcardStorage');
  };

  return (
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="flashcard-generator-page">
        <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
        <h2 className="solver-form-title">AI tạo Flashcard</h2>
          <p className="solver-intro">AI sẽ tự động tạo flashcard từ hình ảnh bạn tải lên, giúp bạn học tập hiệu quả hơn.</p>
          <div className="flashcard-generator-page__file-input"
               onDragOver={handleDragOver}
               onDrop={handleDrop}>
            <label htmlFor="image-upload">
              {!image && (
                <>
                  <span className="drag-text">Kéo và thả hình ảnh vào đây hoặc</span><br />
                  Nhấp để chọn hình ảnh
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} id="image-upload" />
              {image && (
                <div className="flashcard-generator-page__image-preview">
                  <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />
                </div>
              )}
            </label>
          </div>
          
          <button 
            className="flashcard-generator-page__generate-btn" 
            onClick={generateFlashcards} 
            disabled={!image || isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Tạo Flashcard'}
          </button>
          

          {isLoading && <p className="message">Đang xử lý hình ảnh và tạo flashcard...</p>}
          {/* <button 
            className="flashcard-generator-page__storage-btn" 
            onClick={goToFlashcardStorage}
          >
            Đi đến Kho Flashcard
          </button> */}
          {flashcards.length > 0 && flashcards[0] && (
            <div className="flashcard-generator-page__flashcard-content">
              <p>
                <img src={icon1} alt="Title icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
                <strong style={{ color: '#7b31c9' }}>{flashcards[0].title}</strong>
              </p>
              <p className="AI-content"><strong>Tóm tắt:</strong> {flashcards[0].summary}</p>
              <p>
                <img src={icon2} alt="Key points icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
                <strong style={{ color: '#7b31c9' }}>Điểm chính:</strong>
              </p>
              <ul>
                {flashcards[0].keyPoints.map((point, index) => (
                  <li key={index} className="AI-content">{point}</li>
                ))}
              </ul>
              {/* <button 
                className="flashcard-generator-page__save-btn" 
                onClick={() => saveFlashcard(flashcards[0])}
              >
                Lưu Flashcard
              </button> */}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </container>
  );
}

export default FlashcardGenerator;