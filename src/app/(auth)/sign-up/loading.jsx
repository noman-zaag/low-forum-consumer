import React from "react";

const SignUpLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 my-12 animate-pulse">
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="w-[192px] h-[60px] bg-gray-200 rounded"></div>
        </div>

        <div className="h-5 bg-gray-200 rounded w-1/3 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex flex-col gap-5">
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="h-10 bg-gray-200 rounded mb-2"></div>

        <div className="h-3 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default SignUpLoading;
