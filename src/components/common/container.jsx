import React from "react";

function Container({ className, children }) {
  return <div className={`container h-full ${className}`}>{children}</div>;
}

export default Container;
