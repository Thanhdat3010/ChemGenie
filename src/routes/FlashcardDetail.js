import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import icon1 from '../assets/clipboard-list-check.png';
import icon2 from '../assets/magic-wand.png';
import "./FlashcardDetail.css";

function FlashcardDetail() {
  const [flashcard, setFlashcard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const docRef = doc(db, "flashcards", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFlashcard({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching flashcard:", error);
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "flashcards", id);
      await updateDoc(docRef, flashcard);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa flashcard này không?")) {
      try {
        await deleteDoc(doc(db, "flashcards", id));
        navigate('/flashcard-storage'); // Redirect to flashcards list
      } catch (error) {
        console.error("Error deleting flashcard:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlashcard(prev => ({ ...prev, [name]: value }));
  };

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <container fluid>
      <Navbar />
      <section className="full-screen">
        <div className="flashcard-detail-page">
          <div className="solver-tag"><p className="solver-name">Chi tiết Flashcard</p></div>
          <div className="flashcard-detail-content">
            {isEditing ? (
              <>
                <p>
                  <img src={icon1} alt="Title icon" style={{ marginRight: '5px', width: '24px', height: '24px', marginBottom: '10px' }} />
                  <input
                    name="title"
                    value={flashcard.title}
                    onChange={handleInputChange}
                    className="flashcard-edit-input"
                    style={{ color: '#7b31c9', fontWeight: 'bold' }}
                  />
                </p>
                <p className="AI-content">
                  <strong style={{ color: '#7b31c9' }}>Tóm tắt:</strong>{' '}
                  <textarea
                    name="summary"
                    value={flashcard.summary}
                    onChange={handleInputChange}
                    className="flashcard-edit-textarea"
                  />
                </p>
                <p>
                  <img src={icon2} alt="Key points icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
                  <strong style={{ color: '#7b31c9' }}>Điểm chính:</strong>
                </p>
                <ul>
                  {flashcard.keyPoints.map((point, index) => (
                    <li key={index} className="AI-content">
                      <input
                        value={point}
                        onChange={(e) => {
                          const newKeyPoints = [...flashcard.keyPoints];
                          newKeyPoints[index] = e.target.value;
                          setFlashcard(prev => ({ ...prev, keyPoints: newKeyPoints }));
                        }}
                        className="flashcard-edit-input"
                      />
                    </li>
                  ))}
                </ul>
                <div className="flashcard-button-group">
                  <button onClick={handleSave} className="flashcard-save-button">Lưu</button>
                  <button onClick={() => setIsEditing(false)} className="flashcard-cancel-button">Hủy</button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <img src={icon1} alt="Title icon" style={{ marginRight: '5px', width: '24px', height: '24px'}} />
                  <strong style={{ color: '#7b31c9' }}>{flashcard.title}</strong>
                </p>
                <p className="AI-content"><strong>Tóm tắt:</strong> {flashcard.summary}</p>
                <p>
                  <img src={icon2} alt="Key points icon" style={{ marginRight: '5px', width: '24px', height: '24px' }} />
                  <strong style={{ color: '#7b31c9' }}>Điểm chính:</strong>
                </p>
                <ul>
                  {flashcard.keyPoints.map((point, index) => (
                    <li key={index} className="AI-content">{point}</li>
                  ))}
                </ul>
                <div className="flashcard-button-group">
                  <button onClick={handleEdit} className="flashcard-edit-button">Chỉnh sửa</button>
                  <button onClick={handleDelete} className="flashcard-delete-button">Xóa</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </container>
  );
}

export default FlashcardDetail;