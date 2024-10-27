import Container from "@/components/common/container";
import React from "react";

const TermsAndConditionPage = () => {
  return (
    <div className="">
      {/* Upper section */}
      <div className="relative h-[307px] w-full flex items-center justify-start px- lg:px-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/assets/images/about_us_image2.svg"})`, // Replace with the actual path to your background image
          }}
        ></div>
        <Container className={"flex flex-col items-start justify-center"}>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text Content */}
          <div className="relative z-10 text-white">
            {/* <h3 className="text-sm font-semibold tracking-widest uppercase mb-2">Welcome to Lawying</h3> */}
            <h1 className="text-4xl lg:text-[58px] font-bold  mb-4">Terms And Condition</h1>
          </div>
        </Container>
      </div>

      {/* Category section */}

      <Container>
        <div className="my-16 flex flex-col gap-6">
          <h1 className="text-sm md:text-base lg:text-2xl font-semibold">Who We Are</h1>

          <p className="leading-6 text-base text-justify">
            At Lawying, we are passionate about creating a space where legal professionals, students, and anyone seeking
            legal advice can come together to share knowledge, ask questions, and engage in meaningful discussions. Our
            platform bridges the gap between legal experts and those seeking guidance, making legal information more
            accessible and collaborative.
          </p>

          <p className="leading-6 text-base text-justify">
            Founded with the vision of fostering a community of legal minds, Lawying is a user-friendly, intuitive
            platform designed to encourage open dialogue on various branches of law, from criminal to commercial,
            family, and beyond. Whether you’re a seasoned attorney or just starting your legal journey, Lawying provides
            a space to learn, contribute, and grow.
          </p>

          <p className="leading-6 text-base text-justify">
            Our mission is simple: to empower people through shared legal knowledge, helping users find answers and
            insights from experts across the legal field. With Lawying, we aim to make legal discussions accessible,
            professional, and engaging for all.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditionPage;
