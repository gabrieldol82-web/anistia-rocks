"use client"

import { createContext, useContext, useState } from "react";

const ShowContext = createContext();

export const ShowProvider = ({ children }) => {
  const [currentShow, setCurrentShow] = useState(null);

  return (
    <ShowContext.Provider value={{ currentShow, setCurrentShow }}>
      {children}
    </ShowContext.Provider>
  );
};

export const useShow = () => useContext(ShowContext);
