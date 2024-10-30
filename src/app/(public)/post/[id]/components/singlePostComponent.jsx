"use client";

import { Divider } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const SinglePostComponent = ({ singlePost }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* profile section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2">
        {/* name & image */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center">
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
          <p className="text-xs sm:text-sm font-normal text-post_text">{singlePost?.userName}</p>
        </div>
        <div className="hidden md:block">
          <Divider type="vertical" style={{ margin: 0, padding: 0, height: 20 }} />
        </div>

        <p className="text-primary text-sm font-medium">{singlePost?.categoryName}</p>

        <div className="hidden md:block">
          <Divider type="vertical" style={{ margin: 0, padding: 0, height: 20 }} />
        </div>

        <div>
          <p className="text-xs sm:text-sm font-normal text-text_secondary">
            {/* {format(new Date(singlePost?.createdAt), "PPP")} */}
            {singlePost?.createdAt ? format(new Date(singlePost.createdAt), "PPP") : "Date not available"}
          </p>
        </div>
      </div>

      {/* Post details */}
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-base sm:text-lg md:text-2xl lg:text-3xl">{singlePost?.title}</h1>
        <p className="text-text_secondary text-justify text-sm md:text-base">{singlePost?.description}</p>
      </div>

      <div>
        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
            <p className="font-medium">{singlePost?.likesCount}</p>
            <p className="text-text_secondary text-sm ">Likes</p>
          </div>

          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <div className="flex gap-2 items-center">
            <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
            <p className="font-medium">{singlePost?.commentsCount}</p>
            <p className="text-text_secondary text-sm ">Comments</p>
          </div>

          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <div className="flex gap-2 items-center">
            <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/share_icon.svg"} />
            <p className="text-text_secondary text-sm hidden sm:block">Share</p>
          </div>
        </div>
      </div>

      {/* Comment section */}
      <p>Comment section</p>
    </div>
  );
};

export default SinglePostComponent;
