// components/CommentSkeleton.js

import React from "react";

const CommentSkeleton = ({ nested = false }) => {
  return (
    <div className={`flex gap-4 ${nested ? "ml-8" : ""} py-4 border-b border-gray-200`}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>

      {/* Comment Content */}
      <div className="flex-1 space-y-3">
        {/* Name and time */}
        <div className="flex gap-3 items-center">
          <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-12 h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Comment Text */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Action Buttons (like, reply) */}
        <div className="flex gap-4 mt-2">
          <div className="w-10 h-3 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-12 h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Nested Comments */}
        <div className="space-y-4">
          <CommentSkeleton nested />
          <CommentSkeleton nested />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
