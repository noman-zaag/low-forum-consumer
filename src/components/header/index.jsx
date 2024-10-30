"use client";

import React from "react";
import Container from "../common/container";
import Icons from "../../../public/assets/icon";
import Image from "next/image";
import { Divider, Input } from "antd";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContextProvider";

const Header = ({ children }) => {
  const router = useRouter();
  const { user } = useUserContext(); // Get user and logout function from UserContext
  const menus = [
    { name: "Home", link: "/" },
    { name: "Forum", link: "/forum" },
    { name: "Who We Are", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  const getIntoHome = () => {
    router.push("/");
  };

  // console.log(user);

  return (
    <div className="bg-primary py-[20px] h-[88px]">
      <Container className="">
        <div className="flex flex-row items-center justify-between h-full">
          {/* Icons part */}
          <div className="flex items-end gap-12">
            <Image
              alt="logo"
              src={Icons.iconWhite}
              height={1000}
              width={1000}
              className="h-[30px] w-[105px] cursor-pointer"
              onClick={getIntoHome}
            />

            <div className="hidden lg:flex flex-row gap-4 text-white">
              {menus.map((menu, index) => {
                return (
                  <Link href={menu.link} className="text-sm font-medium cursor-pointer" key={index}>
                    {menu.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* search part */}
          <div className="flex items-center justify-center gap-4">
            <div>
              <Input
                placeholder="Search here..."
                prefix={
                  <div className="px-2">
                    <IoSearchOutline className="text-white w-4 h-4 px-" />
                  </div>
                }
                className="rounded max-w-[300px] h-[48px] p-4 bg-[#649695] placeholder-white text-sm border-none"
                style={{ backgroundColor: " #649695", color: "#fff", border: "none" }}
              />
            </div>
            <Divider type="vertical" className="h-[40px] bg-[#649695]" style={{ height: "20px" }} />

            {user ? (
              user?.profilePicture ? (
                <div className="flex items-center justify-center gap-6">
                  <Image
                    src="/assets/icon/notification_icon.svg"
                    height={100}
                    width={100}
                    className="h-5 w-5"
                    quality={100}
                    alt="Notification icon"
                  />
                  <div
                    className="flex items-center justify-center h-screen"
                    onClick={() => router.push("/profile/my-account")}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src={user?.profilePicture}
                        className="w-full h-full object-cover rounded-full"
                        alt="Profile picture"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <Image
                    src="/assets/icon/notification_icon.svg"
                    height={100}
                    width={100}
                    className="h-5 w-5"
                    quality={100}
                    alt="Notification icon"
                  />
                  <div
                    className="flex items-center justify-center h-screen"
                    onClick={() => router.push("/profile/my-account")}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src="https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="w-full h-full object-cover rounded-full"
                        alt="Profile picture"
                      />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="hidden md:flex items-center justify-center gap-4">
                <button
                  className="py-2 px-0 text-white rounded w-[101px] h-[48px] font-semibold"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </button>
                <button
                  className="border p- text-white rounded w-[101px] h-[48px] font-semibold"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
