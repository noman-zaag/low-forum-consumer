"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { handleLogin } from "./_action";
import useMessageToast from "@/hooks/useMessageToast";
import { getCookie, setCookie } from "cookies-next";
import { USER_INFO, USER_PERMISSION, USER_TOKEN } from "@/constant/cookiesKeys";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContextProvider";

const SignIn = () => {
  const { contextHolder, showMessage, closeMessage } = useMessageToast();
  const { setUser } = useUserContext();
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    // Get the redirect URL from the query parameters if it exists
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  const onFinish = async (values) => {
    showMessage("loading", "You are logging. Please Wait...");

    const response = await handleLogin(values);

    // Close the loading message immediately after the response
    closeMessage();

    if (response.error) {
      showMessage("error", response.message);
    } else {
      // User logging successfully
      // console.log(response);

      showMessage("success", response.message);
      setCookie(USER_TOKEN, response.result.token);
      setCookie(USER_INFO, response.result.user);
      setCookie(USER_PERMISSION, response.result.permissions);
      setUser(response.result.user); // set user info in the context immediately.

      router.refresh();

      // check QueryParams and redirect.
      router.push(redirectUrl);
    }

    // const userInfo = getCookie(USER_INFO);
    // console.log(JSON.parse(userInfo));
  };

  return (
    <div className="flex items-center justify-center min-h-scr bg-white my-[80px]">
      {/* <Spin fullscreen spinning={loading} /> */}
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-border_color">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={`/assets/icon/icon.svg`} alt="Lawying Logo asdf" className="w-[192px] h-[60px]" />
        </div>

        <h2 className="text-2xl font-semibold text-left mb-2">Sign In</h2>
        <span className="text-[#4A4A4A] text-left mb-6 font-light">Please fill up the form to sign in!</span>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email Id"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter your email" className="h-[52px]" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password must be at least 8 characters", min: 8 }]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="h-[52px]"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <button type="submit" className="w-full bg-primary text-white font-semibold h-[52px] rounded">
              Sign In
            </button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-primary font-semibold hover:underline">
            Sign Up Now
          </Link>
        </p>
      </div>

      {contextHolder}
    </div>
  );
};

export default SignIn;
