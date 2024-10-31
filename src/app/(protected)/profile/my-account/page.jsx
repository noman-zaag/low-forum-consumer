"use client";

import React from "react";
import ImageUpload from "./components/imageUploader";
import { useUserContext } from "@/contexts/UserContextProvider";
import RecentPostList from "./components/recentPostList";
import { MdModeEditOutline } from "react-icons/md";

const MyAccountPage = () => {
  const { user } = useUserContext();

  const countState = [
    { name: "Posts", value: user?.postsCount },
    { name: "Comments", value: user?.commentsCount },
    { name: "Likes Received", value: user?.likesReceived },
    { name: "Likes Given", value: user?.likesGiven },
  ];

  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col gap-6">
      {/* image uploader section */}

      <div className="flex flex-col items-start justify-start gap-2 md:gap-4 lg:gap-4">
        <ImageUpload
          initialProfileImage={
            "https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <p className="font-semibold test-xs sm:text-sm md:text-base xl:text-xl">{user?.firstName}</p>
      </div>
      {/* Basic profile info */}
      <div className="flex flex-col md:flex-row items-start md:items-center lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-4">
          <p>
            Occupation : <span className="text-text_secondary">{user?.occupation}</span>
          </p>
          <p>
            Email: <span className="text-text_secondary">{user?.primaryEmail}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p>
            Specialty:{" "}
            <span className="py-2 px-3 border border-primary bg-background1 text-primary rounded-full">
              {user?.legalSpecialty}
            </span>
          </p>

          <p>
            Location: <span className="text-text_secondary">{user?.location || "asdfasdfsdaasdf"}</span>
          </p>
        </div>

        <div>
          <button className="flex gap-3 items-center bg-primary text-white px-6 py-3 rounded-full font-semibold">
            <span>
              <MdModeEditOutline className="h-5 w-5 text-white" />
            </span>
            <span>Edit Info</span>
          </button>
        </div>
      </div>

      {/* counting status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-3">
        {countState?.map((count, index) => {
          return (
            <div className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1">
              <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{count.value}</span>
              <span className="text-text_secondary">{count.name}</span>
            </div>
          );
        })}
      </div>

      {/* See recent Post */}
      <RecentPostList />
    </div>
  );
};

export default MyAccountPage;
