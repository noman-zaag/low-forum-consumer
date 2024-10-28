import React from "react";

const VerifyOtpLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-scr bg-white my-[80px] animate-pulse">
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-gray-200 text-black">
        <div className="flex justify-center h-6 bg-gray-200 rounded w-1/4 my-3"></div>
        <div className="w-full flex justify-center pb-16 pt-4 sm:pt-4">
          <div className="w-24 h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4 my-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full my-2"></div>
        </div>
        <div className="w-full flex flex-col gap-y-4 py-9">
          <div className="w-full flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/2 my-2"></div>
          </div>
          <div className="w-[43px] h-[41px] md:w-12 md:h-12 flex items-center justify-center leading-[18.23px] md:leading-[19.53px] bg-white rounded-sm border border-gray-200 "></div>
          <div className="w-full flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/2 my-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 my-2"></div>
          </div>
        </div>
        <button className="w-full flex justify-center items-center h-12 rounded-sm text-base font-semibold duration-300">
          <div className="w-full h-12 bg-gray-200 rounded"></div>
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpLoading;
