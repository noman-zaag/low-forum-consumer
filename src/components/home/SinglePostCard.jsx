"use client";

import React from "react";
import { Divider } from "antd";
import Image from "next/image";
const { format } = require("date-fns");

const SinglePostCard = ({ post, className }) => {
  function getFirst200Words(text) {
    const words = text.split(" "); // Split the text by spaces
    const isMoreThan30Words = words.length > 30; // Check if there are more than 30 words
    const first50Words = words.slice(0, 50).join(" "); // Get the first 200 words and join them back into a string

    return {
      text: first50Words,
      isMoreThan30Words: isMoreThan30Words,
    };
  }

  return (
    <div className={`py-8 flex flex-col gap-2 rounded duration-700 border-b ${className}`}>
      {/* user info */}
      <div className="flex items-center justify-start gap-2">
        {/* name & image */}
        <div className="flex gap-2 items-center justify-center">
          <div className="flex items-center justify-center ">
            {/* Outer circle with border */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                height={1000}
                width={1000}
                // quality={100}
                src="https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover object-center rounded-full"
                alt="Profile picture"
              />
            </div>
          </div>
          <p className="text-xs sm:text-sm font-normal text-post_text">{post?.userName}</p>
        </div>
        <Divider type="vertical" style={{ margin: 0, padding: 0, height: 20 }} />
        <div>
          <p className="text-xs sm:text-sm font-normal text-text_secondary">{format(post.createdAt, "PPP")}</p>
        </div>
      </div>

      {/* post details */}
      <div className="flex flex-col gap-2">
        <p className="text-primary text-sm font-medium">{post?.categoryName}</p>
        <h1 className="font-semibold text-xl ">{post?.title}</h1>
        <p className="text-text_secondary">
          <span className="">
            {getFirst200Words(post?.description).text}
            {getFirst200Words(post?.description).isMoreThan30Words ? "..." : null}
          </span>
          <span className="ml-2 whitespace-nowrap self-end cursor-pointer">Read More</span>
        </p>
      </div>

      {/* likes, comments, share */}
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
          <p className="font-medium">{post?.likesCount}</p>
          <p className="text-text_secondary">Likes</p>
        </div>

        <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

        <div className="flex gap-2 items-center">
          <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
          <p className="font-medium">{post?.commentsCount}</p>
          <p className="text-text_secondary">Comments</p>
        </div>

        <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

        <div className="flex gap-2 items-center">
          <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/share_icon.svg"} />
          <p className="text-text_secondary">Share</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
