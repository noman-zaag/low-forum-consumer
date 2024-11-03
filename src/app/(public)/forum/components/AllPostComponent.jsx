"use client";

import SinglePostCard from "@/components/home/SinglePostCard";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Divider, Input, Modal } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { useRouter } from "next/navigation";
import useMessageToast from "@/hooks/useMessageToast";
import { createPost } from "./_action";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { VIEW_IMAGE } from "@/constant/apiUrls";
import PostList from "./PostList";

const AllPostComponent = ({ allPost, categoryItem }) => {
  const { contextHolder, showMessage, closeMessage } = useMessageToast();
  const [showPostModal, setShowPostModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
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

  useEffect(() => {
    // Only execute this code on the client
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Get all `categoryId` values as an array
    const categoryIds = searchParams.getAll("categoryId");

    // Filter itemsArray to include only items with keys in filteredCategoryIds
    const filtered = categoryItem?.filter((item) => categoryIds.includes(item.key));
    setFilteredItems(filtered);

    // console.log({ filteredItems: filtered, categoryItem, categoryIds });
  }, [categoryItem]);

  // Remove a single filter from URL and state
  const handleRemoveFilter = (key) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    searchParams.delete("categoryId"); // Clear all categoryId params
    filteredItems
      .filter((item) => item.key !== key) // Keep only the items that aren't being removed
      .forEach((item) => searchParams.append("categoryId", item.key)); // Re-add remaining category IDs

    router.push(`/forum?${searchParams.toString()}`, undefined, { shallow: true });
    setFilteredItems((prev) => prev.filter((item) => item.key !== key)); // Update state
  };

  // Clear all filters from URL and state
  const handleClearAllFilters = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    searchParams.delete("categoryId"); // Remove all category filters from the URL
    router.push(`/forum?${searchParams.toString()}`, undefined, { shallow: true });
    setFilteredItems([]); // Clear all filters from state
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
                      src={` ${VIEW_IMAGE}${user?.profilePicture}`}
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

        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex flex-row flex-wrap items-center gap-4">
            {filteredItems?.map((category, index) => {
              return (
                <div key={index} className="rounded-md border border-primary p-[10px] flex gap-2 items-center">
                  <p className="text-primary text-sm">{category.label}</p>
                  <IoClose
                    className="text-primary h-5 w-5 cursor-pointer"
                    onClick={() => handleRemoveFilter(category.key)}
                  />
                </div>
              );
            })}
            {filteredItems?.length ? (
              <div className="rounded-md p-[10px] flex gap-2 items-center" onClick={handleClearAllFilters}>
                <p className="text-primary text-sm">Clear All</p>
                {/* <IoClose className="text-primary h-5 w-5 cursor-pointer" /> */}
              </div>
            ) : null}
          </div>
          {filteredItems?.length !== 0 ? (
            <p className="whitespace-nowrap p-[10px] text-base">{allPost?.length} posts</p>
          ) : null}
        </div>

        <div className="flex flex-col">
          {allPost?.length ? (
            <PostList posts={allPost} />
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
