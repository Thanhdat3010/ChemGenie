import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';
import logo from "../assets/genai.png"
import send from "../assets/send.png"
import { auth, db } from '../components/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '' || loading || isTyping) return;

    const userMessage = { sender: 'user', text: input, avatar: userAvatar, name: userName };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    setLoading(true);
    setLoadingTime(0);
    const loadingInterval = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
    }, 1000);

    try {
      const formData = new FormData();
      formData.append('message', input);

      const response = await axios.post('http://127.0.0.1:5000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      clearInterval(loadingInterval);
      setLoading(false);

      const botMessageText = response.data.response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Xử lý in đậm
        .replace(/\*/g, '')
        .replace(/##\s*(.*?)(?=\n|$)/g, '<strong>$1</strong>') // Chuyển ## thành in đậm
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const botMessage = { sender: 'bot', text: '', avatar: chatbotAvatar };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setIsTyping(true);
      for (let i = 0; i < botMessageText.length; i++) {
        setTimeout(() => {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].text += botMessageText[i];
            return updatedMessages;
          });
          if (i === botMessageText.length - 1) {
            setIsTyping(false);
          }
        }, i * 5);
      }
    } catch (error) {
      clearInterval(loadingInterval);
      setLoading(false);
      console.error('Error sending message:', error);
      setIsTyping(false);
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
                <img 
                  src={msg.avatar || chatbotAvatar} 
                  alt="Bot Avatar" 
                  className={`avatar ${loading && index === messages.length - 1 ? 'loading' : ''}`}
                />
              )}
              {msg.sender === 'user' && (
                <img src={msg.avatar || userAvatar} alt="User Avatar" className="avatar" />
              )}
              <div className="message-content">
                <div className="name">{msg.sender === 'bot' ? 'Chatbot AI' : msg.name}</div>
                <div 
                className="text" 
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              </div>
            </div>
          ))}
          {loading && (
            <div className="loading-message">
              <div className="spinner"></div>
              <p className="loading-text">Đang truy vấn... {loadingTime} giây</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading && !isTyping) {
                sendMessage();
              }
            }}
            placeholder="Nhập câu hỏi của bạn tại đây..."
            disabled={loading || isTyping}
          />
          <button onClick={sendMessage} disabled={loading || isTyping}>
            <img src={send} alt="Send" />
          </button>
        </div>
        <p>Lưu ý: Đôi lúc, Chemgenie bot có thể vẫn đưa ra câu trả lời không chính xác. Do đó, bạn nên xác nhận mọi dữ kiện một cách độc lập.</p>
      </div>
    </div>
  );
};

export default Chatbot;