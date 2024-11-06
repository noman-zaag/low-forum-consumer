import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { USER_INFO, USER_PERMISSION, USER_TOKEN } from "@/constant/cookiesKeys";
import { useRouter } from "next/navigation";
import useMessageToast from "@/hooks/useMessageToast";
import axios from "axios";
import { UPDATE_PROFILE_DATA_URL, UPLOAD_IMAGE_URL } from "@/constant/apiUrls";

// Create the UserContext
const UserContext = createContext(null);

// Custom hook to use the UserContext easily
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user state and login tracking
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to track login and user info
  const router = useRouter();
  const { showMessage, contextHolder, closeMessage } = useMessageToast();
  const token = getCookie(USER_TOKEN);

  // Function to get user info from cookies
  const fetchUserFromCookies = () => {
    const userInfo = getCookie(USER_INFO);
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch (error) {
        console.error("Error parsing user cookie", error);
        return null;
      }
    }
    return null;
  };

  // Fetch user form api
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(UPDATE_PROFILE_DATA_URL, {
        headers: { Authorization: token },
      });

      if (res?.status === 200) {
        setUser(res?.data?.user);
        setCookie(USER_INFO, res?.data?.user);
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = fetchUserFromCookies();
    if (storedUser) {
      setUser(storedUser);
    }

    fetchUserInfo();
  }, []);

  // Function to handle user logout
  const logout = () => {
    deleteCookie(USER_INFO);
    deleteCookie(USER_TOKEN);
    deleteCookie(USER_PERMISSION);

    setUser(null);
    router.push("/");
  };

  // User Image upload.
  const handleUserProfilePictureUpload = async (formData) => {
    showMessage("loading", "Please Wait, Your profile picture is uploading...");

    try {
      const response = await axios.post(UPLOAD_IMAGE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      // Close the loading message immediately after the response
      closeMessage();

      if (response?.data?.keys?.length > 0) {
        const imageKey = response.data.keys[0];
        return imageKey;
      }
    } catch (error) {
      console.log(error);
      // toast.error(error?.message);
      showMessage("error", error?.message || "Image can'nt upload now. Sorry for this inconvenient.  ");
    }
  };

  // User profile info Update.
  const handleUserProfileUpdate = async (data) => {
    showMessage("loading", "Uploading User Data...");

    try {
      const response = await axios.patch(UPDATE_PROFILE_DATA_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      // Close the loading message immediately after the response
      closeMessage();

      if (response?.status === 200) {
        showMessage("success", "Update Profile successfully.");
        // update user data.
        // setUser(response?.data?.user);
        setCookie(USER_INFO, response?.data?.user);

        await fetchUserInfo();
      }
      return response;
    } catch (e) {
      showMessage("error", e?.message || "Sorry! cannot update your data.");
    }
  };

  // Provide the user state and functions to the rest of the app
  return (
    <UserContext.Provider value={{ user, setUser, logout, handleUserProfilePictureUpload, handleUserProfileUpdate }}>
      {children} {contextHolder}
    </UserContext.Provider>
  );
};
