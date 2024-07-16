import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './StorytellingAI.css';

const StorytellingAI = () => {
    const [topic, setTopic] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

    const handleGenerateStory = async () => {
        if (!topic.trim()) {
            alert('Vui lòng nhập chủ đề.');
            return;
        }

        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Hãy tạo một câu chuyện ngắn giải thích khái niệm hóa học về ${topic} theo cách thú vị và dễ hiểu.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            const cleanText = text.replace(/`/g, '');
            setStory(cleanText);
        } catch (error) {
            console.error('Error generating story from AI:', error);
            alert('Đã xảy ra lỗi khi tạo câu chuyện từ AI.');
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
        <div className="storytelling-ai">
            <h2>Storytelling AI - Minh họa khái niệm hóa học</h2>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Nhập chủ đề hóa học"
            />
            <button onClick={handleGenerateStory} disabled={loading}>
                {loading ? 'Đang tạo câu chuyện...' : 'Tạo câu chuyện'}
            </button>
            {story && (
                <div className="story">
                    <h3>Câu chuyện:</h3>
                    <p>{formatTextWithLineBreaks(story)}</p>
                </div>
            )}
        </div>
    );
};

export default StorytellingAI;