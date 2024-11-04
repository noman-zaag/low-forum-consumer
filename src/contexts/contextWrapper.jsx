"use client";

import React from "react";
import { UserProvider } from "./UserContextProvider";
import { UiContextProvider } from "./UiContextProvider/uiContextProvider";
import { CommentContextProvider } from "./CommentContextProvider";

const ContextWrapper = ({ children }) => {
  return (
    <UiContextProvider>
      <UserProvider>
        <CommentContextProvider>{children}</CommentContextProvider>
      </UserProvider>
      ;
    </UiContextProvider>
  );
};

export default ContextWrapper;
