import React, { createContext, useState } from 'react';

export const ThemeColorContext = createContext();

export const ThemeColorProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState({
    main: '#5D5FEF',
    sub: '#C1BEFF',
    point: '#FF5972',
  });

  return (
    <ThemeColorContext.Provider value={themeColor}>
      {children}
    </ThemeColorContext.Provider>
  );

}