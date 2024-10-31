"use client";

import useUserPostData from "@/hooks/useUserPostHook";
import React, { useState } from "react";
import SinglePost from "../my-account/components/singlePost";

const MyPostPage = () => {
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState("");
  const { userPost, loading } = useUserPostData(status, 1, 10, tab);

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

  const data = (
    <div>
      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="animate-pulse p-4 border rounded bg-background1 flex flex-row items-center justify-between">
            <div className="line-clamp-1 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : userPost.length ? (
        <div className="flex flex-col gap-2">
          {userPost.map((post, index) => {
            return (
              <div key={index}>
                <SinglePost post={post} />
              </div>
            );
          })}
        </div>
      ) : (
        notFound
      )}
    </div>
  );

  const tabState = [
    {
      name: "All Posts",
      value: 0,
      status: "",
      component: data,
    },
    {
      name: "Approved Posts",
      value: 1,
      status: "approved",
      component: data,
    },
    { name: "Rejected Posts", value: 2, status: "rejected", component: data },
  ];

  return (
    <div className="p-12 flex flex-col gap-6">
      {/* tab component */}
      <div className={`grid grid-cols-3 items-center justify-between text-center`}>
        {tabState.map((singleTab, index) => {
          return (
            <div className="flex flex-col gap-6">
              {/* Tab component */}
              <div
                key={index}
                className={`text-center p-4 ${
                  singleTab.value === tab ? "border-b-4 border-primary text-primary" : "border-background1 border-b-2"
                }`}
                onClick={() => {
                  setTab(singleTab.value);
                  setStatus(singleTab.status);
                }}
              >
                <span>{singleTab.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {tabState.map((singleTab, index) => {
          return (
            <div className="flex flex-col gap-6 w-full" key={index}>
              {tab === singleTab.value && singleTab.component}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPostPage;
