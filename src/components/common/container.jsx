import React from "react";

function Container({ className, children }) {
  return <div className={`container  border ${className}`}>{children}</div>;
}

export default Container;
