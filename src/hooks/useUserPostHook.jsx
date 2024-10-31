// hooks/useUserData.js

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { getCookie } from "cookies-next";
import { GET_RECENT_POST_URL } from "@/constant/apiUrls";

const useUserPostData = (status = "", page = 1, limit = 10, tab = 0) => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie(USER_TOKEN);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${GET_RECENT_POST_URL}?${status && `status=${status}&`}page=${page}&limit=${limit}`,
          {
            headers: { Authorization: token },
          }
        );

        if (response?.status === 200) {
          setUserPost(response?.data.docs);
          setLoading(false);
        } else {
          setError("Failed to fetch user data.");
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [tab]);

  return { userPost, loading, error };
};

export default useUserPostData;
