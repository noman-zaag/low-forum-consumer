"use client";

import { useNotificationContext } from "@/contexts/NotificationContextProvider/notificationContext";
import { formatDistanceToNow } from "date-fns";
import React from "react";

const NotificationPage = () => {
  const { notifications } = useNotificationContext();

  // console.log(notifications, "notification...");
  return (
    <div className="p-12">
      <h1 className="font-medium">Notifications</h1>

      {notifications?.map((notification, index) => {
        return (
          <div key={index}>
            <SingleNotification notification={notification} />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationPage;

const SingleNotification = ({ notification }) => {
  return (
    <div className="p-6 border rounded-md flex items-center justify-between mb-5 bg-background1">
      <p className="text-black text-sm">{notification?.message}</p>
      <p className="text-text_secondary text-sm">
        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};
