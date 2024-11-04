"use client";

import { getForumFilterPost } from "@/services/ForumFilterService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostList from "./PostList";
import SkeletonPost from "./postSkeleton";

const LoadMorePost = ({ totalPages }) => {
  const [params, setParams] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [pageLimit, setPageLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(totalPages);

  const searchParams = useSearchParams();

  const { ref, inView } = useInView();

  useEffect(() => {
    // Get sortBy parameter
    const sortBy = searchParams.get("sortBy");

    // Get all categoryId values
    const categoryIds = searchParams.getAll("categoryId");

    setParams({
      sortBy: sortBy || null,
      categoryId: categoryIds.length > 1 ? categoryIds : categoryIds[0] || null,
      page: page,
      limit: pageLimit,
    });
  }, [searchParams]);

  const loadMoreProducts = async () => {
    setLoading(true);

    // Update params with the current page value
    const currentParams = { ...params, page };

    const posts = await getForumFilterPost(currentParams);

    if (posts?.status === 200) {
      const newPosts = posts.data.docs;
      setPosts((prev) => [...prev, ...newPosts]);
      setTotalPage(posts.data.totalPages);
    }

    if (!posts) {
      return new Error("Sorry, Product not found....");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (inView && page <= totalPage) {
      loadMoreProducts();
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return (
    <div>
      <PostList posts={posts} />

      {/* Loading Skeletons */}
      <div ref={ref}>
        {loading && (
          <div className="flex flex-col gap-5">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMorePost;
