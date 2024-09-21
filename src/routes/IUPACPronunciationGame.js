import React, { useState, useEffect } from 'react';
import { Button, message, Image } from 'antd';
import './IUPACPronunciationGame.css';  // Đảm bảo import file CSS
import Navbar from '../components/Navbar';
function IUPACPronunciationGame() {
  const [currentCompound, setCurrentCompound] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [accuracy, setAccuracy] = useState(null);

  const compounds = [
    { name: 'Methane', iupac: 'methane' },
    { name: 'Ethanol', iupac: 'ethanol' },
    { name: 'Propanoic acid', iupac: 'propanoic acid' },
    { name: 'Benzene', iupac: 'benzene' },
    { name: 'Acetone', iupac: 'propanone' },
    { name: 'Glucose', iupac: 'glucose' },
    { name: 'Aspirin', iupac: '2-acetoxybenzoic acid' },
    { name: 'Caffeine', iupac: '1,3,7-trimethylpurine-2,6-dione' },

    // Thêm nhiều hợp chất khác
  ];

  useEffect(() => {
    selectRandomCompound();
  }, []);

  const selectRandomCompound = () => {
    const randomIndex = Math.floor(Math.random() * compounds.length);
    setCurrentCompound(compounds[randomIndex]);
    setAccuracy(null);
  };

  const playSampleAudio = () => {
    if (currentCompound) {
      const utterance = new SpeechSynthesisUtterance(currentCompound.iupac);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const recognition = initializeSpeechRecognition();
    if (recognition) {
      setIsListening(true);
      recognition.start();
      message.info('Đang lắng nghe... Hãy phát âm tên IUPAC của hợp chất.');
    }
  };

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        console.log('Speech recognized:', speechResult);
        calculateAccuracy(speechResult);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        message.error('Có lỗi xảy ra khi nhận diện giọng nói. Vui lòng thử lại.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      return recognition;
    } else {
      message.error('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.');
      return null;
    }
  };

  const calculateAccuracy = (spokenText) => {
    if (!currentCompound) {
      message.error('Không có hợp chất nào được chọn. Vui lòng thử lại.');
      return;
    }

    const correctPronunciation = currentCompound.iupac.toLowerCase();
    console.log('Correct pronunciation:', correctPronunciation);
    console.log('Spoken text:', spokenText);

    const similarity = calculateStringSimilarity(correctPronunciation, spokenText);
    const accuracyPercentage = Math.round(similarity * 100);
    setAccuracy(accuracyPercentage);

    if (accuracyPercentage >= 90) {
      message.success('Tuyệt vời! Phát âm của bạn rất chính xác.');
    } else if (accuracyPercentage >= 70) {
      message.info(`Khá tốt! Độ chính xác: ${accuracyPercentage}%. Hãy thử lại để cải thiện.`);
    } else {
      message.warning(`Độ chính xác: ${accuracyPercentage}%. Hãy lắng nghe mẫu và thử lại.`);
    }
  };

  // Hàm tính toán độ tương đồng giữa hai chuỗi
  const calculateStringSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  };

  // Hàm tính khoảng cách Levenshtein
  const editDistance = (str1, str2) => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    const costs = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) {
        costs[str2.length] = lastValue;
      }
    }
    return costs[str2.length];
  };

  return (
    <>
    <Navbar />
    <div className="iupac-game-container">
      <h2 className="iupac-game-title">Trò chơi phát âm IUPAC</h2>
      {currentCompound && (
        <div className="compound-info">
          <h3 className="compound-name">Hợp chất hiện tại: {currentCompound.name}</h3>
          <p className="instruction">Hãy phát âm tên IUPAC của hợp chất này</p>
          {currentCompound.structureImage && (
            <Image
              className="molecule-image"
              src={currentCompound.structureImage}
              alt={`Cấu trúc phân tử của ${currentCompound.name}`}
              width={200}
            />
          )}
          <div className="button-group">
            <Button onClick={startListening} disabled={isListening}>
              {isListening ? 'Đang lắng nghe...' : 'Bắt đầu phát âm'}
            </Button>
            <Button onClick={playSampleAudio}>
              Phát âm mẫu
            </Button>
          </div>
          {accuracy !== null && (
            <p className="accuracy-display">Độ chính xác: {accuracy}%</p>
          )}
          <Button className="next-compound-button" onClick={selectRandomCompound}>
            Hợp chất tiếp theo
          </Button>
        </div>
      )}
    </div>
    </>
  );
}


export default IUPACPronunciationGame;
