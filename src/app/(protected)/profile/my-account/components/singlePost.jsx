"use client";

import { useUiContext } from "@/contexts/UiContextProvider/uiContextProvider";
import { Badge, Modal, Popover } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const SinglePost = ({ post }) => {
  const status = post?.status;
  const [showRejectedReason, setShowRejectedReason] = useState(false);
  const { handleSetBlur } = useUiContext();

  const handleOpenModal = () => {
    setShowRejectedReason(true);
    handleSetBlur(); // Apply blur when the modal opens
  };

  const handleCloseModal = () => {
    setShowRejectedReason(false);
    handleSetBlur(); // Remove blur when the modal closes
  };

  const content = <div>{post?.rejectionReason || "Rejection Reason"}</div>;

  const renderCard = () => {
    switch (status) {
      case "pending":
        return (
          <Badge.Ribbon text="Pending" color="#ecca00">
            <div className="p-4 border border-yellow-500 rounded bg-background1 flex flex-row items-center justify-between">
              <p className="line-clamp-1 text-xs md:text-sm lg:text-base">{post?.title}</p>
            </div>
          </Badge.Ribbon>
        );
      case "approved":
        return (
          <Link href={`/post/${post._id}`}>
            <div className="p-4 rounded bg-[#e6f7ff] border border-blue-300 flex flex-row items-center justify-between">
              <p className="line-clamp-1 text-xs md:text-sm lg:text-base">{post?.title}</p>
              <IoIosArrowForward />
            </div>
          </Link>
        );
      case "rejected":
        return (
          <Popover content={content} title="" placement="topRight">
            <Badge.Ribbon text="Rejected" color="#ee2400">
              <div className="p-4 rounded bg-[#fff7f6] border border-red-300 flex flex-row items-center justify-between">
                <p className="line-clamp-1 text-xs md:text-sm lg:text-base">{post?.title}</p>
              </div>
            </Badge.Ribbon>
            <Link href={``}></Link>
          </Popover>
        );
      default:
        return (
          <Link href={`/post/${post._id}`}>
            <div className="p-4 border rounded bg-background1 flex flex-row items-center justify-between">
              <p className="line-clamp-1 text-xs md:text-sm lg:text-base">{post?.title}</p>
              <IoIosArrowForward />
            </div>
          </Link>
        );
    }
  };

  return (
    <>
      <div className={showRejectedReason ? "blur-background" : ""}>{renderCard()}</div>

      {showRejectedReason && (
        <Modal
          centered
          open={showRejectedReason}
          footer={null}
          onCancel={handleCloseModal}
          title="Post Cancel Reason"
          width={600}
        >
          <p>{post?._id}</p>
        </Modal>
      )}
    </>
  );
};

export default SinglePost;
