import React from 'react';
import '../Chapter2/Chapter2cauhoi.css';

function formatSuperscript(text) {
  const parts = text.split(/(\d+)/g);
  return parts.map((part, index) => {
    if (!isNaN(part)) {
      return <sup key={index} className="supscript" style={{ verticalAlign: '0.05em', fontSize: 'smaller' }}>{part}</sup>;
    }
    return part;
  });
}

export default formatSuperscript;