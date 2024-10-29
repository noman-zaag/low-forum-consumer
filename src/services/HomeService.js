import axiosPublicInstance from "@/config/axiosPublic";
import { FORUM_CATEGORIES, GET_POSTS } from "@/constant/apiUrls";

export const getForumCategory = async () => {
  try {
    const response = await axiosPublicInstance.get(FORUM_CATEGORIES);
    return response;
  } catch (e) {
    console.log(e?.message);
  }
};

export const getForumPost = async (params) => {
  try {
    const res = await axiosPublicInstance.get(GET_POSTS);

    return res;
  } catch (e) {
    console.log(e?.message);
  }
};
