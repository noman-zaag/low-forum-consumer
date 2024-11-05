import axiosPublicInstance from "@/config/axiosPublic";
import { GET_POSTS, LIKE_POST } from "@/constant/apiUrls";
import axios from "axios";

export const getSinglePost = async (params, fetchBy, categoryId = "") => {
  try {
    // Fetch post by ID or category based on `fetchBy` parameter
    const url = fetchBy === "id" ? `${GET_POSTS}?id=${params}` : `${GET_POSTS}?categoryId=${categoryId}`;

    const res = await axiosPublicInstance.get(url);

    // Return response if successful
    return res;
  } catch (error) {
    console.error("Error in getSinglePost:", error?.message);

    // Return a consistent error object
    return { error: true, message: error?.message || "Failed to fetch post" };
  }
};

export const likePost = async (targetId, targetType = "Post", token, authorId) => {
  try {
    const res = await axios.post(
      LIKE_POST,
      { targetId, targetType, authorId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return {
      message: res.data?.message || "Post created successfully",
      error: false,
      result: res.data,
      isDelete: res?.data.doc?.isDeleted,
    };
  } catch (error) {
    console.error("Error in getSinglePost:", error);

    // Return a consistent error object
    return { error: true, message: error?.response?.data?.message || "Sorry ! Failed to like this post." };
  }
};
