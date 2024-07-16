import React from 'react';
import './AboutUs.css';
import { Row, Col } from 'antd';

const items = [
  {
    key: '1',
    icon:<i class="fa-solid fa-business-time"></i>,
    title: 'Tiết kiệm thời gian',
    content: 'Tiết kiệm thời gian sử dụng mà không cần chuẩn bị trước.',
  },
  {
    key: '2',
    icon: <i class="fa-solid fa-brain"></i>,
    title: 'Cải thiện tư duy',
    content: 'Luyện tập các dạng đề giúp học sinh cải thiện khả năng tư duy.',
  },
  {
    key: '3',
    icon: <i class="fa-solid fa-book"></i>,
    title: 'Tài liệu học tập',
    content: 'Nguồn tài liệu học tập môn hóa học theo SAT.',
  },
]

function AboutUs() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid1">
        <div className="titleHolder">
          <h2>Đội ngũ phát triển</h2>
        </div>
        <div className="contentHolder">
          <p>Nhóm lập trình FiveC chuyên phát triển ứng dụng và trang web liên quan đến môn hóa học SAT. Chúng tôi cung cấp tài nguyên học tập, bài kiểm tra và công cụ học thuật để giúp học sinh chuẩn bị tốt nhất cho kỳ thi SAT về hóa học. Đội ngũ của chúng tôi có kinh nghiệm và đam mê trong việc tạo ra các giải pháp giáo dục chất lượng cao. </p>
        </div>
        <Row gutter={[16, 16]}>   
          {items.map(item => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default AboutUs;