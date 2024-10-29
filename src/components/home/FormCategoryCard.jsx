import { VIEW_IMAGE } from "@/constant/apiUrls";
import React from "react";

const ForumCategoryCard = ({ icon, title, description, posts }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 md:gap-4 bg-gray-100 p-2 sm:p-4 md:p-6  rounded border border-gray-200">
      {/* Icon */}
      <img src={`${VIEW_IMAGE}${icon}`} className=" mr-4 h-12 w-12 text-teal-500" alt="Icon" />
      <div className="flex gap-2 md:gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-1">
          <h2 className="text-primary font-semibold text-sm md:text-base p-0">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="text-gray-500 text-sm text-nowrap self-start sm:self-auto">23 Posts</div>
      </div>
    </div>
  );
};

export default ForumCategoryCard;

// <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 p-2 sm:p-4 md:p-6  rounded border border-gray-200">
//   {/* Icon */}
//   <img src={`${VIEW_IMAGE}${icon}`} className="hidden lg:block mr-4 h-12 w-12 text-teal-500" alt="Icon" />

//   {/* Left section with icon and text */}
//   <div className="flex-col md:flex-row items-start sm:items-start mb-4 sm:mb-0">
//     {/* Title and description */}
//     <div>
//       <h2 className="text-primary font-semibold text-base p-0">{title}</h2>
//       <p className="text-gray-600 text-sm">{description}</p>
//     </div>

//     {/* Right section with post count */}
//     <div className="text-gray-500 text-sm text-nowrap self-start sm:self-auto hidden lg:block">23423423 Posts</div>
//   </div>

//   <div className="text-gray-500 text-sm text-nowrap self-start sm:self-auto block lg:hidden">23 Posts</div>
// </div>
