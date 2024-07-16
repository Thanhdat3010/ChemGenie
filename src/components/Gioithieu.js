import "./Gioithieu.css"
import GioithieuData from "./Gioithieudata";
const Gioithieu = () => {
    return(
        <div className="Gioithieu">
        <h1>
        Giới thiệu website
        </h1>
        <p>Chào mừng bạn đến với trang web LUYỆN THI HÓA HỌC! Chúng tôi cung cấp
         đa đạng tài liệu ôn tập và bài tập để giúp bạn chuẩn bị tốt nhất cho các
         kỳ thi đánh giá năng lực hóa học. Hãy cùng chúng tôi nâng cao kiến thức và kỹ
         năng của bạn để đạt được thành công trong hành trình học tập.
         </p>
        <GioithieuData/>

        </div>
    )
}
export default Gioithieu;