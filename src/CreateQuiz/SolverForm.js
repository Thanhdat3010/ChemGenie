import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './SolverForm.css';

const SolverForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [equation, setEquation] = useState('');
  const [explanation, setExplanation] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const genAI = new GoogleGenerativeAI('AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const openCamera = async () => {
    setIsCameraOpen(true);
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back')) || videoDevices[0];

    if (rearCamera) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: rearCamera.deviceId } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } else {
      setError('Không tìm thấy camera sau.');
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, videoWidth, videoHeight);
  
    canvas.toBlob((blob) => {
      setSelectedFile(blob);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(blob);
      closeCamera();
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Vui lòng chọn một file hình ảnh.');
      return;
    }

    setLoading(true);

    const fileToGenerativePart = async (file) => {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
      };
    };

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = 'Đưa ra đáp án bài trong ảnh này và lời giải chi tiết. Kết quả trả ra dạng JSON answer';
      const imageParts = [await fileToGenerativePart(selectedFile)];
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = await response.text();
      const cleanText = text.replace(/`/g, ''); // Thay thế tất cả các backtick
      const cleanText1 = cleanText.replace(/json/g, ''); // Thay thế tất cả các backtick
      const parsedResponse = JSON.parse(cleanText1);
      const extractedEquation = parsedResponse.answer || parsedResponse.equation || 'Không tìm thấy câu trả lời phù hợp.';
      const explanations = parsedResponse.explanation || '';
      setExplanation(explanations);
      setEquation(extractedEquation);
      setError('');
    } catch (error) {
      console.error('Error generating answer from AI:', error);
      setError('Đã xảy ra lỗi khi giải bài từ AI.');
    } finally {
      setLoading(false);
    }
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return null;
  
      // Loại bỏ các ký hiệu đặc biệt
      const cleanedLine = line.replace(/^[\*\#\-\s]+/, '').replace(/\*\*/g, '');
  
      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: cleanedLine }}></p>
      );
    });
  };

  return (
    <div className="solver-form-container">
      <h2 className="solver-form-title">Giải hóa tự động bằng AI</h2>
      {error && <p className="solver-form-error">{error}</p>}
      <form className="solver-form" onSubmit={handleSubmit}>
        <div
          className="solver-form-drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Ảnh tải lên" className="solver-form-preview-image" />
          ) : (
            <p>Kéo và thả ảnh vào đây hoặc nhấn để chọn tệp</p>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {!isCameraOpen && (
          <button type="button" onClick={openCamera} className="solver-form-button">Mở camera</button>
        )}
        {isCameraOpen && (
          <div className="camera-container">
            <video ref={videoRef} className="camera-video" />
            <div onClick={capturePhoto} className='camera-capture-button'>
              <i className="fa-solid fa-camera"></i>
            </div>
            <button type="button" onClick={closeCamera} className="solver-form-button">Đóng camera</button>
            <canvas ref={canvasRef} className="camera-canvas" style={{ display: 'none' }} />
          </div>
        )}
        <button className="solver-form-button" type="submit" disabled={loading}>
          {loading ? 'Đang giải...' : 'Giải'}
        </button>
      </form>
      {equation && (
        <div className="solver-form-answer">
          <h3 className="solver-form-answer-title">Bài giải:</h3>
          <p className="solver-form-answer-content"><strong>Đáp án:</strong> <br/> {formatTextWithLineBreaks(equation)}</p>
          {explanation && (
            <p className="solver-form-answer-content"><strong>Giải thích:</strong> <br/> {formatTextWithLineBreaks(explanation)}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SolverForm;