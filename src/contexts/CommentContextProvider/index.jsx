// context/CommentContextProvider.js

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { createComment, createReply, deleteComment, getComments, updateComment } from "@/services/CommentService";
import { getCookie } from "cookies-next";
import { USER_TOKEN } from "@/constant/cookiesKeys";
import { useUiContext } from "../UiContextProvider/uiContextProvider";
import { useUserContext } from "../UserContextProvider";
import useMessageToast from "@/hooks/useMessageToast";

const CommentContext = createContext();

export const useCommentContext = () => {
  return useContext(CommentContext);
};

// Recursive helper to add a reply to a specific comment
const addReplyRecursive = (comments, parentId, newReply) => {
  return comments.map((comment) => {
    // Check if the current comment's ID matches the parentId
    if (comment._id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), newReply], // Add the new reply to the replies array
      };
    }

    // If the comment has replies, apply recursion to search within them
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyRecursive(comment.replies, parentId, newReply), // Recursive call
      };
    }

    // Return the original comment if no match is found
    return comment;
  });
};

// Recursive function to update a reply's content by _id
const updateReplyRecursive = (comments, replyId, updatedContent) => {
  return comments.map((comment) => {
    if (comment._id === replyId) {
      // Update the reply's content if _id matches
      return {
        ...comment,
        content: updatedContent,
      };
    }

    if (comment.replies && comment.replies.length > 0) {
      // Recursively update replies if they exist
      return {
        ...comment,
        replies: updateReplyRecursive(comment.replies, replyId, updatedContent),
      };
    }

    return comment;
  });
};

// Recursive function to delete a comment and its replies
const deleteCommentRecursive = (comments, commentId) => {
  return comments
    .filter((comment) => comment._id !== commentId) // Remove the target comment
    .map((comment) => ({
      ...comment,
      // Recursively apply deletion on replies
      replies: deleteCommentRecursive(comment.replies, commentId),
    }));
};

export const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const token = getCookie(USER_TOKEN);
  const [postId, setPostId] = useState();
  const { showMessage, contextHolder, loading, setLoading, closeMessage } = useMessageToast();

  const { user } = useUserContext();

  // Helper function to set the Authorization header
  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // // Create a comment
  // const createComment = async (postId, content) => {
  //   try {
  //     const response = await axios.post(`/api/comments`, { postId, content }, getAuthHeaders());
  //     setComments((prevComments) => [...prevComments, response.data.comment]);
  //     return response.data.comment;
  //   } catch (error) {
  //     console.error("Error creating comment:", error);
  //     throw new Error(error.response?.data?.message || "Failed to create comment.");
  //   }
  // };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      console.log(response);

      // Remove the comment from the state
      setComments((prevComments) => deleteCommentRecursive(prevComments, commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw new Error(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  // Reply comment
  const replyComment = async (postId, content, parentId = null) => {
    try {
      let message;
      const response = await createReply(postId, parentId, content);

      // const newComment = response.data.comment;
      if (response?.status === 200) {
        message = response?.data?.doc;

        if (parentId) {
          setComments((prevComments) => addReplyRecursive(prevComments, parentId, message));
        } else {
          setComments((prevComments) => [...prevComments, message]);
        }
      }
    } catch (error) {
      console.error("Failed to create comment:", error.message);
    }
  };

  // update comment
  const handleUpdateComment = async (commentId, updatedContent) => {
    try {
      const response = await updateComment(commentId, updatedContent);
      console.log(response, "response");
      // Update the state recursively
      if (response?.status === 200) {
        setComments((prevComments) => updateReplyRecursive(prevComments, commentId, updatedContent));
      }
    } catch (error) {
      console.error("Failed to update comment:", error.message);
    }
  };

  // Fetch comments (optional: for initializing comments or re-fetching)
  const fetchComments = async (postId) => {
    const response = await getComments(postId);
    console.log(response);
    setComments(response.docs);
    return response.docs;
  };

  return (
    <CommentContext.Provider
      value={{
        user,
        comments,
        postId,
        setPostId,
        handleUpdateComment,
        handleDeleteComment,
        fetchComments,
        replyComment,
      }}
    >
      {children}

      {contextHolder}
    </CommentContext.Provider>
  );
};
