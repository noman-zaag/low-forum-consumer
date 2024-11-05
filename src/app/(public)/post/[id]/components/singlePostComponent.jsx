"use client";

import React, { useEffect, useState } from "react";
import useMessageToast from "@/hooks/useMessageToast";
import { Divider, Input, Popover } from "antd";
import { format } from "date-fns";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "next-share";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLink } from "react-icons/md";
import { likePost } from "@/services/SinglePost";
import { getCookie } from "cookies-next";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { useUserContext } from "@/contexts/UserContextProvider";
import Comments from "./comments";
import { useCommentContext } from "@/contexts/CommentContextProvider";
import CommentSkeleton from "./CommentSkeleton";

const SinglePostComponent = ({ singlePost }) => {
  const [postUrl, setPostUrl] = useState("");
  const [like, setLike] = useState(singlePost?.likesCount);
  const [openSharePopup, setOpenSharePopup] = useState(false);
  const { user } = useUserContext();
  const { showMessage, contextHolder, closeMessage } = useMessageToast();
  const { fetchComments, comments, setPostId, handleCreateComment, fetchCommentLoading } = useCommentContext();
  const [commentContent, setCommentContent] = useState("");

  const token = getCookie(USER_TOKEN);

  useEffect(() => {
    // Check if the window object is available (client-side only)
    if (typeof window !== "undefined") {
      // Get the base URL from the window location
      setPostUrl(`${window.location.protocol}//${window.location.host}/post/${singlePost?._id}`);
    }

    setPostId(singlePost?._id);
    fetchComments(singlePost?._id);
  }, []);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      // Use navigator.clipboard.writeText if supported and on a secure context (https)
      try {
        await navigator.clipboard.writeText(text);
        showMessage("success", "This post is successfully copied to the clipboard!");
      } catch (error) {
        console.error("Failed to copy text to clipboard:", error);
      }
    } else {
      // Fallback for unsupported browsers or insecure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
      textArea.style.opacity = "0"; // Make it invisible
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy"); // Still works as a fallback
        console.log("Text copied to clipboard");
      } catch (error) {
        console.error("Failed to copy text:", error);
      }

      document.body.removeChild(textArea);
    }
  };

  const shareLink = (
    <div className="flex flex-col gap-3">
      <div
        onClick={() => copyToClipboard(postUrl)}
        className="flex flex-row justify-start items-center gap-3 border-b py-2 cursor-pointer text-text_secondary hover:text-black"
      >
        <MdLink className="h-5 w-5" />
        <span>Copy Link</span>
      </div>

      <TwitterShareButton
        url={postUrl}
        title={singlePost?.title}
        hashtag={`${singlePost?.description} ${singlePost?.categoryName}` || ""}
      >
        <div className="flex flex-row justify-start items-center gap-3 cursor-pointer text-text_secondary hover:text-black">
          <FaXTwitter className="h-5 w-5" />
          <span>Share on X</span>
        </div>
      </TwitterShareButton>

      <FacebookShareButton
        url={postUrl}
        quote={`next-share is a social share buttons for your next React apps.`}
        hashtag={`#${singlePost?.categoryName}`}
      >
        <div className="flex flex-row justify-start items-center gap-3  cursor-pointer text-text_secondary hover:text-black">
          <FaFacebook className="h-5 w-5" />
          <span>Share on Facebook</span>
        </div>
      </FacebookShareButton>

      <LinkedinShareButton
        url={postUrl}
        quote={singlePost?.title}
        content={`${singlePost?.description} ${singlePost?.categoryName}` || ""}
      >
        <div className="flex flex-row justify-start items-center gap-3 cursor-pointer text-text_secondary hover:text-black">
          <FaLinkedin className="h-5 w-5" />
          <span>Share on LinkedIn</span>
        </div>
      </LinkedinShareButton>
    </div>
  );

  const handleLike = async (event) => {
    event.stopPropagation();
    if (user && token) {
      // make like
      const likeRes = await likePost(singlePost?._id, "Post", token);

      if (likeRes.error) {
        showMessage("error", likeRes.message);
      } else {
        if (likeRes?.isDelete) {
          // for unlike.. isDeleted === true means unlike
          setLike((ps) => ps - 1);
        } else {
          setLike((ps) => ps + 1);
        }
      }
    } else {
      // redirect to login page
      router.push(`/login?redirect=/post/${post?._id}`);
    }
  };

  const handleOpenSharePopup = (newOpen) => {
    setOpenSharePopup(newOpen);
  };

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
          <div className="flex gap-2 items-center cursor-pointer" onClick={handleLike}>
            <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/like_icon.svg"} />
            <p className="font-medium">{like}</p>
            <p className="text-text_secondary text-sm ">Likes</p>
          </div>

          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <div className="flex gap-2 items-center">
            <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
            <p className="font-medium">{singlePost?.commentsCount}</p>
            <p className="text-text_secondary text-sm ">Comments</p>
          </div>

          <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

          <Popover
            placement="bottom"
            content={shareLink}
            title=""
            trigger="click"
            open={openSharePopup}
            onOpenChange={handleOpenSharePopup}
          >
            <div className="flex gap-2 items-center">
              <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/share_icon.svg"} />
              <p className="text-text_secondary text-sm hidden sm:block">Share</p>
            </div>
          </Popover>
        </div>
      </div>

      {/* Comment section */}
      <div className="mb-4 p-4 rounded-lg bg-gray-100 text-gray-700">
        <p className="text-lg font-semibold">Join the Conversation</p>
        <p className="mt-2 text-sm">
          We value your insights! Share your thoughts, ask questions, or start a discussion in the comments below.
          Please keep it respectful and constructive, as we aim to build a positive community experience for everyone.
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-5 items-start">
          <Input.TextArea
            value={commentContent}
            style={{ height: 150 }}
            placeholder="Write your comment"
            onChange={(e) => {
              e.preventDefault();
              setCommentContent(e.target.value);
            }}
          />

          <button
            className="mb-5 p-3 bg-primary text-white rounded-md"
            onClick={async () => {
              const status = await handleCreateComment(singlePost?._id, commentContent);

              if (status === 200) {
                setCommentContent("");
              }
            }}
          >
            Comment
          </button>
        </div>

        {fetchCommentLoading ? <CommentSkeleton /> : <Comments comments={comments} />}
      </div>

      {contextHolder}
    </div>
  );
};

export default SinglePostComponent;
