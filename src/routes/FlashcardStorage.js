import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
      const q = query(collection(db, "flashcards"), where("userId", "==", userId));
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

  return (
    <div className="flashcard-storage">
      <Navbar />
      <section className="flashcard-storage__content">
        <div className="flashcard-storage__container">
          <h2 className="flashcard-storage__title">Kho lưu trữ Flashcard của bạn</h2>
          <div className="flashcard-storage__grid">
            {flashcards.map((flashcard) => (
              <div key={flashcard.id} className="flashcard-storage__item">
                <h3 className="flashcard-storage__item-title">{flashcard.title}</h3>
                <p className="flashcard-storage__item-summary">{flashcard.summary.substring(0, 100)}...</p>
                <button className="flashcard-storage__item-button" onClick={() => handleViewDetails(flashcard.id)}>Xem chi tiết</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FlashcardStorage;
