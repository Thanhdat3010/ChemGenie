import React, { useState, useEffect } from 'react';
import { db, auth } from '../components/firebase';
import { collection, addDoc, getDoc, updateDoc, arrayUnion, query, where, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Room.css';

const Room = () => {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const quizzesRef = collection(db, 'createdQuizzes');
          const q = query(quizzesRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const quizData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuizzes(quizData);
        } else {
          console.log('No user is logged in.');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const createRoom = async () => {
    try {
      const user = auth.currentUser;
      if (user && selectedQuizId && newRoomName.trim() !== '') {
        const roomRef = await addDoc(collection(db, 'rooms'), {
          name: newRoomName,
          ownerId: user.uid,
          members: [user.uid],
          quizId: selectedQuizId,
        });
        navigate(`/waiting-room/${roomRef.id}`, { state: { quizId: selectedQuizId, roomId: roomRef.id } });
      } else {
        console.log('Please select a quiz and enter a room name.');
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const joinRoom = async () => {
    try {
      const user = auth.currentUser;
      if (user && roomId.trim() !== '') {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          await updateDoc(roomRef, {
            members: arrayUnion(user.uid),
          });
          const quizId = roomSnap.data().quizId;
          navigate(`/waiting-room/${roomId}`, { state: { quizId: quizId, roomId: roomId } });
        } else {
          console.log('Room does not exist');
        }
      } else {
        console.log('Please enter a valid room ID.');
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="room-page">
      <h2>Tạo hoặc vào phòng</h2>
      <div className="create-room">
        <input
          type="text"
          placeholder="Nhập tên phòng"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <div>
          <p>Chọn bộ câu hỏi:</p>
          <select onChange={(e) => setSelectedQuizId(e.target.value)}>
            <option value="">Chọn bộ câu hỏi...</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
            ))}
          </select>
        </div>
        <button onClick={createRoom}>Tạo phòng</button>
      </div>
      <div className="join-room">
        <input
          type="text"
          placeholder="Nhập ID phòng"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Vào phòng</button>
      </div>
    </div>
  );
};

export default Room;