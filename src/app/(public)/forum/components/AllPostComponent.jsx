"use client";

import SinglePostCard from "@/components/home/SinglePostCard";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Divider, Input, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { useRouter } from "next/navigation";
import useMessageToast from "@/hooks/useMessageToast";
import { createPost } from "./_action";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { getCookie } from "cookies-next";

const AllPostComponent = ({ allPost, categoryItem }) => {
  const { contextHolder, showMessage, closeMessage } = useMessageToast();
  const [showPostModal, setShowPostModal] = useState(false);
  const { user } = useUserContext(); // Get user and logout function from UserContext
  const router = useRouter();
  const token = getCookie(USER_TOKEN);

  const handleOpenCreatePostModal = () => {
    if (user) {
      setShowPostModal(true);
    } else {
      router.push("/login?redirect=forum&showPostModal=true");
    }
  };

  const handleCreatePost = async (values) => {
    showMessage("loading", "Creating your post. Please Wait...");

    const response = await createPost(values, token);

    // Close the loading message immediately after the response
    closeMessage();

    if (response.error) {
      showMessage("error", response.message);
    } else {
      showMessage("success", response.message);
      router.refresh();

      setShowPostModal(close);
    }
  };

  const handleModalCancel = () => {
    setShowPostModal(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        <div className="px-2 border rounded bg-background1" onClick={handleOpenCreatePostModal}>
          <div className="p-0 md:p-6 flex items-center justify-between gap-4 h-[80px] md:h-[100px] lg:h-[120px]">
            {user?.profilePicture ? (
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center justify-center">
                  {/* Outer circle with border */}
                  <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden">
                    <Image
                      height={1000}
                      width={1000}
                      quality={100}
                      src={user?.profilePicture}
                      className="w-full h-full object-cover rounded-full"
                      alt="Profile picture"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-start gap-6">
                <div className="flex items-center justify-center">
                  {/* Outer circle with border */}
                  <div className="w-12 h-12 rounded-full border-2 border-teal-500 overflow-hidden">
                    <Image
                      height={1000}
                      width={1000}
                      quality={100}
                      src="https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full h-full object-cover rounded-full"
                      alt="Profile picture"
                    />
                  </div>
                </div>
              </div>
            )}

            <Input
              readOnly
              className="bg-[#FFFFFF] rounded-[12px] h-12"
              style={{ borderRadius: "26px" }}
              placeholder="Write your post"
            />
          </div>
        </div>

        <Divider />

        {/* Show Filter Option */}

        {allPost?.length ? (
          allPost?.map((post, index) => {
            return (
              <div className="w-full hover:bg-background1 duration-500 rounded-md border-b ">
                <SinglePostCard key={index} post={post} className="px-4" />
              </div>
            );
          })
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-md"
            style={{ backgroundColor: "#3fa397" }}
          >
            <svg
              className="w-16 h-16 text-white mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 14l6-6m2 2L9 4m6 14H5.5A2.5 2.5 0 013 15.5V5.5A2.5 2.5 0 015.5 3h10a2.5 2.5 0 012.5 2.5V15.5a2.5 2.5 0 01-2.5 2.5z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">No Posts Found</h2>
            <p className="text-white text-center">
              It looks like there are no posts available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>

      {/* Open Create Post Modal if user login */}
      {showPostModal ? (
        <Modal
          open={showPostModal}
          closable
          center
          footer={null}
          width={800}
          // onOk={handleOk}
          onCancel={handleModalCancel}
        >
          <CreatePostModal
            handleCreatePost={handleCreatePost}
            categoryItem={categoryItem}
            closeModal={handleModalCancel}
          />
        </Modal>
      ) : null}

      {contextHolder}
    </div>
  );
};

export default AllPostComponent;
