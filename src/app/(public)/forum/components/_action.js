"use client";

import axiosPrivateInstance from "@/config/axiosPrivate";
import { CREATE_POST } from "@/constant/apiUrls";

export const createPost = async (values, token) => {
  try {
    const res = await axiosPrivateInstance({
      url: CREATE_POST,
      data: values,
      method: "post",
      headers: {
        Authorization: token,
      },
    });

    if (res?.status === 200) {
      return {
        message: res.data?.message || "Post created successfully",
        error: false,
        result: res.data,
      };
    } else {
      return { message: error?.response?.data?.message || "Something is wrong !!", error: true };
    }
  } catch (error) {
    return { message: error?.response?.data?.message || "An error occurred", error: true };
  }
};
