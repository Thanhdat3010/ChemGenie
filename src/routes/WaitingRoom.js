import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, auth } from '../components/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore';
import { FaSignOutAlt } from 'react-icons/fa'; 
import './WaitingRoom.css';
import avatar from "../assets/profile-user.png";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId, quizId, timeLimit } = location.state;
  const [roomDetails, setRoomDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        const data = roomSnap.data();
        setRoomDetails(data);
        setIsOwner(data.ownerId === auth.currentUser.uid); 
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (roomDetails && roomDetails.participants) {
        const membersData = await Promise.all(
          roomDetails.participants.map(async memberId => {
            const memberDoc = await getDoc(doc(db, 'profiles', memberId));
            if (memberDoc.exists()) {
              return memberDoc.data();
            } else {
              return {
                uid: memberId,
                username: 'Người dùng mới',
                profilePictureUrl: avatar
              };
            }
          })
        );
        setMembers(membersData);
      }
    };
  
    fetchMembers();
  }, [roomDetails]);

  useEffect(() => {
    const joinRoom = async () => {
      const user = auth.currentUser;
      if (user) {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          await updateDoc(roomRef, {
            participants: arrayUnion(user.uid)
          });
        } else {
          console.log('Room does not exist');
        }
      }
    };

    joinRoom();

    return async () => {
      const user = auth.currentUser;
      if (user) {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          const roomData = roomSnap.data();
          if (!roomData.quizStarted) {
            await updateDoc(roomRef, {
              participants: arrayRemove(user.uid)
            });

            const updatedRoomSnap = await getDoc(roomRef);
            const updatedRoomData = updatedRoomSnap.data();
            if (updatedRoomData && updatedRoomData.participants && updatedRoomData.participants.length === 0) {
              await deleteDoc(roomRef).catch((error) => {
                console.error('Error deleting document: ', error);
              });
            }
          }
        }
      }
    };
  }, [roomId]);

  useEffect(() => {
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoomDetails(data);
        if (data.quizStarted && members.length > 0) {
          members.forEach(member => {
            navigate(`/quiz-room/${roomId}`, { state: { quizId, roomId, timeLimit } });
          });
        }
      }
    });
  
    return () => unsubscribe();
  }, [roomId, members, quizId, timeLimit, navigate]);

  const handleStartQuiz = async () => {
    if (isOwner) {
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        quizStarted: true 
      });
    } else {
      console.log('Only room owner can start the quiz.');
    }
  };

  const handleExitRoom = async () => {
    const user = auth.currentUser;
    if (user) {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        if (!roomData.quizStarted) {
          await updateDoc(roomRef, {
            participants: arrayRemove(user.uid)
          });

          const updatedRoomSnap = await getDoc(roomRef);
          const updatedRoomData = updatedRoomSnap.data();
          if (updatedRoomData && updatedRoomData.participants && updatedRoomData.participants.length === 0) {
            await deleteDoc(roomRef).catch((error) => {
              console.error('Error deleting document: ', error);
            });
          }
        }
      }
      navigate('/');
    }
  };

  return (
    <div className="waiting-room-page">
      <FaSignOutAlt className="exit-icon" onClick={handleExitRoom} />
      <h2>Phòng chờ</h2>
      <p>Tên phòng: {roomDetails?.name}</p>
      <p>ID phòng: {roomId}</p>
      
      <div className="members-list">
        <h3>Thành viên trong phòng:</h3>
        {members.map(member => (
          <div key={member.uid} className="member-item">
            <img 
              src={member.profilePictureUrl} 
              alt="Avatar" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = avatar;
              }}
            />
            <p>{member.username}</p>
          </div>
        ))}
      </div>

      {isOwner && !roomDetails.quizStarted && (
        <button onClick={handleStartQuiz}>Bắt đầu quiz</button>
      )}
    </div>
  );
};

export default WaitingRoom;