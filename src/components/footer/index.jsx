import React from "react";
import Container from "../common/container";
import Image from "next/image";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const lawyingLinks = [
    { name: "Home", link: "" },
    { name: "Forum", link: "" },
    { name: "Who We Are", link: "" },
    { name: "Connect", link: "" },
    { name: "Terms & Conditions", link: "" },
    { name: "Privacy Policy", link: "" },
  ];

  const forumCategories = [
    { name: "Bankruptcy", link: "" },
    { name: "Civil", link: "" },
    { name: "Criminal", link: "" },
    { name: "Administration", link: "" },
    { name: "Labor", link: "" },
    { name: "Tax", link: "" },
  ];

  return (
    <div className="bg-primary text-white">
      <Container>
        <div className="py-16 grid grid-cols-12 gap-4">
          {/* Icon and Summary */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Image
              src="/assets/icon/iconWhite.svg"
              width={1000}
              height={1000}
              className="w-[135px] h-[40px]"
              loading="eager"
              quality={100}
            />
            <p className="mt-4 leading-[30px] text-justify">
              Welcome to Lawying, a dedicated platform for legal professionals to connect, collaborate, and discuss law
              matters. Share insights, seek advice, and engage in meaningful conversations with fellow lawyers. Join us
              to expand your knowledge and network within the legal community!
            </p>
          </div>

          {/* Spacer for layout adjustment on larger screens */}
          <div className="hidden lg:block lg:col-span-4"></div>

          {/* Lawying Links */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-2">
            <p className="font-medium text-lg">Lawying</p>
            {lawyingLinks.map((link, index) => (
              <Link href={link.link} key={index}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Forum Category Links */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-2">
            <p className="font-medium text-lg">Forum Category</p>
            {forumCategories.map((link, index) => (
              <Link href={link.link} key={index}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center border-t border-[#F3F4F53D] py-4">
          <div className="flex items-center justify-center gap-2">
            <FaRegCopyright />
            <span className="text-[#F5F5F5]">All rights reserved</span>
            <span className="text-[#fff]">Lawying.com</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

// <Container>
//   <div className="py-16 grid grid-cols-12">
//     <div className="col-span-4">
//       {/* Icon */}
//       <Image
//         src="/assets/icon/iconWhite.svg"
//         width={1000}
//         height={1000}
//         className="w-[135px] h-[40px]"
//         loading="eager"
//         quality={100}
//       />
//       {/* summary */}
//       <p className="mt-4 leading-[30px]">
//         Welcome to Lawying, a dedicated platform for legal professionals to connect, collaborate, and discuss law
//         matters. Share insights, seek advice, and engage in meaningful conversations with fellow lawyers. Join us
//         to expand your knowledge and network within the legal community!
//       </p>
//     </div>
//     <d className="col-span-4" />
//     <div className="col-span-2 flex flex-col gap-2">
//       <p className="font-medium text-lg">Lawying</p>
//       {lawyingLinks.map((link, index) => {
//         return (
//           <Link href={link.link} className="" key={index}>
//             {link.name}
//           </Link>
//         );
//       })}
//     </div>
//     <div className="col-span-2 flex flex-col gap-2">
//       <p className="font-medium text-lg">Forum Category</p>
//       {forumCategories.map((link, index) => {
//         return (
//           <Link href={link.link} className="" key={index}>
//             {link.name}
//           </Link>
//         );
//       })}
//     </div>
//   </div>
// </Container>
