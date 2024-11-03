"use client";

import SinglePostCard from "@/components/home/SinglePostCard";
import React from "react";

const PostList = ({ posts }) => {
  return (
    <div className="">
      {posts?.length
        ? posts.map((post, index) => {
            return (
              <div key={index} className="w-full hover:bg-background1 duration-500 rounded-md border-b">
                <SinglePostCard post={post} className="px-2" />
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default PostList;
