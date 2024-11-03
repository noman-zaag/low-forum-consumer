"use client";

import React, { useState } from "react";
import ImageUpload from "./components/imageUploader";
import { useUserContext } from "@/contexts/UserContextProvider";
import RecentPostList from "./components/recentPostList";
import { MdModeEditOutline } from "react-icons/md";
import { Modal } from "antd";
import EditProfileForm from "./components/editProfileForm";
import { useUiContext } from "@/contexts/UiContextProvider/uiContextProvider";

const MyAccountPage = () => {
  const { user, handleUserProfilePictureUpload, handleUserProfileUpdate } = useUserContext();
  const { handleSetBlur } = useUiContext();
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sureImageUpload, setSureImageUpload] = useState(false);
  const [selectedImageInfo, setSelectedImageInfo] = useState({ imageName: "", imageUrl: "" });

  const countState = [
    { name: "Posts", value: user?.postsCount },
    { name: "Comments", value: user?.commentsCount },
    { name: "Likes Received", value: user?.likesReceived },
    { name: "Likes Given", value: user?.likesGiven },
  ];

  const handleOpenCloseProfileEditModal = () => {
    setProfileEditModal(!profileEditModal);
    handleSetBlur();
  };

  const handleSetPreviewImage = (image) => {
    setPreviewImage(image);
    setSureImageUpload(true);
  };

  const handleClearPreviewImage = () => {
    setPreviewImage(null);
    setSureImageUpload(false);
  };

  const handleImageUpload = async () => {
    const imageUrl = selectedImageInfo.imageUrl;
    const imageName = selectedImageInfo.imageName;

    // make a image key.
    const newFormData = new FormData();
    newFormData.append("images", imageUrl, imageName);

    const res = await handleUserProfilePictureUpload(newFormData);

    if (res) {
      // Update user profile image
      await handleUserProfileUpdate({
        profilePicture: res,
      });

      setPreviewImage(null);
    }

    setSureImageUpload(false);
    return res;
  };

  const updateUserInfo = async (data) => {
    await handleUserProfileUpdate(data);
    handleOpenCloseProfileEditModal(false);
  };

  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col gap-6">
      {/* image uploader section */}

      <div className="flex flex-col items-start justify-start gap-2 md:gap-4 lg:gap-4">
        <ImageUpload
          initialProfileImage={user?.profilePicture}
          handleSetPreviewImage={handleSetPreviewImage}
          previewImage={previewImage}
          setSelectedImageInfo={setSelectedImageInfo}
        />

        <p className="font-semibold test-xs sm:text-sm md:text-base xl:text-xl">{user?.firstName}</p>
      </div>

      {/* Basic profile info */}
      <div className="flex flex-col md:flex-row items-start md:items-center lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-4">
          <p>
            Occupation : <span className="text-text_secondary">{user?.occupation}</span>
          </p>
          <p>
            Email: <span className="text-text_secondary">{user?.primaryEmail}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 w-[40%]">
          <p>
            Specialty:
            <span className="py-2 px-3 border border-primary bg-background1 text-primary rounded-full">
              {user?.legalSpecialty}
            </span>
          </p>

          <p className="flex gap-2">
            Location: <span className="text-text_secondary w-full line-clamp-2">{user?.location}</span>
          </p>
        </div>

        <div>
          <button
            onClick={handleOpenCloseProfileEditModal}
            className="flex gap-3 items-center bg-primary text-white px-6 py-3 rounded-full font-semibold"
          >
            <span>
              <MdModeEditOutline className="h-5 w-5 text-white" />
            </span>
            <span>Edit Info</span>
          </button>
        </div>
      </div>

      {/* counting status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-3">
        {countState?.map((count, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center border p-3 gap-2 rounded bg-background1"
            >
              <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{count.value}</span>
              <span className="text-text_secondary">{count.name}</span>
            </div>
          );
        })}
      </div>

      {/* See recent Post */}
      <RecentPostList />

      {profileEditModal ? (
        <Modal
          open={profileEditModal}
          closable
          centered
          footer={null}
          width={800}
          onCancel={handleOpenCloseProfileEditModal}
        >
          <EditProfileForm
            updateUserInfo={updateUserInfo}
            handleCloseModal={handleOpenCloseProfileEditModal}
            userInfo={user}
          />
        </Modal>
      ) : null}

      {sureImageUpload && (
        <Modal
          open={sureImageUpload}
          closable
          centered
          footer={null}
          width={500}
          onCancel={() => setSureImageUpload(false)}
        >
          <h1 className="font-semibold text-base">Are you sure want to change profile picture ? </h1>

          <div className="flex flex-row items-center justify-end gap-3 mt-5">
            <button
              type="button"
              className="flex gap-3 items-center border-primary border text-primary px-6 py-3 rounded-full font-semibold"
              onClick={() => {
                handleClearPreviewImage();
              }}
            >
              <span>Cancel</span>
            </button>

            <button
              onClick={handleImageUpload}
              className="flex gap-3 items-center bg-primary text-white px-6 py-3 rounded-full font-semibold"
            >
              <span>Proceed</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyAccountPage;
