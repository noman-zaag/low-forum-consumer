// services/commentService.js

import { COMMENTS, COMMENTS_LIKES } from "@/constant/apiUrls";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import axios from "axios";
import { getCookie } from "cookies-next";

// Helper function to get headers with authorization
const getAuthHeaders = () => {
  const token = getCookie(USER_TOKEN);
  return {
    headers: {
      Authorization: token,
    },
  };
};

// Get a comment
export const getComments = async (postId) => {
  try {
    const response = await axios.get(COMMENTS, {
      params: {
        postId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    return error;
  }
};

// Create a comment
export const createComment = async (postId, content) => {
  try {
    const response = await axios.post(COMMENTS, { postId, content }, getAuthHeaders());
    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    return error;
  }
};

// Update a comment
export const updateComment = async (commentId, updatedContent) => {
  try {
    const response = await axios.patch(
      `${COMMENTS}`,
      { content: updatedContent },
      {
        params: {
          id: commentId,
        },
        ...getAuthHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error(error.response?.data?.message || "Failed to update comment.");
  }
};

// Delete a comment
export const deleteComment = async (id) => {
  const token = getCookie(USER_TOKEN);
  try {
    const response = await axios.delete(COMMENTS, {
      params: { id },
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete comment.",
    };
    // throw new Error(error.response?.data?.message || "Failed to delete comment.");
  }
};

// Create a comment
export const createReply = async (postId, parentId, content) => {
  try {
    const response = await axios.post(COMMENTS, { postId, content, parentId }, getAuthHeaders());
    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    return error;
  }
};

// Like a comment
export const likeDislikeComment = async (postId, commentId, targetType, authorId) => {
  try {
    const response = await axios.post(
      COMMENTS_LIKES,
      { postId, targetId: commentId, targetType, authorId },
      { params: {}, ...getAuthHeaders() }
    );
    return response;
  } catch (error) {
    console.error("Error liking comment:", error);
    return error;
  }
};
