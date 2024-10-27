"use client";

import React from "react";
import { Form, Input } from "antd";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 py-16 space-y-8 md:space-y-0">
      {/* Form Section */}
      <div className="w-full lg:w-[50%] bg-white  ">
        <h2 className="text-2xl font-semibold mb-2">Send us a Message!</h2>
        <p className="text-gray-600 mb-6">Want to get in touch? We’d love to hear from you</p>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="p-3"
          >
            <Input placeholder="Enter your name" className="h-[52px]" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter your email" className="h-[52px]" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input placeholder="Enter your phone number" className="h-[52px]" />
            </Form.Item>
          </div>
          <Form.Item name="message" label="Message" rules={[{ required: true, message: "Please enter your message" }]}>
            <Input.TextArea rows={6} placeholder="Enter your message" />
          </Form.Item>
          <p className="text-sm text-gray-500 mb-4">
            I consent to the processing of my personal data to Lawying for contact purposes. For more information,
            please refer to our privacy policy.
          </p>
          <Form.Item>
            <button htmlType="submit" className="bg-primary text-white w-[150px] h-[48px] rounded text-base">
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>

      {/* Contact Info Section */}
      <div className="w-full lg:w-1/3  bg-gray-100 p-12 rounded shadow-md border border-primary">
        <h2 className="text-xl font-semibold mb-6">Let's Connect</h2>
        <ul className="space-y-4 text-gray-800">
          <li className="flex items-center space-x-2">
            <FaEnvelope className="text-green-600" />
            <span>info@lawying.es</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaPhoneAlt className="text-green-600" />
            <span>+1 (555) 123-4567</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaPhoneAlt className="text-green-600" />
            <span>+1 (555) 987-6543</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span>123 Legal Avenue, Suite 456, Lawtown, LT 78901, USA</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;
