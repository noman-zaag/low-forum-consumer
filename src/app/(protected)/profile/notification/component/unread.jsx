"use Client";

import React, { useEffect, useState } from "react";
import { NOTIFICATION } from "@/constant/apiUrls";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import axios from "axios";
import { getCookie } from "cookies-next";
import { SingleNotification } from "../page";
import { Spin } from "antd";
import { useNotificationContext } from "@/contexts/NotificationContextProvider/notificationContext";

const UnreadNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { markAll } = useNotificationContext();
  const token = getCookie(USER_TOKEN);

  const fetchUnreadNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${NOTIFICATION}?status=unread`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.status === 200) {
        setNotifications(response.data.docs);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  // Clear notifications when markAll becomes true
  useEffect(() => {
    if (markAll) {
      setNotifications([]);
    }
  }, [markAll]);

  const notFound = (
    <div
      className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "#3fa397" }}
    >
      <svg
        className="w-16 h-16 text-white mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 14l6-6m2 2L9 4m6 14H5.5A2.5 2.5 0 013 15.5V5.5A2.5 2.5 0 015.5 3h10a2.5 2.5 0 012.5 2.5V15.5a2.5 2.5 0 01-2.5 2.5z"
        ></path>
      </svg>
      <h2 className="text-xl font-semibold text-white mb-2">No Posts Found</h2>
      <p className="text-white text-center">
        It looks like there are no posts available at the moment. Please check back later.
      </p>
    </div>
  );

  return (
    <div>
      <Spin fullscreen spinning={loading} />

      {notifications && notifications.length > 0
        ? notifications?.map((notification, index) => {
            return (
              <div key={index}>
                <SingleNotification notification={notification} />
              </div>
            );
          })
        : notFound}
    </div>
  );
};

export default UnreadNotifications;
