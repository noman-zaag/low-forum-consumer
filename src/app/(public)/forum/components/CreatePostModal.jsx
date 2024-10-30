import React from "react";
import { Divider, Form, Input, Select } from "antd";
import Image from "next/image";

const CreatePostModal = ({ handleCreatePost, categoryItem, closeModal }) => {
  const handleFinish = async (values) => {
    handleCreatePost(values);
    // showMessage("loading", "Creating your post. Please Wait...");

    // const response = await createPost(values, token);

    // // Close the loading message immediately after the response
    // closeMessage();

    // if (response.error) {
    //   showMessage("error", response.message);
    // } else {
    //   showMessage("success", response.message);
    //   router.refresh();

    //   closeModal(close);
    // }
  };

  // Transform category data for Select component
  const categoryOptions = categoryItem?.map((category) => ({
    value: category.key,
    label: category.label,
  }));

  return (
    <Form onFinish={handleFinish} layout="vertical">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {/* profile picture */}
          <div className="flex items-center justify-center">
            {/* Outer circle with border */}
            <div className="w-12 h-12 rounded-full border-2 border-teal-500 overflow-hidden">
              <Image
                height={1000}
                width={1000}
                quality={100}
                src="https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover rounded-full"
                alt="Profile picture"
              />
            </div>
          </div>
          <p className="font-semibold text-lg">Create New Post</p>
        </div>

        <div>
          <Form.Item
            name="categoryId"
            label="Category"
            className="m-0 p-0"
            style={{ padding: 0, margin: 0 }}
            rules={[
              {
                required: true,
                message: "Please Select a Category.",
              },
            ]}
          >
            <Select
              style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
              placeholder="Select Post Category"
              options={categoryOptions}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="title"
            label="Title"
            style={{ padding: 0, margin: 0 }}
            rules={[{ required: true, message: "Please enter your post title." }]}
          >
            <Input
              style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
              placeholder="Enter your post title here"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="description"
            label="Description"
            style={{ padding: 0, margin: 0 }}
            rules={[{ required: true, message: "Please enter your post description." }]}
          >
            <Input.TextArea
              style={{ width: "100%", backgroundColor: "#F3F4F5" }}
              placeholder="Write your post here...."
              allowClear
              rows={6}
            />
          </Form.Item>
        </div>

        <Divider style={{ margin: "10px 0px 5px 0px", padding: "0px 0px 0px 0px" }} />

        {/* Footer */}

        <div className="flex gap-2 items-center justify-between">
          <p className="text-text_secondary text-xs">
            * Your post will be reviewed by our admin to ensure it meets our guidelines. Once approved, it will be
            published on the forum page.
          </p>
          <button
            type="submit"
            className="bg-primary px-3 py-3 text-white rounded-[25px] h-12 font-semibold whitespace-nowrap"
          >
            Post for Review
          </button>
        </div>
      </div>
    </Form>
  );
};

export default CreatePostModal;
