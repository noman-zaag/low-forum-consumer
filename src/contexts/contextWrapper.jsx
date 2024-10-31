"use client";

import React from "react";
import { UserProvider } from "./UserContextProvider";
import { UiContextProvider } from "./UiContextProvider/uiContextProvider";

const ContextWrapper = ({ children }) => {
  return (
    <UiContextProvider>
      <UserProvider>{children}</UserProvider>;
    </UiContextProvider>
  );
};

export default ContextWrapper;
