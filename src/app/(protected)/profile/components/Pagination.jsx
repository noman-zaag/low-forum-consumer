// components/CustomPagination.js

import React from "react";
import { Pagination } from "antd";

const CustomPagination = ({ current, total, pageSize = 10, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      className="flex justify-center items-center mt-4 space-x-2"
      itemRender={(page, type, originalElement) => {
        if (type === "prev") {
          return (
            <button className="px-4 py-2 text-[#248280] border border-[#248280] rounded hover:bg-[#248280] hover:text-white transition-colors duration-200">
              Previous
            </button>
          );
        }
        if (type === "next") {
          return (
            <button className="px-4 py-2 text-[#248280] border border-[#248280] rounded hover:bg-[#248280] hover:text-white transition-colors duration-200">
              Next
            </button>
          );
        }
        return (
          <button
            className={`rounded transition-colors duration-200 ${
              current === page ? "bg-[#248280] text-white p-2" : "text-[#248280]  hover:bg-[#248280] hover:text-white"
            }`}
          >
            {page}
          </button>
        );
      }}
    />
  );
};

export default CustomPagination;
