"use client";

import React from "react";
import { UserProvider } from "./UserContextProvider";
import { UiContextProvider } from "./UiContextProvider/uiContextProvider";
import { CommentContextProvider } from "./CommentContextProvider";
import { NotificationContextProvider } from "./NotificationContextProvider/notificationContext";

const ContextWrapper = ({ children }) => {
  return (
    <UiContextProvider>
      <UserProvider>
        <CommentContextProvider>
          <NotificationContextProvider>{children}</NotificationContextProvider>
        </CommentContextProvider>
      </UserProvider>
      ;
    </UiContextProvider>
  );
};

export default ContextWrapper;
