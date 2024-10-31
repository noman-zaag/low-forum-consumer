"use client";

import Container from "@/components/common/container";
import Sidebar from "./profile/components/Sidebar";
import { useUiContext } from "@/contexts/UiContextProvider/uiContextProvider";

const ProfileLayout = ({ children }) => {
  const { blur } = useUiContext();

  return (
    <div className={`py-6 sm:py-8 md:py-12 ${blur ? "blur-sm" : ""}`}>
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 ">
        {/* Sidebar - occupies 4 columns on large screens */}
        <Sidebar />

        {/* Details section - occupies 10 columns on large screens */}
        <div className="lg:col-span-8 border rounded-tr-lg rounded-br-lg">{children}</div>
      </Container>
    </div>
  );
};

export default ProfileLayout;
