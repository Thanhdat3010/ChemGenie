import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero(props) {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false); // New state to track completion

    useEffect(() => {
        if (isCompleted) return; // Dừng hiệu ứng nếu đã hoàn thành

        let typingDelay;

        if (typedText.length < props.text.length) {
            typingDelay = setTimeout(() => {
                setTypedText(props.text.substring(0, typedText.length + 1));
            }, 100); // Thời gian trễ giữa các ký tự gõ vào
        } else {
            setIsCompleted(true); // Đánh dấu là đã hoàn thành khi gõ xong
        }

        return () => clearTimeout(typingDelay);
    }, [typedText, props.text, isCompleted]);
    return (
        <>
            <div className={props.cName}>
                <div className='hero-text'>
                    <h1>{props.title}</h1>
                    <p>{typedText}</p>
                    <Link to='/Lythuyet' className={props.btnClass}>
                        {props.buttonText}
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Hero;