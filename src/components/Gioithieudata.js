import "./Gioithieu.css";
import { Component } from "react";
import hinhgioithieu  from "../assets/logo(2).png"
import hinhgioithieu1  from "../assets/logo(3).png"
class GioithieuData extends Component{
    render(){
        return(
    <div className="first">
            <div className="first-text">
            <h2><b>ÔN TẬP TIỆN LỢI Ở BẤT CỨ ĐÂU</b></h2>
            <h3>Nền tảng luyện đề SAT Hóa học dành cho học sinh</h3>
            <p1>Xây dựng năng lực:&ensp;</p1>
            <p2>SAT Chemistry không chỉ giúp bạn dễ dàng luyện đề theo quy chuẩn đề SAT mà còn giúp bạn xây dựng tư duy logic của mình.
            <br/>
            <br/>
            </p2>
            <p3>
            Tiết kiệm thời gian:&ensp;
            </p3>
            <p4>
            SAT Chemistry là nền tảng online giúp bạn luyện đề ở bất cứ đâu mà không cần phải chuẩn bị trước.   
            </p4>
            
            </div>
            <div className="image">
            <img alt="img" src={hinhgioithieu}/>
            <img alt="img" src={hinhgioithieu1}/>
            </div>
        </div>
        )
    }
}
export default GioithieuData;
