import React from "react";
import Container from "@/components/common/container";

const HomePageLoading = () => {
  return (
    <div className="space-y-16">
      {/* Hero section skeleton */}
      <div className="relative h-[555px] w-full flex items-center justify-start px-8 lg:px-16">
        {/* Background Image Skeleton */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md"></div>

        <Container className={"flex items-center justify-center"}>
          <div className="relative z-10 flex flex-col items-start justify-center w-full">
            {/* Dark Overlay Skeleton */}
            <div className="absolute inset-0 opacity-50"></div>

            {/* Text Content Skeleton */}
            <div className="relative w-full text-white space-y-4 animate-pulse">
              <div className="h-4 w-1/4 bg-gray-500 rounded-md mb-2"></div> {/* Simulating "Welcome to Lawying" text */}
              <div className="h-8 w-3/4 bg-gray-500 rounded-md mb-4"></div>{" "}
              {/* Simulating "Your Legal Discussion Hub" text */}
              <div className="h-4 w-full bg-gray-500 rounded-md mb-6"></div> {/* Simulating description text */}
              <div className="flex items-center gap-3 bg-gray-500 px-6 py-3 rounded-md w-40">
                <div className="h-5 w-10 bg-gray-400 rounded-md"></div> {/* Simulating "Get Started" text */}
                <div className="h-5 w-5 bg-gray-400 rounded-full"></div> {/* Icon */}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Category section skeleton */}
      <Container>
        <div className="my-16">
          <div className="flex flex-col gap-6">
            <div className="h-4 w-48 bg-gray-400 rounded-md mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-200 p-4 rounded-md border border-gray-300 animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-400 rounded-md w-1/2"></div>
                    <div className="h-3 bg-gray-400 rounded-md w-3/4"></div>
                  </div>
                  <div className="h-4 bg-gray-400 rounded-md w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Post section skeleton */}
      <Container className={"mt-5"}>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-48 bg-gray-400 rounded-md"></div>
            <div className="h-10 w-36 bg-gray-400 rounded-md"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="py-4 border-b border-gray-300 animate-pulse">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-gray-400 rounded-md"></div>
                    <div className="h-4 w-1/4 bg-gray-400 rounded-md"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-2">
                  <div className="h-6 bg-gray-400 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-400 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-400 rounded-md w-5/6"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-5 w-16 bg-gray-400 rounded-md"></div>
                  <div className="h-5 w-16 bg-gray-400 rounded-md"></div>
                  <div className="h-5 w-16 bg-gray-400 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePageLoading;
