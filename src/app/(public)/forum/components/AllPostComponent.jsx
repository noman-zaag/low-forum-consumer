import SinglePostCard from "@/components/home/SinglePostCard";
import React from "react";

const AllPostComponent = ({ allPost }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-">
        {allPost?.map((post, index) => {
          return (
            <div className="w-full hover:bg-background1 duration-500">
              <SinglePostCard key={index} post={post} className="px-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPostComponent;
