import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import Firebase authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import google from "../assets/google-icon.png";
import Notification from './Notification';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authMode, setAuthMode] = useState('signin'); // Mặc định là signin
    const [showNotification, setShowNotification] = useState(false); // Thêm state mới cho thông báo
    const [notificationMessage, setNotificationMessage] = useState(''); // Thêm state cho thông báo
    const navigate = useNavigate();

    const onButtonClick = async () => {
        setEmailError('');
        setPasswordError('');

        try {
            if (authMode === 'signin') {
                // Đăng nhập bằng email và mật khẩu
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Đăng nhập thành công:', user);
                localStorage.setItem('user', JSON.stringify({ email }));
                localStorage.setItem('isLoggedIn', true);
                props.setLoggedIn(true);
                props.setEmail(email);
                navigate('/');
            } else {
                // Đăng ký bằng email và mật khẩu
                if (password !== confirmPassword) {
                    setPasswordError('Mật khẩu không khớp');
                    return;
                }
                
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Đăng ký thành công:', user);
                setAuthMode('signin'); // Chuyển về chế độ đăng nhập sau khi đăng ký thành công
            }
        } catch (error) {
            console.error('Lỗi xác thực:', error);
            if (error.code === 'auth/email-already-in-use') {
                setEmailError('Email đã được sử dụng');
            } else if (error.code === 'auth/invalid-email') {
                setEmailError('Email không hợp lệ');
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setPasswordError('Email hoặc mật khẩu không đúng');
            } else {
                if (authMode === 'signin') {
                    setPasswordError('Đăng nhập không thành công');
                } else {
                    setPasswordError('Đăng ký không thành công');
                }
            }
        }
    };

    const onGoogleLoginClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log('Đăng nhập bằng Google thành công:', user);
            localStorage.setItem('user', JSON.stringify({ email: user.email }));
            localStorage.setItem('isLoggedIn', true);
            props.setLoggedIn(true);
            props.setEmail(user.email);
            navigate('/');
        } catch (error) {
            console.error('Lỗi đăng nhập bằng Google:', error);
        }
    };
    const onResetPasswordClick = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setNotificationMessage("Đã gửi email đặt lại mật khẩu, vui lòng kiểm tra hộp thư đến của bạn");
            setShowNotification(true);
        } catch (error) {
            console.error('Lỗi khi gửi email đặt lại mật khẩu:', error);
            setEmailError('Đã xảy ra lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
        }
    };
    const changeAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEmailError('');
        setPasswordError('');
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{authMode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}</h3>
                   
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                    <div className="form-group mt-3">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>
                    {authMode === 'signup' && (
                        <div className="form-group mt-3">
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChange={(ev) => setConfirmPassword(ev.target.value)}
                            />
                        </div>
                    )}
                    <label className="errorLabel">{passwordError}</label>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-primary" type="button" onClick={onButtonClick}>
                            {authMode === 'signin' ? 'Đăng nhập' : 'Đăng ký'}
                        </button>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn-google" type="button" onClick={onGoogleLoginClick}>
                            <img src={google} alt="Google" className="google-icon" />
                            Đăng nhập bằng Google
                        </button>
                    </div>
                    {authMode === 'signin' && (
                        <p className="text-center mt-2">
                            <a href="#" onClick={onResetPasswordClick}>Quên mật khẩu?</a>
                        </p>
                    )}
                    <div className="text-center">
                        {authMode === 'signin' ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? '}
                        <span className="link-primary" onClick={changeAuthMode}>
                            {authMode === 'signin' ? 'Đăng ký' : 'Đăng nhập'}
                        </span>
                    </div>
                </div>
            </form>
            {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
        </div>
    );
};

export default Login;