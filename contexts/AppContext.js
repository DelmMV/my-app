import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [counter, setCounter] = useState(null);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState(null);

  return (
    <AppContext.Provider
      value={{ item, setItem, counter, setCounter, value, setValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
