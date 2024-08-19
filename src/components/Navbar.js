import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import avatar from "../assets/profile-user.png";
import magic from "../assets/magic-dust.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarActive, setAvatarActive] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const navigate = useNavigate()
  const openMessenger = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const messengerURL = isMobile ? 'fb-messenger://user/296055206930567' : 'https://www.facebook.com/messages/t/296055206930567';
    window.open(messengerURL);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 500) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setTransparent(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfilePictureUrl(userData.profilePictureUrl || '');
        }
      }
    };

    if (isLoggedIn) {
      fetchProfilePicture();
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleClicklogo = () => {
    navigate('/'); // Điều hướng về trang chủ
    setClicked(!clicked);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        localStorage.removeItem(user.email);
      }
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setAvatarActive(!avatarActive);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`NavbarItems ${transparent ? '' : 'solid'}`} onClick={closeDropdown}>
      <h1 className="navbar-logo" onClick={handleClicklogo}>
        <img alt="logo" src={logo} className="logo" />
      </h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
      <li>
  <Link className={`nav-links ${isActive('/') ? 'active' : ''}`} to="/">
    Trang chủ
  </Link>
</li>

<li className="dropdown">
  <Link className={`nav-links ${isActive('') ? 'active' : ''}`} to="">
    Ôn thi <i className="bx bx-chevron-down arrow"></i>
  </Link>
  <ul className="dropdown-content">
    <li>
      <Link className={`nav-links ${isActive('/Lythuyet') ? 'active' : ''}`} to="/Lythuyet">
    Lý thuyết
  </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/Lythuyet') ? 'active' : ''}`} to="/Lythuyet">
    E-learning
  </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/Onthi') ? 'active' : ''}`} to="/Onthi">
    Trắc nghiệm
  </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/Lythuyet') ? 'active' : ''}`} to="/Lythuyet">
    Tạo đề thi
  </Link>
    </li>
    <li>
    <Link className={`nav-links ${isActive('/Room') ? 'active' : ''}`} to="/Room">
    Phòng thi ảo
  </Link>
    </li>
  </ul>
</li>

<li className="dropdown">
  <Link className={`nav-links ${isActive('') ? 'active' : ''}`} to="">
    Flashgen <i className="bx bx-chevron-down arrow"></i>
  </Link>
  <ul className="dropdown-content">
    <li>
      <Link className={`nav-links ${isActive('/Flashcard') ? 'active' : ''}`} to="/Flashcard">
        Bảng tuần hoàn
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/Flashcard') ? 'active' : ''}`} to="/Flashcard">
        Hợp chất
      </Link>
    </li>
  </ul>
</li>

<li className="dropdown">
  <Link className={`nav-links genAI ${isActive('') ? 'active' : ''}`} to="">
    Gen AI <img alt="magici" src={magic} className="magic-icon" /> <i className="bx bx-chevron-down arrow"></i>
  </Link>
  <ul className="dropdown-content">
    <li>
      <Link className={`nav-links ${isActive('/Chatbot') ? 'active' : ''}`} to="/Chatbot">
        Chatbot AI
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/SolverForm') ? 'active' : ''}`} to="/SolverForm">
        Gia sư AI
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/AnalyzeResults') ? 'active' : ''}`} to="/AnalyzeResults">
        User AI
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/CreateQuiz') ? 'active' : ''}`} to="/CreateQuiz">
        AI tạo đề
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/RecommendExercises') ? 'active' : ''}`} to="/RecommendExercises">
        Trợ lý học tập AI
      </Link>
    </li>
    <li>
    <Link className={`nav-links ${isActive('/ExperimentProposal') ? 'active' : ''}`} to="/ExperimentProposal">
        AI Lab
      </Link>
    </li>
    <li>
      <Link className={`nav-links ${isActive('/Chatbot') ? 'active' : ''}`} to="/Flashgen">
        Flashcard AI
      </Link>
    </li>
  </ul>
</li>

<li>
<Link className={`nav-links ${isActive('/Tainguyen') ? 'active' : ''}`} to="/Tainguyen">
        Cộng đồng
      </Link>
</li>



        {isLoggedIn ? (
          <li className={avatarActive ? "avatar-container active" : "avatar-container"} onClick={toggleDropdown}>
            <img alt="avatar" src={profilePictureUrl ? profilePictureUrl : avatar} className="navbar-avatar" />
            <ul className={showDropdown ? "dropdown-menu show" : "dropdown-menu"}>
              <li className="Profile">
                <Link to="/Profile">Hồ sơ</Link>
              </li>
              <li className="Logout">
                <Link onClick={handleLogout}>Đăng xuất</Link>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <Link className="nav-links-mobile" to="/Login">
              Đăng nhập
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
