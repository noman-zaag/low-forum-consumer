import Container from "@/components/common/container";
import { getSinglePost } from "@/services/SinglePost";
import React from "react";
import SinglePostComponent from "./components/singlePostComponent";
import SingleRelatedPost from "./components/singleRelatedPost";

const SinglePostPageComponent = async ({ params }) => {
  const slug = params.id; // No need for `await` here
  let allPostForSameCategory;
  // fetch by id
  const singlePost = await getSinglePost(slug, "id");
  //   fetch by category
  if (singlePost) {
    allPostForSameCategory = await getSinglePost(slug, "category", singlePost?.data?.doc?.categoryId);
  }

  console.log(slug, { singlePost, allPostForSameCategory });

  return (
    <div>
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-20">
          {/* Single post component */}
          <div className="col-span-2 lg:col-span-8">
            <SinglePostComponent singlePost={singlePost?.data?.doc} />
          </div>

          {/* Related posts */}
          <div className="col-span-2 lg:col-span-4">
            <div>
              <h1 className="font-semibold text-xs sm:text-sm md:text-md lg:text-xl">Related Posts</h1>
              <div className="flex flex-col gap-4">
                {allPostForSameCategory?.data?.docs && allPostForSameCategory.data.docs.length > 0 ? (
                  allPostForSameCategory?.data?.docs?.slice(0, 5).map((post, index) => {
                    return <SingleRelatedPost post={post} />;
                  })
                ) : (
                  <div
                    className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-md"
                    style={{ backgroundColor: "#F3F4F5" }}
                  >
                    <svg
                      className="w-16 h-16 text-black mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 14l6-6m2 2L9 4m6 14H5.5A2.5 2.5 0 013 15.5V5.5A2.5 2.5 0 015.5 3h10a2.5 2.5 0 012.5 2.5V15.5a2.5 2.5 0 01-2.5 2.5z"
                      ></path>
                    </svg>
                    <h2 className="text-xl font-semibold text-black mb-2">No Related Posts Found</h2>
                    <p className="text-black text-center">
                      It looks like there are no posts available at the moment. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* <SingleRelatedPost allpost={allPostForSameCategory.data.docs} /> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SinglePostPageComponent;
