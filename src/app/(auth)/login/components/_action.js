"use server";
import axiosPublicInstance from "@/config/axiosPublic";
import { LOGIN_URL } from "@/constant/apiUrls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleLogin = (values) => {
  console.log("Asdf", values);

  try {
    const res = axiosPublicInstance.post(LOGIN_URL, { ...values });
    console.log(res.status, "api response...");
  } catch (error) {
    console.log(error.status);
  }

  revalidatePath("/");
  //   redirect("/");
};
