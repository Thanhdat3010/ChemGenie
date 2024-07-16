import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification-overlay">
      <div className="notification">
        <p>{message}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default Notification;