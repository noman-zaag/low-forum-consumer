"use client";

import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const SingleRelatedPost = ({ post }) => {
  return (
    <Link href={`/post/${post?._id}`}>
      <div className="border-b py-5 flex flex-col gap-2">
        <p className="text-xs sm:text-sm  text-text_secondary font-normal">
          {format(new Date(post?.createdAt), "PPP")}
        </p>

        <h1 className="font-semibold text-xs sm:text-sm md:text-md lg:text-xl">{post?.title}</h1>

        <p className="text-primary text-sm font-medium">{post?.categoryName}</p>
      </div>
    </Link>
  );
};

export default SingleRelatedPost;
