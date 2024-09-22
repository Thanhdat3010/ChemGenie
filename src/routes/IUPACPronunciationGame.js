import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import './IUPACPronunciationGame.css';
import Navbar from '../components/Navbar';
import { GoogleGenerativeAI } from '@google/generative-ai';
import magic from "../assets/magic-dust.png";
import { SwapOutlined } from '@ant-design/icons';
import Game from "../assets/game-icon.png";

function IUPACPronunciationGame() {
  const [currentCompound, setCurrentCompound] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const [compounds, setCompounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pronunciationMode, setPronunciationMode] = useState('iupac');
  const [usedCompounds, setUsedCompounds] = useState([]);
  const [isVisuallyImpairedMode, setIsVisuallyImpairedMode] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyB3QUai2Ebio9MRYYtkR5H21hRlYFuHXKQ");

  useEffect(() => {
    if (!hasWelcomed) {
      speakText("Chào mừng đến với trò chơi phát âm. Nhấn Ctrl + Shift + V để bật chế độ phím tắt.");
      setHasWelcomed(true);
    }
  }, [hasWelcomed]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Tổ hợp phím Ctrl + Shift + V để bật/tắt chế độ khiếm thị
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyV') {
        event.preventDefault();
        toggleVisuallyImpairedMode();
      }

      if (isVisuallyImpairedMode) {
        if (event.code === 'Space') {
          event.preventDefault();
          startGame();
        } else if (event.code === 'KeyR') {
          event.preventDefault();
          startListening();
        } else if (event.code === 'KeyN') {
          event.preventDefault();
          selectRandomCompound();
        } else if (event.code === 'KeyP') {
          event.preventDefault();
          playSampleAudio();
        } else if (event.code === 'KeyG') {
          event.preventDefault();
          generateCompounds();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisuallyImpairedMode, currentCompound]);

  const toggleVisuallyImpairedMode = () => {
    setIsVisuallyImpairedMode(prev => {
      const newMode = !prev;
      if (newMode) {
        speakText("Chế độ phím tắt đã được bật. Nhấn phím Space để bắt đầu trò chơi, phím R để bắt đầu ghi âm, phím N để chuyển sang hợp chất tiếp theo, và phím P để nghe phát âm mẫu.");
      } else {
        speakText("Chế độ phím tắt đã được tắt.");
      }
      return newMode;
    });
  };

  const speakText = (text, isEnglish = false) => {
    if (isEnglish) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      window.responsiveVoice.speak(text, "Vietnamese Female");
    }
  };

  const startGame = () => {
    if (currentCompound && isVisuallyImpairedMode) {
      const speakInstructions = () => {
        return new Promise(resolve => {
          window.responsiveVoice.speak(
            "Nhấn phím R để bắt đầu ghi âm, phím P để nghe phát âm mẫu, hoặc phím N để chuyển sang hợp chất tiếp theo. Sau đây là hợp chất bạn cần phát âm:",
            "Vietnamese Female",
            { onend: resolve }
          );
        });
      };

      speakInstructions().then(() => {
        const name = pronunciationMode === 'iupac' ? currentCompound.iupac : currentCompound.name;
        speakText(name, true);
      });
    } else if (isVisuallyImpairedMode) {
      speakText("Không có hợp chất nào. Vui lòng tạo mới danh sách bằng cách nhấn phím G.");
    }
  };

  const selectRandomCompound = (compoundList = compounds) => {
    if (compoundList.length > 0) {
      let availableCompounds = compoundList.filter(compound => !usedCompounds.includes(compound));
      
      if (availableCompounds.length === 0) {
        setUsedCompounds([]);
        availableCompounds = compoundList;
      }

      const randomIndex = Math.floor(Math.random() * availableCompounds.length);
      const selectedCompound = availableCompounds[randomIndex];
      
      setCurrentCompound(selectedCompound);
      setUsedCompounds(prev => [...prev, selectedCompound]);
      setAccuracy(null);

      if (selectedCompound && isVisuallyImpairedMode) {
        const speakInstructions = () => {
          return new Promise(resolve => {
            window.responsiveVoice.speak(
              "Nhấn phím R để bắt đầu ghi âm, phím P để nghe phát âm mẫu.",
              "Vietnamese Female",
              { onend: resolve }
            );
          });
        };

        speakInstructions().then(() => {
          const name = pronunciationMode === 'iupac' ? selectedCompound.iupac : selectedCompound.name;
          speakText(name, true);
        });
      }
    } else {
      message.warning('Không có hợp chất nào. Vui lòng tạo mới danh sách.');
    }
  };

  const togglePronunciationMode = () => {
    setPronunciationMode(prevMode => prevMode === 'iupac' ? 'name' : 'iupac');
  };

  const playSampleAudio = () => {
    if (currentCompound) {
      const textToSpeak = pronunciationMode === 'iupac' ? currentCompound.iupac : currentCompound.name;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
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

    const correctPronunciation = pronunciationMode === 'iupac' 
      ? currentCompound.iupac.toLowerCase() 
      : currentCompound.name.toLowerCase();
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

    if (isVisuallyImpairedMode) {
      if (accuracyPercentage >= 90) {
        speakText('Tuyệt vời! Phát âm của bạn rất chính xác. Nhấn N để chuyển sang hợp chất tiếp theo hoặc R để thử lại.');
      } else if (accuracyPercentage >= 70) {
        speakText(`Khá tốt! Độ chính xác: ${accuracyPercentage}%. Nhấn R để thử lại, P để nghe phát âm mẫu, hoặc N để chuyển sang hợp chất tiếp theo.`);
      } else {
        speakText(`Độ chính xác: ${accuracyPercentage}%. Hãy nhấn P để nghe phát âm mẫu và R để thử lại.`);
      }
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

  const generateCompounds = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Hãy tạo ra 20 cặp tên thông thường và tên IUPAC của các đơn chất và hợp chất hóa học, kèm theo phiên âm của cả hai tên. 
      Đảm bảo rằng các hợp chất bao gồm cả vô cơ và hữu cơ, đa dạng và phù hợp với học sinh trung học cơ sở và trung học phổ thông.
      Quan trọng: Các hợp chất trong danh sách không được trùng lặp.
      Kết quả trả về dưới dạng JSON với cấu trúc sau (đây chỉ là ví dụ, hãy tạo thêm các cặp chất khác):
      [
        { 
          name: "Methane", 
          namePronunciation: "ˈmiːθeɪn",
          iupac: "methane", 
          iupacPronunciation: "ˈmɛθeɪn" 
        },
        { 
          name: "Ethanol", 
          namePronunciation: "ˈɛθənɒl",
          iupac: "ethanol", 
          iupacPronunciation: "ˈɛθənɒl" 
        }
      ].
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const cleanText = response.text()
        .replace(/`/g, '')
        .replace(/json/g, '')
        .replace(/\*/g, '')
        .replace(/\\"/g, '"')
        .replace(/'/g, "'")
        .replace(/\\n/g, '')
        .replace(/\s+/g, ' ');
      console.log(cleanText);
      const generatedCompounds = JSON.parse(cleanText);
      setCompounds(generatedCompounds);
      setUsedCompounds([]); 
      selectRandomCompound(generatedCompounds);
    } catch (error) {
      console.error('Error generating compounds:', error);
      message.error('Đã xảy ra lỗi khi tạo danh sách hợp chất. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }

    if (isVisuallyImpairedMode) {
      speakText("Đã tạo danh sách hợp chất mới. Nhấn Space để bắt đầu trò chơi.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="iupac-game-page">
      <div className="solver-tag"><p className="solver-name"><img alt="magici" src={magic} className="magic-icon" /> AI trong giáo dục</p></div>
      <h2 className="solver-form-title">Trò chơi phát âm</h2>
      <p className="solver-intro">AI sẽ giúp bạn cải thiện khả năng phát âm danh pháp IUPAC của các hợp chất hóa học.</p>
        {loading ? (
          <p>Đang tạo danh sách hợp chất...</p>
        ) : currentCompound ? (
          <div className="iupac-game-page__content">
            <h3 className="iupac-game-page__compound-name">
              Hợp chất hiện tại: {pronunciationMode === 'iupac' ? currentCompound.iupac : currentCompound.name}
            </h3>
            <button className="iupac-game-page__toggle-button" onClick={togglePronunciationMode}>
              <SwapOutlined /> Chuyển đổi chế độ phát âm
            </button>
            <p className="iupac-game-page__instruction">
              Hãy phát âm {pronunciationMode === 'iupac' ? 'tên IUPAC' : 'tên thông thường'} của hợp chất này
            </p>
            <p className="iupac-game-page__pronunciation">
              Phiên âm: {pronunciationMode === 'iupac' ? currentCompound.iupacPronunciation : currentCompound.namePronunciation}
            </p>
            <div className="iupac-game-page__button-group">
              <button className="iupac-game-page__button" onClick={startListening} disabled={isListening}>
                {isListening ? 'Đang lắng nghe...' : 'Bắt đầu phát âm'}
              </button>
              <button className="iupac-game-page__button" onClick={playSampleAudio}>
                Phát âm mẫu
              </button>
            </div>
            {accuracy !== null && (
              <p className="iupac-game-page__accuracy">Độ chính xác: {accuracy}%</p>
            )}
            <button className="iupac-game-page__next-button" onClick={() => selectRandomCompound()}>
              Hợp chất tiếp theo
            </button>
          </div>
        ) : (
          <p>Không có hợp chất nào. Vui lòng tạo mới danh sách.</p>
        )}
        <button className="iupac-game-page__button" onClick={generateCompounds} disabled={loading}>
          Tạo danh sách hợp chất mới
        </button>
      </div>
    </>
  );
}

export default IUPACPronunciationGame;
