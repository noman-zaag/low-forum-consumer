"use client";

import { USER_TOKEN } from "@/constant/cookiesKeys";
import { useCommentContext } from "@/contexts/CommentContextProvider";
import { Divider } from "antd";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const Actions = ({ comment, handleEdit, handleAddReply }) => {
  const { user } = useCommentContext();
  const { handleDeleteComment, handleLikeDislikeComment, postId, likedCommentList, getLikedPostList } =
    useCommentContext();
  const token = getCookie(USER_TOKEN);
  const router = useRouter();

  const handleLike = async () => {
    if (user && token) {
      await handleLikeDislikeComment(comment?._id, comment?.commentAuthor);
      await getLikedPostList("Comment");
    } else {
      router.push(`/login?redirect=/post/${postId}`);
    }
  };
  const idToCheck = comment?._id;
  const isLiked = likedCommentList?.includes(idToCheck);

  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center cursor-pointer w-20" onClick={handleLike}>
        {isLiked ? (
          <>
            <AiFillLike className="h-5 w-5 text-primary" />
            <p className="font-medium text-primary">{comment?.likesCount}</p>
            <p className="font-semibold text-sm text-primary ">Liked</p>
          </>
        ) : (
          <>
            <AiOutlineLike className="h-5 w-5" />
            <p className="font-medium ">{comment?.likesCount}</p>
            <p className="text-text_secondary text-sm font-semibold">Like</p>
          </>
        )}

        {/* <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
        <p className="font-medium">{comment?.likesCount || 0}</p>
        <p className="text-text_secondary">Likes</p> */}
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
