import React, {useState} from 'react';
import './Trangchulythuyet.css';
import image1 from '../assets/MatterandEnergy.png';
import image2 from '../assets/PhasesofMatter.png';
import image3 from '../assets/AtomicStructure.png';
import image4 from '../assets/ThePeriodicTableandPeriodicTrends.png';
import image5 from '../assets/Bonding.png';
import image6 from '../assets/StoichiometryandSolutionChemistry.png';
import image7 from '../assets/StoichiometryandSolutionChemistry.png';
import image8 from '../assets/ReactionRatesandChemicalEquilibrium.png';
import image9 from '../assets/AcidandBase.png';
import image10 from '../assets/StoichiometryandSolutionChemistry.png';
import image11 from '../assets/OrganicChemistry.png';
import image12 from '../assets/NuclearChemistry.png';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

function Trangchulythuyet() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu từ khóa tìm kiếm

    // Danh sách các chương với tiêu đề, hình ảnh và đường dẫn
    const chapters = [
        { id: 1, title: "Chương 1: Vật chất và Năng lượng", image: image1, path: "/Chapter1" },
        { id: 2, title: "Chương 2: Các pha của vật chất", image: image2, path: "/Chapter2" },
        { id: 3, title: "Chương 3: Cấu trúc nguyên tử", image: image3, path: "/Chapter3" },
        { id: 4, title: "Chương 4: Bảng tuần hoàn và xu hướng tuần hoàn", image: image4, path: "/Chapter4" },
        { id: 5, title: "Chương 5: Liên kết", image: image5, path: "/Chapter5" },
        { id: 6, title: "Chương 6: Phép cân bằng hóa học và giải pháp hóa học", image: image6, path: "/Chapter6" },
        // { id: 7, title: "Chương 7", image: image7, path: "/" },
        // { id: 8, title: "Chương 8: Tốc độ phản ứng và cân bằng hóa học", image: image8, path: "/" },
        // { id: 9, title: "Chương 9: Acid và Base", image: image9, path: "/" },
        // { id: 10, title: "Chương 10", image: image10, path: "/" },
        // { id: 11, title: "Chương 11: Hóa học hữu cơ", image: image11, path: "/" },
        // { id: 12, title: "Chương 12: Hóa học hạt nhân", image: image12, path: "/" }
    ];
    const filteredChapters = chapters.filter(chapter =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div id="feature" className="block featureBlock bgGray">
    <div className="container-fluid">
        <div className="titleHolder">
            <h2>Chủ đề</h2>
            <div className='Search-bar'>
            <Input 
                placeholder="Tìm kiếm chương..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
        </div>
        <Row gutter={[16, 16]}>
            {filteredChapters.map((chapter) => (
                <Col key={chapter.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} onClick={() => navigate(chapter.path)}>
                    <Card
                        hoverable
                        cover={<img alt={chapter.title} src={chapter.image} />}
                    >
                        <Meta title={chapter.title} />
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
</div>
  );
}

export default Trangchulythuyet;
