import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [counter, setCounter] = useState(null);
  const [item, setItem] = useState(null);
  return (
    <AppContext.Provider value={{ item, setItem, counter, setCounter }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
