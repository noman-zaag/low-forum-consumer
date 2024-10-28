"use client";

import { useState } from "react";
import VerificationInput from "react-verification-input";
import Image from "next/image";
import TimerDisplay from "./TimerDisplay";
import { useRouter } from "next/navigation";
import { handleVerifyOtp } from "./_action";
import { deleteCookie, getCookie } from "cookies-next";
import useMessageToast from "@/hooks/useMessageToast";

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { contextHolder, showMessage, closeMessage } = useMessageToast();
  const router = useRouter();
  const userEmail = getCookie("temp-email");

  const handleFinish = async () => {
    showMessage("loading", "We are verifying your OTP. Please Wait...");

    const values = {
      action: "reset_password",
      email: userEmail,
      otp: Number(verificationCode),
    };

    const res = await handleVerifyOtp(values);

    // Close the loading message immediately after the response
    closeMessage();

    if (res.error) {
      showMessage("error", res.message);
    } else {
      showMessage("success", res.message);
      deleteCookie("temp-email");
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scr bg-white my-[80px]">
      {/* <Spin spinning={loading} fullscreen /> */}
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-border_color text-black">
        <h1 className="flex w-full justify-center font-semibold text-xl text-neutral-700 py-3 border-b border-[#8790AB] border-opacity-[8%]">
          Verification Code
        </h1>

        <div className="w-full flex justify-center pb-16 pt-4 sm:pt-4">
          <Image width={1000} height={1000} alt="verifyOTP" quality={100} src={"/assets/images/verify_otp_image.svg"} />
        </div>

        <div className="space-y-3">
          <h1 className="text-neutral-700 text-base md:text-xl font-semibold leading-[21px] md:leading-[31.25px]">
            Verify your Email Address
          </h1>
          <p className="text-black text-sm font-normal leading-[21px]">
            We just sent a verification code to <span className="text-gray-500">{userEmail}</span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-y-4 py-9">
          <div className="w-full flex justify-between">
            <p className="text-black text-sm font-medium">Verification Code</p>
          </div>

          <VerificationInput
            validChars="0-9"
            classNames={{
              container: "w-full flex justify-between gap-x-2 md:gap-x-6",
              character:
                "w-[43px] h-[41px] md:w-12 md:h-12 text-[15px] md:text-base text-[#3A3A3A] flex items-center justify-center leading-[18.23px] md:leading-[19.53px] bg-white rounded-sm border border-neutral-50 ",
              characterSelected: "outline-magenta-600",
            }}
            onChange={(code) => setVerificationCode(code)}
          />

          <div className="w-full flex justify-between items-center">
            {/* <Link href={"change-phone-number"}> */}
            <p
              className="text-neutral-700 text-sm font-bold leading-[18.23px] cursor-pointer"
              onClick={() => router.back()}
            >
              Change your password
            </p>
            {/* </Link> */}
            <TimerDisplay />
          </div>
        </div>

        <button
          onClick={handleFinish}
          disabled={verificationCode.length < 6}
          className={`w-full flex justify-center items-center  h-12  ${
            verificationCode.length < 6 ? "bg-neutral-50 text-gray-400" : "bg-primary text-white"
          } rounded-sm text-base font-semibold duration-300`}
        >
          Verify Your Email
        </button>
      </div>

      {contextHolder}
    </div>
  );
};

export default VerificationForm;
