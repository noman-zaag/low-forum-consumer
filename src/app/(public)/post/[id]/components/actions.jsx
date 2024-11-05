"use client";

import { USER_TOKEN } from "@/constant/cookiesKeys";
import { useCommentContext } from "@/contexts/CommentContextProvider";
import { Divider } from "antd";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";

const Actions = ({ comment, handleEdit, handleAddReply }) => {
  const { user } = useCommentContext();
  const { handleDeleteComment, handleLikeDislikeComment, postId } = useCommentContext();
  const token = getCookie(USER_TOKEN);
  const router = useRouter();

  const handleLike = () => {
    if (user && token) {
      handleLikeDislikeComment(comment?._id);
    } else {
      router.push(`/login?redirect=/post/${postId}`);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center cursor-pointer" onClick={handleLike}>
        <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
        <p className="font-medium">{comment?.likesCount || 0}</p>
        <p className="text-text_secondary">Likes</p>
      </div>

      <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

      <div className="flex gap-2 items-center cursor-pointer" onClick={handleAddReply}>
        <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
        <p className="font-medium">{comment?.repliesCount || 0}</p>
        <p className="text-text_secondary">Replies</p>
      </div>

      {user?._id === comment?.commentAuthor && (
        <>
          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <div className="flex gap-2 items-center cursor-pointer" onClick={handleEdit}>
            <CiEdit />
            <p className="text-text_secondary">Edit</p>
          </div>

          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <div className="flex gap-2 items-center cursor-pointer" onClick={() => handleDeleteComment(comment?._id)}>
            <p className="text-red-500">Delete</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Actions;
