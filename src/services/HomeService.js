import axiosPublicInstance from "@/config/axiosPublic";
import { FORUM_CATEGORIES } from "@/constant/apiUrls";

export const getForumCategory = async () => {
  const response = await axiosPublicInstance.get(FORUM_CATEGORIES);

  return response;
};
