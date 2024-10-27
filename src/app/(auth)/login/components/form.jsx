"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";

const SignIn = () => {
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-border_color">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={`/assets/icon/icon.svg`} alt="Lawying Logo" className="w-[192px] h-[60px]" />
        </div>

        <h2 className="text-2xl font-semibold text-left mb-2">Sign In</h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">Please fill up the form to sign in!</p>

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
            rules={[{ required: true, message: "Password must be at least 6 characters", min: 6 }]}
          >
            <Input.Password
              placeholder="Min. 6 characters"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="h-[52px]"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <button htmlType="submit" className="w-full bg-primary text-white font-semibold h-[52px] rounded">
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
    </div>
  );
};

export default SignIn;
