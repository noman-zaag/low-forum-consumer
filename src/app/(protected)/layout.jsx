"use client";

import Container from "@/components/common/container";
import { useUserContext } from "@/contexts/UserContextProvider";
import React from "react";

const ProfileLayout = ({ children }) => {
  const { user } = useUserContext();
  return (
    <div className="py-6 sm:py-8 md:py-12">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 ">
        {/* Sidebar - occupies 4 columns on large screens */}
        <div className="lg:col-span-4 border bg-background1 rounded-lg md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none">
          <div className="px-6 py-8 ">
            <p>Profile</p>
          </div>
        </div>

        {/* Details section - occupies 10 columns on large screens */}
        {/* Details section content here */}
        <div className="lg:col-span-8 border rounded-tr-lg rounded-br-lg">{children}</div>
      </Container>
    </div>
  );
};

export default ProfileLayout;
