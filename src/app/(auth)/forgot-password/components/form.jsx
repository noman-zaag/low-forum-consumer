"use client";

import React, { useState } from "react";
import { Form, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { handleForgotPassword } from "./_action";
import useMessageToast from "@/hooks/useMessageToast";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { setCookie } from "cookies-next";

const { Title } = Typography;

const ForgotPasswordForm = () => {
  const { contextHolder, showMessage, closeMessage } = useMessageToast();
  //   const { passwordVisible, setPasswordVisible } = useState(false);

  const router = useRouter();

  const onFinish = async (values) => {
    showMessage("loading", "We are sending OTP for you. Please Wait...");

    const response = await handleForgotPassword(values);

    // Close the loading message immediately after the response
    closeMessage();

    if (response.error) {
      showMessage("error", response.message);
    } else {
      // sending otp successfully
      //   console.log(response);

      showMessage("success", response.message);

      setCookie("temp-email", values.email);
      //  redirect to verify page.
      router.push("/verify-otp-code");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scr bg-white my-[80px]">
      {/* <Spin fullscreen spinning={loading} /> */}
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-12 rounded-lg border-2 border-border_color">
        <div className="flex flex-col items-center justify-center border-b">
          <Title level={1} className="text-xl mb-0  text-neutral-700" style={{ marginBottom: 0, paddingBottom: 6 }}>
            Change Password
          </Title>
        </div>
        {/* Logo */}
        <div className="flex justify-center my-6">
          <Image
            height={1000}
            width={1000}
            quality={100}
            src={`/assets/images/forgot_password.svg`}
            alt="Lawying Logo asdf"
            className="w-[250px] sm:w-[400px] h-[144px] sm:h-[231px]"
          />
        </div>

        <Form layout="vertical" onFinish={onFinish} className="flex flex-col gap-2">
          <Form.Item
            name="email"
            label="Email Id"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter your email" className="h-[52px]" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
            ]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="h-[52px]"
              //   visibilityToggle={{
              //     visible: passwordVisible,
              //     onVisibleChange: setPasswordVisible,
              //   }}
            />
          </Form.Item>

          <Form.Item
            name="reTypePassword"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please re-enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The new password that you entered does not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item>
            <button type="submit" className="w-full bg-primary text-white font-semibold h-[52px] rounded mt-4">
              Send Verification Code
            </button>
          </Form.Item>
        </Form>
      </div>

      {contextHolder}
    </div>
  );
};

export default ForgotPasswordForm;
