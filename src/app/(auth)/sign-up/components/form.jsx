"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaLock } from "react-icons/fa";
import Link from "next/link";

const SignUpForm = () => {
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const occupationOptions = [
    { value: "Abogado", label: "Abogado" },
    { value: "Docente", label: "Docente" },
  ];

  const specialtyOptions = [
    { value: "Mercantil - Concursal", label: "Mercantil - Concursal" },
    { value: "Civil", label: "Civil" },
    { value: "Penal", label: "Penal" },
    { value: "Contencioso", label: "Contencioso" },
    { value: "Laboral", label: "Laboral" },
    { value: "Fiscal", label: "Fiscal" },
    { value: "Otros", label: "Otros" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg border-2 border-border_color">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={`/assets/icon/icon.svg`} alt="Lawying Logo" className="w-[192px] h-[60px]" />
        </div>

        <h2 className="text-2xl font-semibold text-left mb-2">Sign Up</h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">Please fill up the form to sign up!</p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Full Name"
            rules={[{ required: true, type: "text", message: "Please enter you full name" }]}
          >
            <Input placeholder="Enter your full name" className="h-[52px]" />
          </Form.Item>

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

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: "Password must be at least 6 characters", min: 6 }]}
          >
            <Input.Password
              placeholder="Min. 6 characters"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item
            name="occupation"
            label="Occupation"
            rules={[{ required: true, message: "Please select your occupation." }]}
          >
            <Select
              placeholder="please select your legal occupation."
              style={{
                width: "100%",
                height: "52px",
              }}
              options={occupationOptions}
            />
          </Form.Item>

          <Form.Item
            name="legalSpecialty"
            label="Legal Specialty"
            rules={[{ required: true, message: "Please select your legal specialty." }]}
          >
            <Select
              placeholder="please select your legal specialty."
              style={{
                width: "100%",
                height: "52px",
              }}
              options={specialtyOptions}
            />
          </Form.Item>

          <Form.Item name="linkedInLink" label="Linkedin Profile (Optional)" rules={[]}>
            <Input placeholder="Enter your linkedin profile link" className="h-[52px]" />
          </Form.Item>

          <Form.Item
            name="personalInfo"
            label="Personal Info (optional)"
            rules={[{ max: 150, message: "Please Input less then 150 character" }]}
          >
            <Input.TextArea
              placeholder="Enter your personal information"
              style={{
                height: 120,
                resize: "none",
              }}
              showCount
              maxLength={150}
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                By signing up, you agree to our <span className="font-semibold">Terms & Condition</span> and{" "}
                <span className="font-semibold">Privacy Policy.</span>
              </Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <button htmlType="submit" className="w-full bg-primary text-white font-semibold h-[52px] rounded">
              Sign Up
            </button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
