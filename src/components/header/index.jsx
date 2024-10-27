"use client";

import React from "react";
import Container from "../common/container";
import Icons from "../../../public/assets/icon";
import Image from "next/image";
import { Divider, Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ children }) => {
  const router = useRouter();
  const menus = [
    { name: "Home", link: "/" },
    { name: "Forum", link: "" },
    { name: "Who We Are", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  return (
    <div className="bg-primary py-[20px] h-[88px]">
      <Container className="">
        <div className="flex flex-row items-center justify-between h-full">
          {/* Icons part */}
          <div className="flex items-end gap-12">
            <Image src={Icons.iconWhite} height={1000} width={1000} className="h-[30px] w-[105px]" />

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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
