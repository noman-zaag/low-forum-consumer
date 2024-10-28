"use server";

import { RESET_PASSWORD } from "@/constant/apiUrls";

export const handleForgotPassword = async (values) => {
  if (values) {
    let result;

    try {
      const res = await fetch(RESET_PASSWORD, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        return { message: error.message || error.error, error: true };
      }

      result = await res.json();
    } catch (e) {
      return { message: e?.message, error: true };
    }

    return { message: result.message || "OTP send Successfully.", error: false, result };
  }

  // revalidatePath("/");
  // redirect("/");
};
