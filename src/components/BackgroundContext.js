import React, { createContext, useState } from 'react';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState(null);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundContext;