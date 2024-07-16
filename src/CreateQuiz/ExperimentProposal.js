import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ExperimentProposal.css';

const ExperimentProposal = () => {
    const [phenomenon, setPhenomenon] = useState('');
    const [proposal, setProposal] = useState('');
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

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
        <div className="experiment-proposal">
            <h2>AI Đề Xuất Thí Nghiệm</h2>
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
                    <h3>Đề xuất thí nghiệm:</h3>
                    <p>{formatTextWithLineBreaks(proposal)}</p>
                </div>
            )}
        </div>
    );
};

export default ExperimentProposal;