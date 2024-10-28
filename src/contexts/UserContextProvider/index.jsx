import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { USER_INFO } from "@/constant/cookiesKeys";

// Create the UserContext
const UserContext = createContext(null);

// Custom hook to use the UserContext easily
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user state and login tracking
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to track login and user info

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

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = fetchUserFromCookies();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to handle user logout
  const logout = () => {
    deleteCookie(USER_INFO);
    setUser(null);
  };

  // Provide the user state and functions to the rest of the app
  return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>;
};
