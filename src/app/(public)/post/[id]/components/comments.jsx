import React from "react";
import Comment from "./comment";

const Comments = ({ comments }) => {
  return (
    <div>
      {/* <CommentSkeleton /> */}

      {/* Render all comments */}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
