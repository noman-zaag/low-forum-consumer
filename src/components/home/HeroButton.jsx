"use client";

import Image from "next/image";
import React from "react";
import Icons from "../../../public/assets/icon";
import { useUserContext } from "@/contexts/UserContextProvider";
import { useRouter } from "next/navigation";

const HeroButton = () => {
  const router = useRouter();
  const { user } = useUserContext();

  const handleButtonClick = () => {
    if (user) {
      router.push("/forum");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex gap-3 items-center bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
    >
      <span>{user ? "Our Forum" : "Get Started"}</span>
      <span>
        <Image
          alt="hero button"
          src={Icons.heroButtonIcon}
          className="h-5 w-5"
          height="1000"
          width="1000"
          quality={100}
        />
      </span>
    </button>
  );
};

export default HeroButton;
