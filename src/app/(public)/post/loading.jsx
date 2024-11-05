import Container from "@/components/common/container";
import React from "react";

const PostLoading = () => {
  return (
    <div className="py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-20">
          <div className="flex flex-col gap-4 animate-pulse col-span-2 lg:col-span-8">
            {/* Profile section skeleton */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2">
              {/* Name & image skeleton */}
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />

                <div className="w-24 h-4 bg-gray-300 rounded" />
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-300" />

              <div className="w-20 h-4 bg-gray-300 rounded" />

              <div className="hidden md:block w-px h-5 bg-gray-300" />

              <div className="w-24 h-4 bg-gray-300 rounded" />
            </div>

            {/* Post details skeleton */}
            <div className="flex flex-col gap-4">
              <div className="w-2/3 h-6 bg-gray-300 rounded-md" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded-md" />
                <div className="w-full h-4 bg-gray-300 rounded-md" />
                <div className="w-5/6 h-4 bg-gray-300 rounded-md" />
              </div>
            </div>

            {/* Like, comment, share section skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="w-8 h-4 bg-gray-300 rounded" />
                <div className="w-12 h-4 bg-gray-300 rounded" />
              </div>

              <div className="w-px h-5 bg-gray-300" />

              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="w-8 h-4 bg-gray-300 rounded" />
                <div className="w-12 h-4 bg-gray-300 rounded" />
              </div>

              <div className="w-px h-5 bg-gray-300" />

              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="w-12 h-4 bg-gray-300 rounded hidden sm:block" />
              </div>
            </div>

            {/* Comment section skeleton */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-1/2 h-6 bg-gray-300 rounded mb-2" />
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-1" />
              <div className="w-full h-4 bg-gray-300 rounded" />
            </div>

            {/* Comment input skeleton */}
            <div className="flex flex-col gap-3 items-start">
              <div className="w-full h-28 bg-gray-300 rounded-lg" />
              <div className="w-24 h-10 bg-gray-300 rounded-md" />
            </div>

            {/* Loading comments skeleton */}
            <div className="space-y-4">
              <div className="w-full h-6 bg-gray-300 rounded-md" />
              <div className="w-5/6 h-4 bg-gray-300 rounded-md" />
              <div className="w-4/6 h-4 bg-gray-300 rounded-md" />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <div className="border-b py-5 flex flex-col gap-2 animate-pulse">
              <div className="w-1/4 h-4 bg-gray-300 rounded-md" /> {/* Date Skeleton */}
              <div className="w-3/4 h-5 bg-gray-300 rounded-md" /> {/* Title Skeleton */}
              <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> {/* Category Skeleton */}
            </div>
            <div className="border-b py-5 flex flex-col gap-2 animate-pulse">
              <div className="w-1/4 h-4 bg-gray-300 rounded-md" /> {/* Date Skeleton */}
              <div className="w-3/4 h-5 bg-gray-300 rounded-md" /> {/* Title Skeleton */}
              <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> {/* Category Skeleton */}
            </div>
            <div className="border-b py-5 flex flex-col gap-2 animate-pulse">
              <div className="w-1/4 h-4 bg-gray-300 rounded-md" /> {/* Date Skeleton */}
              <div className="w-3/4 h-5 bg-gray-300 rounded-md" /> {/* Title Skeleton */}
              <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> {/* Category Skeleton */}
            </div>
            <div className="border-b py-5 flex flex-col gap-2 animate-pulse">
              <div className="w-1/4 h-4 bg-gray-300 rounded-md" /> {/* Date Skeleton */}
              <div className="w-3/4 h-5 bg-gray-300 rounded-md" /> {/* Title Skeleton */}
              <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> {/* Category Skeleton */}
            </div>
            <div className="border-b py-5 flex flex-col gap-2 animate-pulse">
              <div className="w-1/4 h-4 bg-gray-300 rounded-md" /> {/* Date Skeleton */}
              <div className="w-3/4 h-5 bg-gray-300 rounded-md" /> {/* Title Skeleton */}
              <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> {/* Category Skeleton */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostLoading;
