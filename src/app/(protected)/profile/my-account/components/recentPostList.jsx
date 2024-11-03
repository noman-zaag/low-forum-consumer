"use client";

import React from "react";
import SinglePost from "./singlePost";
import useUserPostData from "@/hooks/useUserPostHook";
import CustomPagination from "../../components/Pagination";

const RecentPostList = () => {
  const { userPost, loading, error } = useUserPostData("approved");

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-semibold test-xs sm:text-sm md:text-base xl:text-xl">Recent Approved Posts</p>
      <div>
        {/* Post lists */}
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
        )}
      </div>

      {/* <CustomPagination current={1} total={100} onChange={() => {}} /> */}
    </div>
  );
};

export default RecentPostList;
