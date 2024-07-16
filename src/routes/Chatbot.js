import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';
import logo from "../assets/logo.png"
import { auth, db } from '../components/firebase'; // Import Firebase authentication and firestore
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');

  // Avatar của chatbot
  const chatbotAvatar = logo; // Đường dẫn đến avatar của chatbot

  useEffect(() => {
    // Hàm async để fetch thông tin người dùng từ Firestore
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'profiles', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserAvatar(userData.profilePictureUrl || ''); // Sử dụng avatar từ Firestore nếu có
          setUserName(userData.username || ''); // Sử dụng tên từ Firestore nếu có
        }
      }
    };

    fetchUserData();

    // Gửi lời chào từ chatbot khi component được tải
    const sendInitialMessage = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/chat', { message: 'Xin chào' });
        const botMessage = { sender: 'bot', text: response.data.response, avatar: chatbotAvatar };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending initial message:', error);
      }
    };

    sendInitialMessage();

  }, []); // Dependency array để chỉ gửi lời chào một lần khi component được tải

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, avatar: userAvatar, name: userName };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      // Gửi tin nhắn đến server hoặc AI backend
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });

      // Xây dựng tin nhắn từ phản hồi của chatbot
      const botMessage = { sender: 'bot', text: response.data.response, avatar: chatbotAvatar };

      // Cập nhật danh sách tin nhắn
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Chatbot;