import { Flex, Form, Input, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUploader";
import { useUserContext } from "@/contexts/UserContextProvider";

const EditProfileForm = ({ handleCloseModal, userInfo, updateUserInfo }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageInfo, setSelectedImageInfo] = useState({ imageName: "", imageUrl: "" });
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const { handleUserProfilePictureUpload, changePassword } = useUserContext();

  const handleFinish = async (values) => {
    let profileImageUrl;

    if (previewImage) {
      const imageUrl = selectedImageInfo.imageUrl;
      const imageName = selectedImageInfo.imageName;

      // make a image key.
      const newFormData = new FormData();
      newFormData.append("images", imageUrl, imageName);

      profileImageUrl = await handleUserProfilePictureUpload(newFormData);
      values.profilePicture = profileImageUrl;
    }

    // If change password is enabled, update the password
    if (toggleChangePassword) {
      const passwordData = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        reTypePassword: values.reTypePassword,
      };

      const response = await changePassword(passwordData);

      if (response?.status !== 200) {
        return;
      }
      console.log(response, "res form com");
    }

    delete values.oldPassword;
    delete values.newPassword;
    delete values.reTypePassword;

    updateUserInfo(values);
  };

  const handleSetPreviewImage = (image) => {
    setPreviewImage(image);
  };

  const occupationOptions = [
    { value: "Abogado", label: "Abogado" },
    { value: "Docente", label: "Docente" },
  ];

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      setToggleChangePassword(true);
    } else {
      setToggleChangePassword(false);
    }
  };

  useEffect(() => {
    setToggleChangePassword(false);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex flex-col items-start justify-start gap-2 md:gap-4 lg:gap-4">
          <ImageUpload
            initialProfileImage={userInfo?.profilePicture}
            handleSetPreviewImage={handleSetPreviewImage}
            previewImage={previewImage}
            setSelectedImageInfo={setSelectedImageInfo}
          />
        </div>
      </div>

      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          firstName: userInfo?.firstName,
          primaryEmail: userInfo?.primaryEmail,
          location: userInfo?.location,
          occupation: userInfo?.occupation,
        }}
        className="flex flex-col gap-5"
      >
        <div>
          <Form.Item
            name="firstName"
            label="Name"
            className="m-0 p-0"
            style={{ padding: 0, margin: 0 }}
            rules={[
              {
                required: true,
                message: "Please Select a Category.",
              },
            ]}
          >
            <Input
              style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
              placeholder="Enter your name"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="primaryEmail"
            label="Email Address"
            className="m-0 p-0"
            style={{ padding: 0, margin: 0 }}
            rules={[
              {
                required: true,
                message: "Please Enter a valid email.",
              },
            ]}
          >
            <Input
              type="email"
              style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
              placeholder="Enter your email address"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="occupation"
            label="Occupation"
            rules={[{ required: true, message: "Please select your occupation." }]}
            className="m-0 p-0"
            style={{ padding: 0, margin: 0 }}
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
        </div>

        <div>
          <Form.Item name="location" label="Address" className="m-0 p-0" style={{ padding: 0, margin: 0 }}>
            <Input.TextArea
              style={{ width: "100%", height: 120, backgroundColor: "#F3F4F5" }}
              placeholder="Enter your Location."
              rows={5}
              allowClear
            />
          </Form.Item>
        </div>

        {/* Password change */}
        <Flex align="center" justify="space-between">
          <p className="text-base font-semibold text-[#2A2A2A]">Do you want to change your password ?</p>
          <Switch onChange={onChange} />
        </Flex>

        {toggleChangePassword && (
          <div>
            <Form.Item
              name="oldPassword"
              label="Old Password"
              className="m-0 p-0"
              style={{ padding: 0, margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please Enter a valid password.",
                },
              ]}
            >
              <Input
                type="password"
                style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
                placeholder="Entered password 8 character long."
              />
            </Form.Item>
          </div>
        )}

        {toggleChangePassword && (
          <div>
            <Form.Item
              name="newPassword"
              label="New Password"
              className="m-0 p-0"
              style={{ padding: 0, margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please Enter a new password.",
                },
              ]}
            >
              <Input
                type="password"
                style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
                placeholder="Enter your new password 8 character long."
              />
            </Form.Item>
          </div>
        )}

        {toggleChangePassword && (
          <div>
            <Form.Item
              name="reTypePassword"
              label="Confirm New Password"
              className="m-0 p-0"
              style={{ padding: 0, margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please re-enter your password!",
                },
                {
                  min: 8,
                  message: "New Password must be at least 8 characters long.",
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
              <Input
                type="password"
                style={{ width: "100%", height: "52px", backgroundColor: "#F3F4F5" }}
                placeholder="Enter your confirm new password 8 character long."
              />
            </Form.Item>
          </div>
        )}

        <div className="flex flex-row items-center justify-end gap-3 mt-5">
          <button
            type="button"
            className="flex gap-3 items-center border-primary border text-primary px-6 py-3 rounded-full font-semibold"
            onClick={handleCloseModal}
          >
            <span>Cancel</span>
          </button>

          <button
            type="submit"
            className="flex gap-3 items-center bg-primary text-white px-6 py-3 rounded-full font-semibold"
          >
            <span>Edit Info</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfileForm;
