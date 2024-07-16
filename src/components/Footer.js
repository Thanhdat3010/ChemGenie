import './Footer.css';
import React from 'react';
function Footer() {
  return (
      <div className="footer">
        <ul className="socials">
          <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a></li>
          <li><a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
          <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest-p"></i></a></li>
          <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
        </ul>
        <div className="footer-text">
        <p>🐻 Ôn luyện hóa học ngay tại nhà</p>
        <p>💌 Email - fivecreatorsgroup@gmail.com</p>
        <p>🏐 Số điện thoại liên lạc - 0799747780</p>
      </div>
      </div>
  );
}

export default Footer;