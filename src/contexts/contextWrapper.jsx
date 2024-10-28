"use client";

import React from "react";
import { UserProvider } from "./UserContextProvider";

const ContextWrapper = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default ContextWrapper;
