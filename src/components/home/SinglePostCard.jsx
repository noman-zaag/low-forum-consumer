"use client";

import React, { useEffect, useState } from "react";
import { Divider, Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VIEW_IMAGE } from "@/constant/apiUrls";
import { useUserContext } from "@/contexts/UserContextProvider";
import { getCookie } from "cookies-next";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import useMessageToast from "@/hooks/useMessageToast";
import { likePost } from "@/services/SinglePost";
const { format } = require("date-fns");
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLink } from "react-icons/md";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, Xs } from "next-share";

const SinglePostCard = ({ post, className }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [like, setLike] = useState(post?.likesCount);
  const [openSharePopup, setOpenSharePopup] = useState(false);
  const [postUrl, setPostUrl] = useState("");

  const token = getCookie(USER_TOKEN);
  const { showMessage, contextHolder, closeMessage } = useMessageToast();

  function getFirst200Words(text) {
    const words = text.split(" "); // Split the text by spaces
    const isMoreThan30Words = words.length > 30; // Check if there are more than 30 words
    const first50Words = words.slice(0, 50).join(" "); // Get the first 200 words and join them back into a string

    return {
      text: first50Words,
      isMoreThan30Words: isMoreThan30Words,
    };
  }

  useEffect(() => {
    // Check if the window object is available (client-side only)
    if (typeof window !== "undefined") {
      // Get the base URL from the window location
      setPostUrl(`${window.location.protocol}//${window.location.host}/post/${post._id}`);
    }
  }, []);

  const handleGetSinglePost = () => {
    router.push(`/post/${post._id}`);
  };

  const handleLike = async (event) => {
    event.stopPropagation();
    if (user && token) {
      // make like
      const likeRes = await likePost(post?._id, "Post", token, post?.authorId);

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

  const handleGoToProfilePage = (event) => {
    event.stopPropagation();
    router.push(`/public-profile/${post.authorId}`);
  };

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
        title={post?.title}
        hashtag={`${post?.description} ${post?.categoryName}` || ""}
      >
        <div className="flex flex-row justify-start items-center gap-3 cursor-pointer text-text_secondary hover:text-black">
          <FaXTwitter className="h-5 w-5" />
          <span>Share on X</span>
        </div>
      </TwitterShareButton>

      <FacebookShareButton
        url={postUrl}
        quote={`next-share is a social share buttons for your next React apps.`}
        hashtag={`#${post?.categoryName}`}
      >
        <div className="flex flex-row justify-start items-center gap-3  cursor-pointer text-text_secondary hover:text-black">
          <FaFacebook className="h-5 w-5" />
          <span>Share on Facebook</span>
        </div>
      </FacebookShareButton>

      <LinkedinShareButton
        url={postUrl}
        quote={post?.title}
        content={`${post?.description} ${post?.categoryName}` || ""}
      >
        <div className="flex flex-row justify-start items-center gap-3 cursor-pointer text-text_secondary hover:text-black">
          <FaLinkedin className="h-5 w-5" />
          <span>Share on LinkedIn</span>
        </div>
      </LinkedinShareButton>
    </div>
  );

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
          <p className="font-medium">{like}</p>
          <p className="text-text_secondary">Likes</p>
        </div>

        <Divider type="vertical" style={{ margin: 10, padding: 0, height: 20 }} />

        <div className="flex gap-2 items-center">
          <Image height={20} width={20} alt="like icon" quality={100} src={"/assets/icon/comment_icon.svg"} />
          <p className="font-medium">{post?.commentsCount}</p>
          <p className="text-text_secondary">Comments</p>
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
            <p className="text-text_secondary">Share</p>
          </div>
        </Popover>
      </div>

      {contextHolder}
    </div>
  );
};

export default SinglePostCard;
