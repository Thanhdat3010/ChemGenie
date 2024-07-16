import React from 'react';
import '../Chapter2/Chapter2cauhoi.css';

function formatChemicalFormula(formula) {
  const parts = formula.split(/([A-Z][a-z]*)(\d*)/g);
  return parts.map((part, index) => {
    // Kiểm tra xem phần tử có chứa dấu cách không
    if (part.includes(' ')) {
      return part; // Trả về phần tử không được sub nếu chứa dấu cách
    }
    // Kiểm tra xem phần tử có phải là số không, và phải là phần tử thứ hai (số lẻ)
    if (!isNaN(part) && index % 2 === 1) { 
      return <span key={index} className="subscript">{part}</span>;
    }
    // Kiểm tra xem phần tử có phải là số không, và phải là phần tử đầu tiên (số chẵn) và không phải là số 1
    if (!isNaN(part) && index % 2 === 0 && parseFloat(part) !== 1) { 
      return <span key={index} className="subscript">{part}</span>;
    }
    return part;
  });
}

export default formatChemicalFormula;