import React, { useState, useEffect } from 'react';
import { db, auth } from '../components/firebase';
import { collection, addDoc, getDoc, updateDoc, arrayUnion, query, where, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Room.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <container fluid>
    <Navbar />
    <section className="full-screen">
    <div className="container room-page">
    <h2 className="room-title"><span className="top-title">Phòng thi trực tuyến</span> tiết kiệm thời gian và chi phí</h2>
    <p className="text-left content-description">
      Phòng thi trực tuyến giúp người học tiếp cận cuộc thi dễ dàng hơn trong quá trình luyện thi, kết nối bạn bè mọi nơi.
    </p>
    
    <div className="row room-row">
      <div className="col-md-6">
        <h4 className="room-label">Tạo phòng thi</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Nhập tên phòng thi"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <div className="select-wrapper">
        <select
          className="form-control"
          onChange={(e) => setSelectedQuizId(e.target.value)}
        >
          <option value="">Chọn bộ câu hỏi</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
          ))}
        </select>
      </div>

        <button className="btn room-button mt-3 ml-0" onClick={createRoom}>Tạo phòng</button>
      </div>
  
      <div className="col-md-6 ">
        <h4 className="room-label">Kết nối bạn bè, chinh phục bài thi</h4>
        <p className="room-muted">Sử dụng ID phòng do bạn bè chia sẻ để cùng làm bài thi</p>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Nhập ID phòng thi"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="btn room-button mt-3" onClick={joinRoom}>Vào phòng</button>
      </div>
    </div>
  </div>
    </section>
    
  <Footer />
    </container>

  
  );
};

export default Room;