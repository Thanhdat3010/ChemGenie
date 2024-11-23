import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ExperimentProposal.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import magic from "../assets/magic-dust.png";
import { API_KEY } from '../config';
const ExperimentProposal = () => {
    const [phenomenon, setPhenomenon] = useState('');
    const [proposal, setProposal] = useState('');
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI(API_KEY);

    const handleGenerateProposal = async () => {
        if (!phenomenon.trim()) {
            alert('Vui lòng nhập hiện tượng hoặc vấn đề cần nghiên cứu.');
            return;
        }

        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Hãy đề xuất các thí nghiệm để nghiên cứu về hiện tượng hoặc vấn đề hóa học: ${phenomenon}. Lưu ý đừng quá dài dòng`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            const cleanText = text.replace(/`/g, '');
            setProposal(cleanText);
        } catch (error) {
            console.error('Error generating experiment proposal from AI:', error);
            alert('Đã xảy ra lỗi khi đề xuất thí nghiệm từ AI.');
        } finally {
            setLoading(false);
        }
    };
    const formatTextWithLineBreaks = (text) => {
        if (!text) return null;  // Kiểm tra nếu text là null hoặc undefined
        return text.split('\n').map((line, index) => {
          if (!line.trim()) return null;
          // Loại bỏ các ký hiệu đặc biệt
          const cleanedLine = line.replace(/^[\*\#\-\s]+/, '').replace(/\*\*/g, '');
          return <p key={index}>{cleanedLine}</p>;
        });
      };
    return (
        <container fluid>
            <Navbar />
            <section className= "full-screen">
            <div className="experiment-proposal">
              <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
      <h2 className="solver-title">AI đề xuất thí nghiệm</h2>
      <p className="solver-intro">AI trợ lý đắc lực, giúp bạn khám phá những điều mới lạ trong phòng thí nghiệm.</p>
            <textarea
                value={phenomenon}
                onChange={(e) => setPhenomenon(e.target.value)}
                placeholder="Nhập hiện tượng hoặc vấn đề hóa học"
            />
            <button onClick={handleGenerateProposal} disabled={loading}>
                {loading ? 'Đang đề xuất thí nghiệm...' : 'Đề xuất thí nghiệm'}
            </button>
            {proposal && (
                <div className="proposal">
                    <h3 className="proposal-title-prompt">Đề xuất thí nghiệm:</h3>
                    <p>{formatTextWithLineBreaks(proposal)}</p>
                </div>
            )}
        </div>
            </section>
        <Footer />
        </container>
   
    );
};

export default ExperimentProposal;