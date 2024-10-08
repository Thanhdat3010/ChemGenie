import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';
import logo from "../assets/logo.png"
import { auth, db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const chatbotAvatar = logo;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'profiles', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserAvatar(userData.profilePictureUrl || '');
          setUserName(userData.username || '');
        }
      }
    };

    fetchUserData();

    const sendInitialMessage = async () => {
      try {
        const formData = new FormData();
        formData.append('message', 'Xin chào');

        const response = await axios.post('http://127.0.0.1:5000/chat', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const botMessage = { sender: 'bot', text: response.data.response.replace(/\*/g, ''), avatar: chatbotAvatar };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending initial message:', error);
      }
    };

    sendInitialMessage();
  }, []);

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    } else {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const captureImage = () => {
    if (!isCameraOn || !videoRef.current || !canvasRef.current) {
      console.error("Camera is not on or refs are not available");
      return null;
    }
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          console.error("Failed to create blob from canvas");
          resolve(null);
        }
      }, 'image/jpeg');
    });
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, avatar: userAvatar, name: userName };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      const formData = new FormData();
      formData.append('message', input);

      if (isCameraOn) {
        const imageBlob = await captureImage();
        if (imageBlob) {
          formData.append('image', imageBlob, 'user_image.jpg');
          console.log("Image blob appended to form data");
        } else {
          console.error("Failed to capture image");
        }
      }

      console.log("Sending request to server...");
      const response = await axios.post('http://127.0.0.1:5000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Received response from server:", response.data);

      const botMessage = { 
        sender: 'bot', 
        text: response.data.response.replace(/\*/g, ''), 
        avatar: chatbotAvatar,
        emotion: translateEmotion(response.data.detected_emotion) 
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      console.log("Detected emotion:", response.data.detected_emotion);
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const translateEmotion = (emotion) => {
    const emotionTranslations = {
      "happy": "vui vẻ",
      "sad": "buồn",
      "angry": "tức giận",
      "surprise": "ngạc nhiên",
      "neutral": "bình thường",
      "fear": "sợ hãi",
    };
    return emotionTranslations[emotion.toLowerCase()] || emotion;
  };

  return (
    <div className="chatbot-wrapper">
      <Navbar/>
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
              {msg.sender === 'bot' && (
                <img src={msg.avatar || chatbotAvatar} alt="Bot Avatar" className="avatar" />
              )}
              {msg.sender === 'user' && (
                <img src={msg.avatar || userAvatar} alt="User Avatar" className="avatar" />
              )}
              <div className="message-content">
                <div className="name">{msg.sender === 'bot' ? 'Chatbot AI' : msg.name}</div>
                <div className="text">{msg.text}</div>
                {msg.emotion && <div className="emotion">Cảm xúc của bạn: {msg.emotion}</div>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      </div>
      <div className="camera-container">
        <video ref={videoRef} autoPlay style={{ display: isCameraOn ? 'block' : 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button onClick={toggleCamera}>{isCameraOn ? 'Tắt Camera' : 'Bật Camera'}</button>
      </div>
    </div>
  );
};

export default Chatbot;