"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const UiContext = createContext(null);

// Custom hook to use the UiContext easily
export const useUiContext = () => {
  return useContext(UiContext);
};

// UiContextProvider component to provide UI design context
export const UiContextProvider = ({ children }) => {
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    setBlur(false);
  }, []);

  const handleSetBlur = () => {
    setBlur(!blur);
  };

  return <UiContext.Provider value={{ blur, handleSetBlur }}>{children}</UiContext.Provider>;
};
