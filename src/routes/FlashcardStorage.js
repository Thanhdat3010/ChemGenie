import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import "./FlashcardStorage.css";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function FlashcardStorage() {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchFlashcards(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchFlashcards = async (userId) => {
    try {
      const q = query(collection(db, "flashcard_decks"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFlashcards(fetchedFlashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleViewDetails = (flashcardId) => {
    navigate(`/flashcard/${flashcardId}`);
  };

  const handleDelete = async (flashcardId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bộ flashcard này không?')) {
      try {
        await deleteDoc(doc(db, "flashcard_decks", flashcardId));
        // Cập nhật lại danh sách sau khi xóa
        setFlashcards(flashcards.filter(card => card.id !== flashcardId));
      } catch (error) {
        console.error("Error deleting flashcard:", error);
      }
    }
  };

  return (
    <div className="flashcard-storage">
      <Navbar />
      <section className="flashcard-storage__content">
        <div className="flashcard-storage__container">
          <h2 className="flashcard-storage__title">Kho lưu trữ Flashcard của bạn</h2>
          <div className="flashcard-storage__grid">
            {flashcards.map((flashcard) => (
              <div key={flashcard.id} className="flashcard-storage__item">
                <h3 className="flashcard-storage__item-title">{flashcard.name}</h3>
                <p className="flashcard-storage__item-summary">
                  {flashcard.summary.substring(0, 100)}...
                </p>
                <div className="flashcard-storage__item-actions">
                  <button 
                    className="flashcard-storage__item-button flashcard-storage__item-button--view"
                    onClick={() => handleViewDetails(flashcard.id)}
                  >
                    Xem chi tiết
                  </button>
                  <button 
                    className="flashcard-storage__item-button flashcard-storage__item-button--delete"
                    onClick={() => handleDelete(flashcard.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FlashcardStorage;
