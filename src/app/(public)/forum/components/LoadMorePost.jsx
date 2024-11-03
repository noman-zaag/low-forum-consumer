"use client";

import { getForumFilterPost } from "@/services/ForumFilterService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostList from "./PostList";

const LoadMorePost = () => {
  const [params, setParams] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [pageLimit, setPageLimit] = useState(5);
  const [loading, setLoading] = useState(false);
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
      page: 2,
      limit: pageLimit,
    });
  }, [searchParams]);

  const loadMoreProducts = async () => {
    // const page = params.page + 1;
    setParams((ps) => ({ ...ps, page: page + 1 }));

    setLoading(true);
    // const products = (await  ?? [];
    const posts = await getForumFilterPost(params);
    console.log(posts);

    if (!posts) {
      return new Error("Sorry, Product not found....");
    }
    setPosts((prev) => [...prev, ...posts?.data?.docs]);

    setLoading(false);
  };

  useEffect(() => {
    console.log("ASDFASDf");
    loadMoreProducts();
  }, [inView]);

  return (
    <div>
      <PostList posts={posts} />

      <div ref={ref}>{loading && <h1>loading......</h1>}</div>
    </div>
  );
};

export default LoadMorePost;
