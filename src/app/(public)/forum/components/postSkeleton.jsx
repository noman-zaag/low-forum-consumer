import React from "react";

const SkeletonPost = () => {
  return (
    <div className="py-3 flex flex-col gap-3 rounded cursor-pointer animate-pulse bg-white shadow-md p-4">
      {/* Header section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        {/* Name */}
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Footer section */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
