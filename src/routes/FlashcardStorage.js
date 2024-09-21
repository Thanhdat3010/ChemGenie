import React, { useState, useEffect } from 'react';
import { db, auth } from '../components/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './FlashcardStorage.css';

function FlashcardStorage() {
  const [flashcards, setFlashcards] = useState([]);
  const [cardSize, setCardSize] = useState({ width: 638, height: 1016 });
  const [selectedCards, setSelectedCards] = useState([]);
  const [customizedCards, setCustomizedCards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const user = auth.currentUser;
      if (user) {
        const flashcardsRef = collection(db, 'flashcards');
        const q = query(flashcardsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const flashcardData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlashcards(flashcardData);
      }
    };

    fetchFlashcards();
  }, []);

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setCardSize(prevSize => ({ ...prevSize, [name]: parseInt(value) }));
  };

  const handleCardSelection = (cardId) => {
    setSelectedCards(prev => 
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const handleCustomize = () => {
    const cardsToCustomize = flashcards.filter(card => selectedCards.includes(card.id));
    setCustomizedCards(cardsToCustomize);
  };

  const handleCustomCardChange = (index, field, value) => {
    setCustomizedCards(prev => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], [field]: value };
      return newCards;
    });
  };

  return (
    <container fluid>
      <Navbar />
      <section className="flashcard-storage">
        <h2>Kho Flashcard</h2>
        <div className="size-controls">
          <label>
            Chiều rộng:
            <input
              type="number"
              name="width"
              value={cardSize.width}
              onChange={handleSizeChange}
            />
          </label>
          <label>
            Chiều cao:
            <input
              type="number"
              name="height"
              value={cardSize.height}
              onChange={handleSizeChange}
            />
          </label>
        </div>
        <div className="flashcard-selection">
          <h3>Chọn Flashcard để tùy chỉnh:</h3>
          {flashcards.map((card) => (
            <label key={card.id}>
              <input
                type="checkbox"
                checked={selectedCards.includes(card.id)}
                onChange={() => handleCardSelection(card.id)}
              />
              {card.title}
            </label>
          ))}
          <button onClick={handleCustomize}>Tùy chỉnh Flashcards đã chọn</button>
        </div>

        {customizedCards.length > 0 && (
          <div className="customized-cards">
            <h3>Tùy chỉnh Flashcards:</h3>
            {customizedCards.map((card, index) => (
              <div key={card.id} className="customized-card">
                <input
                  value={card.title}
                  onChange={(e) => handleCustomCardChange(index, 'title', e.target.value)}
                />
                <textarea
                  value={card.summary}
                  onChange={(e) => handleCustomCardChange(index, 'summary', e.target.value)}
                />
                {card.keyPoints.map((point, pointIndex) => (
                  <input
                    key={pointIndex}
                    value={point}
                    onChange={(e) => {
                      const newKeyPoints = [...card.keyPoints];
                      newKeyPoints[pointIndex] = e.target.value;
                      handleCustomCardChange(index, 'keyPoints', newKeyPoints);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flashcard-grid">
          {flashcards.map((card) => (
            <div
              key={card.id}
              className="flashcard"
              style={{
                width: `${cardSize.width / 10}rem`,
                height: `${cardSize.height / 10}rem`,
              }}
            >
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <ul>
                {card.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </container>
  );
}

export default FlashcardStorage;