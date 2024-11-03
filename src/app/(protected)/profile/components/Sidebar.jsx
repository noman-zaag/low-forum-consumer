"use client";

import React from "react";
import { useUserContext } from "@/contexts/UserContextProvider";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { VIEW_IMAGE } from "@/constant/apiUrls";

const Sidebar = () => {
  const { user, logout } = useUserContext();
  const pathname = usePathname();

  return (
    <div className="lg:col-span-4 border bg-background1 rounded-lg md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none">
      <div className="px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-start gap-6">
          {/* Outer circle with border */}
          <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden">
            <Image
              height={1000}
              width={1000}
              quality={100}
              src={`${VIEW_IMAGE}${user?.profilePicture}`}
              className="w-full h-full object-cover rounded-full"
              alt="Profile picture"
            />
          </div>

          <p>{user?.firstName}</p>
        </div>

        <div className="flex flex-col w-full">
          <Link href={`/profile/my-account`}>
            <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <RiUserLine className={`text-text_secondary h-4 w-4`} />
                <p className="font-medium text-base text-text_secondary">My Profile</p>
              </div>
              {pathname?.includes("/profile/my-account") && <FaCheckCircle className={`text-primary`} />}
            </div>
          </Link>

          <Link href={`/profile/my-post`}>
            <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <IoDocumentTextOutline className={`text-text_secondary h-4 w-4`} />
                <p className="font-medium text-base text-text_secondary">My Post</p>
              </div>
              {pathname?.includes("/my-post") && <FaCheckCircle className={`text-primary`} />}
            </div>
          </Link>

          <Link href={`/profile/notification`}>
            <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <IoNotificationsOutline className={`text-text_secondary h-4 w-4`} />
                <p className="font-medium text-base text-text_secondary">Notification</p>
              </div>
              {pathname?.includes("/profile/notification") && <FaCheckCircle className={`text-primary`} />}
            </div>
          </Link>

          <div className="flex gap-3 p-3 pl-0 items-center justify-between w-full" onClick={logout}>
            <div className="flex gap-3 items-center">
              <RxExit className={`text-red-500 h-4 w-4`} />
              <p className="font-medium text-base text-red-500">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
