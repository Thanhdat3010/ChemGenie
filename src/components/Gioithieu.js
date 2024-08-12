import "./Gioithieu.css"
import GioithieuData from "./Gioithieudata";
import model from "../assets/model-hd.jpg";

const Gioithieu = () => {
    return(
        <div id="home" className="text-start py-5 home-bg full-screen">
        <div className="row p-5 col-l home full-height">
        <div className="col-md-6 p-5 home d-flex justify-content-center">
      <div className="image-container">
        <img src={model} alt="Avatar" className="model-image img-fluid" />
      </div>
    </div>
        <div className="col-md-6">

        <h1 className="Xtext"><span className="sm-text">ÔN TẬP TIỆN LỢI</span> Ở BẤT CỨ ĐÂU</h1>
        <p className="md-slogan">
        Nền tảng luyện đề SAT Hóa học dành cho học sinh
        </p>
        <div className="row align-items-center social flex-column flex-md-row">
        <span className="md-content">AI tạo sinh (Generative AI)</span>
        <p className="i-content">ChemGenie tích hợp AI tạo sinh vào giảng dạy và luyện thi, tạo đề ngẫu nhiên bằng AI, giải bài tập qua hình ảnh bằng AI.</p>
        <span className="md-content">Xây dựng năng lực</span>
        <p className="i-content">ChemGenie không chỉ giúp bạn dễ dàng luyện đề theo quy chuẩn đề SAT mà còn giúp bạn xây dựng tư duy logic của mình.</p>
        <span className="md-content">Tài nguyên mở rộng</span>
        <p className="i-content">ChemGenie không những chỉ có phòng thi ảo mà còn có thẻ học tập áp dụng phương pháp giảng dạy bằng Flashcard, mô hình tương tác xoay đa chiều.</p>
        <span className="md-content">Tiết kiệm thời gian</span>
        <p className="i-content">ChemGenie là nền tảng online giúp bạn luyện đề ở bất cứ đâu mà không cần phải chuẩn bị trước.</p>
        </div>
        </div>

        </div>
        <GioithieuData/>

        </div>
    )
}
export default Gioithieu;