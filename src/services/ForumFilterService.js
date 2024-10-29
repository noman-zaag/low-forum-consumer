import axiosPublicInstance from "@/config/axiosPublic";
import { GET_POSTS } from "@/constant/apiUrls";

export const getForumFilterPost = async (params) => {
  try {
    // Build categoryId parameter based on whether it’s a string or an array
    const categoryIdParam = Array.isArray(params.categoryId)
      ? params.categoryId
      : params.categoryId
      ? [params.categoryId]
      : undefined; // Set to undefined if categoryId is missing

    const res = await axiosPublicInstance.get(GET_POSTS, {
      params: {
        sortBy: params.sortBy,
        categoryId: categoryIdParam,
      },

      paramsSerializer: (params) => {
        return Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null) // Filter out undefined or null values
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
            }
            return `${key}=${encodeURIComponent(value)}`;
          })
          .join("&");
      },
    });

    return res;
  } catch (e) {
    console.log(e?.message);
  }
};
