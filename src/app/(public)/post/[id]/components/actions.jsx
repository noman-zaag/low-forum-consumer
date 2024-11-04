"use client";

import { useCommentContext } from "@/contexts/CommentContextProvider";
import { Button, Divider } from "antd";
import Image from "next/image";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Actions = ({ comment, handleEdit, handleAddReply }) => {
  const { user } = useCommentContext();
  const { handleDeleteComment } = useCommentContext();

  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center">
        <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
        <p className="font-medium">213</p>
        <p className="text-text_secondary">Likes</p>
      </div>

      <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

      <div className="flex gap-2 items-center" onClick={handleAddReply}>
        <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
        <p className="font-medium">{comment?.repliesCount}</p>
        <p className="text-text_secondary">Replies</p>
      </div>

      <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

      <div className="flex gap-2 items-center" onClick={handleEdit}>
        <CiEdit />
        <p className="text-text_secondary">Edit</p>
      </div>

      <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

      <div className="flex gap-2 items-center" onClick={() => handleDeleteComment(comment?._id)}>
        <p className="text-red-500">Delete</p>
      </div>
    </div>
  );
};

export default Actions;
