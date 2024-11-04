"use client";

import React, { useState } from "react";
import Actions from "./actions";
import Comments from "./comments";
import { Input } from "antd";
import { useCommentContext } from "@/contexts/CommentContextProvider";

const Comment = ({ comment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [replyCommentContent, setReplyCommentContent] = useState("");
  const { replyComment, postId, handleUpdateComment } = useCommentContext();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleAddReply = () => {
    setIsReply(!isReply);
  };
  //   console.log({ comment, postId }, "comment...");

  return (
    <div className="mb-4">
      {/* Comment Header */}
      <div className="flex items-start gap-3">
        <div>
          <p className="font-semibold text-sm">{comment.authorName}</p>
          <p className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Comment Content */}
      {isEdit ? (
        <Input.TextArea
          defaultValue={comment.content}
          onChange={(e) => {
            e.preventDefault();
            setCommentContent(e.target.value);
          }}
          style={{ height: 100 }}
        />
      ) : (
        <p className="ml-0 text-sm mt-2">{comment.content}</p>
      )}

      <div className="ml-2 mt-2">
        {isEdit ? (
          <div className="flex gap-4">
            <button className="bg-red-500 p-2 rounded-md text-white" onClick={handleEdit}>
              Cancel
            </button>
            <button
              className="bg-primary p-2 rounded-md text-white"
              onClick={() => {
                console.log("reply..");
                handleUpdateComment(comment?._id, commentContent);
                handleEdit();
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <Actions comment={comment} handleEdit={handleEdit} handleAddReply={handleAddReply} />
        )}
      </div>

      <div>
        {isReply && (
          <div className="flex flex-col gap-3">
            <Input.TextArea
              onChange={(e) => {
                e.preventDefault();
                setReplyCommentContent(e.target.value);
              }}
              placeholder="Add reply..."
              style={{ height: 150 }}
            />

            <div className="flex gap-4">
              <button className="bg-red-500 p-2 rounded-md text-white" onClick={handleAddReply}>
                Cancel
              </button>
              <button
                className="bg-primary p-2 rounded-md text-white"
                onClick={() => {
                  console.log("reply..");
                  // handleUpdateComment(comment?._id, commentContent);
                  replyComment(postId, replyCommentContent, comment?._id);
                  handleAddReply();
                }}
              >
                Reply
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 border-l border-gray-300 pl-4">
          <Comments comments={comment.replies} />
        </div>
      )}
    </div>
  );
};

export default Comment;
