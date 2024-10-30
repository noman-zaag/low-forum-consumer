import axiosPublicInstance from "@/config/axiosPublic";
import { GET_POSTS } from "@/constant/apiUrls";

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
