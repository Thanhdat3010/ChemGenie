import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../components/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Flashgen.css';

const Flashgen = () => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState('');
  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        loadFlashcards(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const handleGenerateFlashcard = async () => {
    if (!term.trim()) {
      alert('Vui lòng nhập thuật ngữ hoặc khái niệm.');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Hãy tóm tắt nội dung sau: ${term}.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      console.log(text);
      const cleanText = text.replace(/`/g, '');
      setDefinition(cleanText);
    } catch (error) {
      console.error('Error generating flashcard content from AI:', error);
      alert('Đã xảy ra lỗi khi tạo nội dung flashcard từ AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFlashcard = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('Vui lòng đăng nhập để tạo flashcard.');
      return;
    }

    let imageUrl = '';
    if (image) {
      if (image.type !== 'image/png') {
        alert('Chỉ cho phép ảnh định dạng PNG.');
        return;
      }

      const imageDimensions = await getImageDimensions(image);
      if (imageDimensions.width > 300) {
        alert('Ảnh phải có chiều rộng nhỏ hơn 300px.');
        return;
      }

      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      const flashcardData = {
        userId: user.uid,
        title,
        content: definition, // Sử dụng định nghĩa từ AI
        notes,
        imageUrl,
        videoUrl: video,
      };

      await addDoc(collection(db, "flashcards"), flashcardData);
      alert('Flashcard được tạo thành công!');
      loadFlashcards(user.uid);
      resetForm();
    } catch (error) {
      console.error('Lỗi khi thêm flashcard: ', error);
      alert('Đã có lỗi xảy ra khi tạo flashcard.');
    }
  };

  const loadFlashcards = async (userId) => {
    const q = query(collection(db, "flashcards"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const flashcards = [];
    querySnapshot.forEach((doc) => {
      flashcards.push({ id: doc.id, ...doc.data() });
    });
    setFlashcards(flashcards);
  };

  const deleteFlashcard = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Vui lòng đăng nhập để xóa flashcard.');
      return;
    }

    try {
      await deleteDoc(doc(db, "flashcards", id));
      alert('Flashcard đã được xóa thành công.');
      loadFlashcards(user.uid);
    } catch (error) {
      console.error('Lỗi khi xóa flashcard: ', error);
      alert('Đã có lỗi xảy ra khi xóa flashcard.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDefinition('');
    setNotes('');
    setImage(null);
    setVideo('');
    setTerm('');
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="flashgen">
      <h2>Flashgen - Tạo thẻ ghi nhớ</h2>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Nhập thuật ngữ hoặc khái niệm"
      />
      <button onClick={handleGenerateFlashcard} disabled={loading}>
        {loading ? 'Đang tạo thẻ...' : 'Tạo thẻ'}
      </button>
      {definition && (
        <div className="flashcard">
          <h3>Định nghĩa:</h3>
          <p>{definition}</p>
        </div>
      )}

      <form onSubmit={handleCreateFlashcard}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/png"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú"
        />
        <input
          type="text"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="URL video"
        />
        <button type="submit">Tạo Flashcard</button>
      </form>

      <div id="flashcardList">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard">
            <h3>{flashcard.title}</h3>
            <p>{flashcard.content}</p>
            {flashcard.notes && <p>{flashcard.notes}</p>}
            {flashcard.imageUrl && (
              <img src={flashcard.imageUrl} alt={flashcard.title} />
            )}
            {flashcard.videoUrl && (
              <a href={flashcard.videoUrl} target="_blank" rel="noopener noreferrer">
                Video minh họa
              </a>
            )}
            <button onClick={() => deleteFlashcard(flashcard.id)}>
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashgen;
