import Container from "@/components/common/container";
import React from "react";

const ProfileLoading = () => {
  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col gap-6 animate-pulse">
      {/* Image uploader section */}
      <div className="flex flex-col items-start justify-start gap-2 md:gap-4 lg:gap-4">
        <div className="h-32 w-32 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
      </div>

      {/* Basic profile info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
        </div>
        <div className="flex flex-col gap-1 mt-2 md:mt-0">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded-full mt-2 md:mt-0"></div>
      </div>

      {/* Counting status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* See recent Post */}
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
    </div>
  );
};

export default ProfileLoading;
