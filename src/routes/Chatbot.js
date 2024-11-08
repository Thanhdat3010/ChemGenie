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
  const messagesEndRef = useRef(null);

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

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, avatar: userAvatar, name: userName };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      const formData = new FormData();
      formData.append('message', input);

      const response = await axios.post('http://127.0.0.1:5000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const botMessage = { 
        sender: 'bot', 
        text: response.data.response.replace(/\*/g, ''), 
        avatar: chatbotAvatar
      };
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
    </div>
  );
};

export default Chatbot;