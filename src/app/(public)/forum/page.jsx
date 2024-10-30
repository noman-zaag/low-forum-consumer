import Container from "@/components/common/container";
import React from "react";
import FilterComponent from "./components/Filter";
import AllPostComponent from "./components/AllPostComponent";
import { getForumCategory } from "@/services/HomeService";
import { getForumFilterPost } from "@/services/ForumFilterService";

const ForumPage = async ({ searchParams }) => {
  const categories = await getForumCategory();
  const categoryForFilter = categories?.data?.docs?.map((category) => ({ key: category._id, label: category.name }));

  const getPost = await getForumFilterPost(searchParams);

  return (
    <div>
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16 my-8 md:my-16 w-full">
        {/* Sidebar - Hidden on smaller screens */}
        <div className="hidden md:block md:col-span-3">
          <FilterComponent categoryItem={categoryForFilter} />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-9 w-full  px-">
          <AllPostComponent allPost={getPost?.data?.docs} categoryItem={categoryForFilter} />
        </div>
      </Container>
    </div>
  );
};

export default ForumPage;