"use server";

import { LOGIN_URL } from "@/constant/apiUrls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleLogin = async (values) => {
  if (values) {
    let result;
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        return { message: error.message, error: true };
      }

      result = await res.json();
    } catch (e) {
      return { message: e?.message, error: true };
    }

    return { message: "Login Successful", error: false, result };
  }

  // revalidatePath("/");
  // redirect("/");
};
