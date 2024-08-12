import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import image from "../assets/img-hd.png";
import Gioithieu from "../components/Gioithieu";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

import "./Trangchu.css"; // Tạo một tệp CSS mới cho Trangchu nếu cần
function Trangchu(props) {
    const [showGioithieu, setShowGioithieu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            if (position > 125) {
                setShowGioithieu(true);
            } else {
                setShowGioithieu(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
  <container fluid>
      <Navbar />
  <section id="home" className="text-start py-5 home-bg full-screen">
  <div className="row p-5 col-l home full-height">
    <div className="col-md-6 p-5">

      <h1 className="Xtitle">Develop your <br /> skills in a new <br /> and unique way</h1>
      <p className="content">
      ChemGenie - <span className="sm-title">Nền tảng cung cấp học liệu số Hóa học theo GDPT 2018</span> cho học sinh và giáo viên luyện thi trực tuyến với sự hỗ trợ của trí tuệ nhân tạo tạo sinh (Generative AI).
      </p>
      <div className="row align-items-center social flex-column flex-md-row">
        <div className="col-md-8 d-flex flex-column flex-md-row align-items-center">
          <button className="me-3 btn-down mb-3 mb-md-0">Khám phá ngay</button>
        </div>
      </div>
    </div>
    <div className="col-md-6 p-5 home d-flex justify-content-center">
      <div className="image-container">
        <img src={image} alt="Avatar" className="tilted-image img-fluid" />
      </div>
    </div>
  </div>
  </section>
  <section className="shape"></section>
  <Gioithieu/>
  <Contact />
   <Footer />
   </container>
    
    );
}

export default Trangchu;