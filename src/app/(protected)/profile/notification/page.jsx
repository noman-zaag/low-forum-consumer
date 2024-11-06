"use client";

import { useNotificationContext } from "@/contexts/NotificationContextProvider/notificationContext";
import { Divider } from "antd";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import UnreadNotifications from "./component/unread";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotificationPage = () => {
  const { notifications, markAllAsRead } = useNotificationContext();
  const [tabValue, setTabValue] = useState(1);

  // console.log(notifications, "notification...");

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
    <div className="p-12">
      <div className="flex flex-col mb-8">
        <h1 className="font-medium sm:text-sm  md:text-xl lg:text-2xl">Notifications</h1>
        <p className="text-text_secondary font-normal text-xs sm:text-sm md:text-lg lg:text-base">
          Stay updated with your latest notification
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center justify-start">
          <button onClick={() => setTabValue(1)} className={`${tabValue === 1 ? "text-primary font-semibold" : ""}`}>
            All
          </button>
          <button onClick={() => setTabValue(2)} className={`${tabValue === 2 ? "text-primary font-semibold" : ""}`}>
            Unread
          </button>
        </div>

        <button className="text-primary" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>
      <Divider />

      {tabValue === 1 ? (
        notifications && notifications.length > 0 ? (
          notifications?.map((notification, index) => {
            return (
              <div key={index}>
                <SingleNotification notification={notification} />
              </div>
            );
          })
        ) : (
          notFound
        )
      ) : (
        <UnreadNotifications />
      )}
    </div>
  );
};

export default NotificationPage;

export const SingleNotification = ({ notification }) => {
  const router = useRouter();
  const { markNotificationAsRead } = useNotificationContext();

  const handleRoute = () => {
    markNotificationAsRead(notification?._id);

    router.push(`/post/${notification?.postId}`);
  };

  return (
    <div onClick={handleRoute}>
      <div className="p-6 border rounded-md flex items-center justify-between mb-5 bg-background1">
        <p className="text-black text-sm">{notification?.message}</p>
        <p className="text-text_secondary text-sm">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};
