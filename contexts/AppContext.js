import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [counter, setCounter] = useState(null);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState("yandex-maps");

  return (
    <AppContext.Provider
      value={{
        item,
        setItem,
        counter,
        setCounter,
        value,
        setValue,
        value2,
        setValue2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
