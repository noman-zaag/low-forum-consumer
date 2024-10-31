import Container from "@/components/common/container";
import React from "react";

const ProfileLoading = () => {
  return (
    <Container>
      <div className="py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-4 border bg-gray-200 rounded-lg md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none animate-pulse">
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="flex items-center justify-start gap-6">
                <div className="w-10 h-10 rounded-full border-2 border-gray-400 overflow-hidden"></div>
                <div className="w-24 h-4 bg-gray-400 rounded"></div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
                  <div className="flex gap-3 items-center">
                    <div className="h-4 w-4 bg-gray-400 rounded"></div>
                    <div className="font-medium text-base text-gray-400">My Profile</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
                  <div className="flex gap-3 items-center">
                    <div className="h-4 w-4 bg-gray-400 rounded"></div>
                    <div className="font-medium text-base text-gray-400">My Post</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
                  <div className="flex gap-3 items-center">
                    <div className="h-4 w-4 bg-gray-400 rounded"></div>
                    <div className="font-medium text-base text-gray-400">Notification</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
                  <div className="flex gap-3 items-center">
                    <div className="h-4 w-4 bg-gray-400 rounded"></div>
                    <div className="font-medium text-base text-red-500">Logout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 border rounded-tr-lg rounded-br-lg animate-pulse">children</div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileLoading;
