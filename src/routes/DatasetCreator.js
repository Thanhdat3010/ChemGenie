import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import magic from "../assets/magic-dust.png";
import { API_KEY } from '../config';
import * as pdfjsLib from 'pdfjs-dist';
import './DatasetCreator.css';
import * as XLSX from 'xlsx';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const DatasetCreator = () => {
  const [files, setFiles] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datasetTitle, setDatasetTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [numDatasets, setNumDatasets] = useState(5);
  const [progress, setProgress] = useState(0);

  const genAI = new GoogleGenerativeAI(API_KEY);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.some(file => !file.name.match(/\.(docx|pdf)$/))) {
      alert('Chỉ chấp nhận file định dạng .docx và .pdf');
      return;
    }
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    let cleanedText = result.value
      .replace(/\s+/g, ' ')
      .replace(/^\s*[\r\n]/gm, '')
      .replace(/[\r\n]+/g, '\n')
      .trim();

    return cleanedText;
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setExtractedText('');
  };

  const generateDatasets = async () => {
    if (files.length === 0) {
      alert('Vui lòng tải lên ít nhất một tệp');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const contents = await Promise.all(
        files.map(async (file) => {
          if (file.name.endsWith('.pdf')) {
            return await extractTextFromPDF(file);
          }
          return await extractTextFromWord(file);
        })
      );
      
      const combined = contents
        .filter(content => content.trim().length > 0)
        .join('\n\n=== Tài liệu mới ===\n\n');
      
      setExtractedText(combined);

      const batchSize = 20;
      const numberOfBatches = Math.ceil(numDatasets / batchSize);
      let allDatasets = [];

      for (let i = 0; i < numberOfBatches; i++) {
        const remainingSamples = numDatasets - (i * batchSize);
        const currentBatchSize = Math.min(batchSize, remainingSamples);

        const prompt = `Bạn là một chuyên gia trong lĩnh vực xây dựng dataset để huấn luyện mô hình LLM (fine-tune). 
        Hãy tạo ${currentBatchSize} mẫu dữ liệu training từ văn bản sau: ${combined}
        
        Yêu cầu:
        1. Tạo CHÍNH XÁC ${currentBatchSize} mẫu từ nội dung văn bản, không nhiều hơn không ít hơn
        2. Mỗi mẫu phải có 3 thành phần:
           - instruction: Câu hỏi hoặc yêu cầu
           - context: Ngữ cảnh hoặc thông tin liên quan từ văn bản
           - response: Câu trả lời mong muốn
        3. Câu hỏi phải đa dạng và có độ khó khác nhau
        4. Đảm bảo tính chính xác của thông tin
        5. Câu trả lời phải đầy đủ và logic
        6. QUAN TRỌNG: Các thuật ngữ hóa học phải được giữ nguyên danh pháp tiếng anh
        7. Câu hỏi phải được viết bằng tiếng việt
        8. Viết chỉ số dưới bằng ký tự Unicode trực tiếp (ví dụ: H₂O thay vì H<sub>2</sub>O)
        9. Đừng thêm ký hiệu gì đặc biệt như * mà chỉ sử dụng văn bản thuần túy (plain text)
        10. Mỗi mẫu phải khác biệt với các mẫu trước đó
        
        Trả về kết quả dưới dạng JSON với cấu trúc:
        [
          {
            "instruction": "câu hỏi/yêu cầu",
            "context": "ngữ cảnh từ văn bản",
            "response": "câu trả lời mong muốn"
          }
        ]`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const cleanText = response.text()
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        const batchDatasets = JSON.parse(cleanText);
        allDatasets = [...allDatasets, ...batchDatasets];

        setProgress(((i + 1) / numberOfBatches) * 100);
      }

      setDatasets(allDatasets);

    } catch (error) {
      console.error('Error generating datasets:', error);
      alert('Đã xảy ra lỗi khi tạo dataset');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const saveDatasetToJson = () => {
    const blob = new Blob([JSON.stringify(datasets, null, 2)], { type: 'application/json' });
    saveAs(blob, `${datasetTitle || 'dataset'}.json`);
  };

  const saveDatasetToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    const excelData = datasets.map((item, index) => ({
      'STT': index + 1,
      'Instruction': item.instruction,
      'Context': item.context,
      'Response': item.response
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    const columnWidths = [
      { wch: 5 },  // STT
      { wch: 40 }, // Instruction
      { wch: 40 }, // Context
      { wch: 40 }  // Response
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Dataset");
    XLSX.writeFile(workbook, `${datasetTitle || 'dataset'}.xlsx`);
  };

  const handleSaveDataset = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (!user) {
      alert('Bạn cần đăng nhập để lưu dataset.');
      return;
    }
  
    if (datasetTitle.trim() === '') {
      alert('Vui lòng nhập tiêu đề cho dataset.');
      return;
    }
  
    if (datasets.length === 0) {
      alert('Dataset đang trống.');
      return;
    }
  
    try {
      const userId = user.uid;
      const docRef = doc(db, 'datasets', `${datasetTitle}-${userId}`);
      await setDoc(docRef, { 
        userId, 
        title: datasetTitle, 
        data: datasets,
        createdAt: new Date().toISOString()
      });
      setModalOpen(true);
      setDatasetTitle('');
      setDatasets([]);
    } catch (error) {
      console.error('Error saving dataset:', error);
      alert('Đã xảy ra lỗi khi lưu dataset.');
    }
  };

  return (
    <div className="dataset-creator-container">
      <h2 className="dataset-creator-heading">Tạo Dataset cho LLM</h2>
      
      <div className="dataset-creator-config">
        <input
          type="text"
          value={datasetTitle}
          onChange={(e) => setDatasetTitle(e.target.value)}
          placeholder="Nhập tiêu đề cho dataset..."
          className="dataset-creator-title-input"
        />
        
        <div className="dataset-creator-count-wrapper">
          <label className="dataset-creator-count-label">Số lượng mẫu cần tạo:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={numDatasets}
            onChange={(e) => setNumDatasets(parseInt(e.target.value))}
            className="dataset-creator-count-input"
          />
        </div>
      </div>

      <div className="dataset-creator-upload">
        <input
          type="file"
          accept=".docx,.pdf"
          onChange={handleFileUpload}
          multiple
          className="dataset-creator-file-input"
        />
        
        {files.length > 0 && (
          <div className="dataset-creator-files-list">
            <h3 className="dataset-creator-files-heading">Danh sách file đã tải lên:</h3>
            {files.map((file, index) => (
              <div key={index} className="dataset-creator-file-item">
                <span>{file.name}</span>
                <button onClick={() => handleRemoveFile(index)} className="dataset-creator-close-btn">Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className="dataset-creator-generate-btn"
        onClick={generateDatasets}
        disabled={loading}
      >
        Tạo Dataset
      </button>

      {loading && (
        <div className="dataset-creator-loader">
          <img src={magic} alt="Loading..." className="dataset-creator-loading-icon" />
          <p>Đang tạo dataset, vui lòng chờ... ({Math.round(progress)}%)</p>
          <div className="dataset-creator-progress-bar">
            <div 
              className="dataset-creator-progress-fill" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      )}

      {datasets.length > 0 && (
        <div className="dataset-creator-preview">
          <h3>Dataset đã tạo:</h3>
          <div className="dataset-creator-list">
            {datasets.map((item, index) => (
              <div key={index} className="dataset-creator-item">
                <div className="dataset-creator-item-header">
                  <span className="dataset-creator-item-number">#{index + 1}</span>
                </div>
                <div className="dataset-creator-item-content">
                  <p><strong>Instruction:</strong> {item.instruction}</p>
                  <p><strong>Context:</strong> {item.context}</p>
                  <p><strong>Response:</strong> {item.response}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dataset-creator-actions">
            <button onClick={saveDatasetToExcel} className="dataset-creator-download-btn excel">
              <i className="fas fa-file-excel"></i>
              Tải xuống Excel
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="dataset-creator-modal">
          <div className="dataset-creator-modal-content">
            <p>Dataset đã được lưu thành công!</p>
            <button className="dataset-creator-close-btn" onClick={closeModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetCreator; 