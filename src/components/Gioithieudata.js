import "./Gioithieu.css";
import { Component } from "react";
import { Row, Col } from 'react-bootstrap';

const feedback = [
    { name: 'Gia Huy', class: 'Học sinh lớp 11', content: 'Sau khi trải nghiệm học tập thì em thấy website có các bài giảng theo GDPT 2018 cho học sinh 11 và rất dễ hiểu. Ngoài ra có chatbot AI giải đáp mọi thắc mắc của em và gia sư AI có thể giải bài khi em gặp khó khăn' },
    { name: 'Hoàng Ân', class: 'Học sinh lớp 12', content: 'Đối với học sinh lớp 12 như em thì rất cần các tài liệu để ôn tập ĐGNL cũng như THPTQG. Ngoài ra website có phòng thi ảo giúp em có thể luyện tập tư duy và cảm giác như thi thật.' },
    { name: 'Thái An', class: 'Sinh viên Đại học', content: 'Xu hướng hiện nay là ứng dụng AI tạo sinh (Generative AI) vào đời sống và website đã đáp ứng được điều đó để hỗ trợ người học. Website này đáng để sử dụng.' },
  ];

class GioithieuData extends Component {
    render() {
        return (
            <div fluid className="fb-w">
                <h2 className="Xskill">Đánh giá người dùng</h2>
                <p className="sm-skill">Đây là những gì người dùng của chúng tôi nói về trải nghiệm ứng dụng mang tính thay đổi học tập. Khám phá trực tiếp sự tác động của ứng dụng của chúng tôi đối với quá trình học tập của học sinh.</p>

                <Row className="justify-content-center">
                    {feedback.map((feedback, index) => (
                        <Col xs={12} sm={6} md={4} key={index} className="text-center mb-4">
                            <div className="skill-item">
                                <h6 className="skill-name">{feedback.name}</h6>
                                <p className="skill-class">{feedback.class}</p>
                                <p className="skill-content">{feedback.content}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}

export default GioithieuData;
