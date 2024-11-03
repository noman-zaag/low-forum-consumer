import React from "react";
import Container from "@/components/common/container";
import axiosPublicInstance from "@/config/axiosPublic";
import { USERS_URL, VIEW_IMAGE } from "@/constant/apiUrls";
import SinglePost from "@/app/(protected)/profile/my-account/components/singlePost";

const getSingleProfileInfo = async (id) => {
  try {
    const response = await axiosPublicInstance.get(`${USERS_URL}?id=${id}`);
    console.log(await response);
    return response;
  } catch (e) {
    console.log(e?.message);
  }
};

const PublicProfilePage = async ({ params }) => {
  const id = params?.id;
  const userProfile = await getSingleProfileInfo(id);

  const user = userProfile?.data?.doc;
  console.log(user);

  return (
    <Container className={"py-16"}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-start gap-2 md:gap-4 lg:gap-4">
          <div className="relative w-32 h-32">
            {/* Profile Image */}
            <img
              src={
                user?.profilePicture
                  ? `${VIEW_IMAGE}${user?.profilePicture}`
                  : "/assets/images/default_profile_image.svg"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
          <p className="font-semibold test-xs sm:text-sm md:text-base xl:text-xl">{user?.firstName}</p>
        </div>

        {/* Basic profile info */}
        <div className="flex flex-col md:flex-row items-start md:items-center lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-4">
            <p>
              Occupation : <span className="text-text_secondary">{user?.occupation}</span>
            </p>
            <p>
              Email: <span className="text-text_secondary">{user?.primaryEmail}</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 w-[40%]">
            <p>
              Specialty:
              <span className="py-2 px-3 border border-primary bg-background1 text-primary rounded-full ml-2">
                {user?.legalSpecialty}
              </span>
            </p>

            <p className="flex gap-2">
              Location: <span className="text-text_secondary w-full line-clamp-2">{user?.location}</span>
            </p>
          </div>
        </div>

        {user.recentPosts.length ? (
          <div className="flex flex-col gap-2">
            {user.recentPosts.map((post, index) => {
              return (
                <div key={index}>
                  <SinglePost post={post} />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-md"
            style={{ backgroundColor: "#3fa397" }}
          >
            <svg
              className="w-16 h-16 text-white mb-4"
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
            <h2 className="text-xl font-semibold text-white mb-2">No Posts Found</h2>
            <p className="text-white text-center">
              It looks like there are no posts available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PublicProfilePage;
