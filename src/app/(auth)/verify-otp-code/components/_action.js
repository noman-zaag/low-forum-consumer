"use server";

import { VERIFY_OTP } from "@/constant/apiUrls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleVerifyOtp = async (values) => {
  if (values) {
    let result;

    try {
      const res = await fetch(VERIFY_OTP, {
        method: "POST",
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
      console.log("catch");
      return { message: e?.message, error: true };
    }

    console.log(result);

    return { message: result.message || "Verify Successful.", error: false, result };
  }

  revalidatePath("/");
  // redirect("/");
};
