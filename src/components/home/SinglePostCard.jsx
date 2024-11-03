"use client";

import React from "react";
import { Divider } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VIEW_IMAGE } from "@/constant/apiUrls";
const { format } = require("date-fns");

const SinglePostCard = ({ post, className }) => {
  const router = useRouter();

  function getFirst200Words(text) {
    const words = text.split(" "); // Split the text by spaces
    const isMoreThan30Words = words.length > 30; // Check if there are more than 30 words
    const first50Words = words.slice(0, 50).join(" "); // Get the first 200 words and join them back into a string

    return {
      text: first50Words,
      isMoreThan30Words: isMoreThan30Words,
    };
  }

  const handleGetSinglePost = () => {
    router.push(`/post/${post._id}`);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    console.log("like call", post._id);
  };

  const handleGoToProfilePage = (event) => {
    event.stopPropagation();
    router.push(`/public-profile/${post.authorId}`);
  };

  return (
    <div className={`py-3 flex flex-col gap-2 rounded duration-700 ${className} cursor-pointer`}>
      {/* user info */}
      <div className="flex items-center justify-start gap-2" onClick={handleGetSinglePost}>
        {/* name & image */}

        <div className="flex gap-2 items-center justify-center" onClick={handleGoToProfilePage}>
          <div className="flex items-center justify-center ">
            {/* Outer circle with border */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                height={1000}
                width={1000}
                quality={100}
                src={
                  post?.profilePicture ? VIEW_IMAGE + post?.profilePicture : `/assets/images/default_profile_image.svg`
                }
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
      <div className="flex flex-col gap-2" onClick={handleGetSinglePost}>
        <p className="text-primary text-sm font-medium">{post?.categoryName}</p>
        <h1 className="font-semibold text-xl ">{post?.title}</h1>
        <p className="text-text_secondary">
          <span className="text-sm">
            {getFirst200Words(post?.description).text}
            {getFirst200Words(post?.description).isMoreThan30Words ? "..." : null}
          </span>
          <span className="ml-2 whitespace-nowrap self-end cursor-pointer">Read More</span>
        </p>
      </div>

      {/* likes, comments, share */}
      <div className="flex items-center">
        <div className="flex gap-2 items-center" onClick={handleLike}>
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
