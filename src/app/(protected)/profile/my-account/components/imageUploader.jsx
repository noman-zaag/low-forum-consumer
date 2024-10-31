"use client";

import React, { useRef, useState } from "react";
import { IoCamera } from "react-icons/io5";
import axios from "axios";

const ImageUpload = ({ initialProfileImage }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [previewImage, setPreviewImage] = useState(null);

  // Open file input dialog
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and show preview
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Make API call to update profile image
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post("/api/update-profile-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          // Update profile image on successful upload
          setProfileImage(response.data.profileImageUrl);
          setPreviewImage(null); // Clear the preview
        } else {
          console.error("Failed to update profile image.");
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

  return (
    <div className="relative w-32 h-32">
      {/* Profile Image */}
      <img
        src={previewImage || profileImage}
        alt="Profile"
        className="w-full h-full object-cover rounded-full border"
      />

      {/* Camera Icon */}
      <div
        onClick={handleIconClick}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer border"
      >
        <IoCamera className="text-teal-600 w-6 h-6" />
      </div>

      {/* Hidden File Input */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default ImageUpload;
