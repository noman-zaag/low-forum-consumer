import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import useMessageToast from "@/hooks/useMessageToast"; // Custom toast hook for displaying messages
import { USER_INFO, USER_TOKEN } from "@/constant/cookiesKeys";
import { NOTIFICATION } from "@/constant/apiUrls";
import { useUserContext } from "../UserContextProvider";
import axios from "axios";
import { getSocket } from "@/utils/socket";

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { user: userFromContext } = useUserContext();
  const user_info = getCookie(USER_INFO);
  const userFromCookie = user_info ? JSON.parse(user_info) : null;
  const user = userFromContext || userFromCookie;
  const token = getCookie(USER_TOKEN);

  const getAllNotification = async () => {
    if (token) {
      try {
        const res = await axios.get(NOTIFICATION, {
          headers: { Authorization: token },
        });
        if (res?.status === 200) {
          setNotifications(res?.data?.docs);
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    }
  };

  useEffect(() => {
    if (token && user) {
      const socket = getSocket(); // Use the singleton socket instance
      if (!socket.connected) {
        socket.connect(); // Connect only if not already connected
      }

      const data = { userId: user?._id };
      socket.emit("user:connect-notification", JSON.stringify(data));

      socket.on("notification:get", (notification) => {
        console.log(notification, "notification");
        setNotifications((prev) => [notification, ...prev]);
      });

      socket.on("notification:count", (notification) => {
        console.log(notification, "notification count");
        setNotificationCount(notification?.unreadCount);
      });

      // Fetch initial notifications on component mount
      getAllNotification();

      // Cleanup listeners to avoid memory leaks
      return () => {
        socket.off("notification:get");
        socket.off("notification:count");
      };
    }
  }, [user, token]);

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId ? { ...notification, status: "read" } : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount, markAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
