import React from "react";
import Container from "../common/container";
import Icons from "../../../public/assets/icon";
import Image from "next/image";

const Header = ({ children }) => {
  const menus = [
    { name: "Home", link: "" },
    { name: "Forum", link: "" },
    { name: "Who We Are", link: "" },
    { name: "Contact", link: "" },
  ];

  return (
    <div className="bg-primary py-[20px] h-[88px]">
      <Container className="">
        <div className="flex flex-row items-center justify-between h-full">
          {/* Icons part */}
          <div className="flex items-end gap-12">
            <Image src={Icons.iconWhite} height={1000} width={1000} className="h-[30px] w-[105px]" />

            <div className="flex flex-row gap-4 text-white">
              {menus.map((menu, index) => {
                return (
                  <p className="text-sm font-medium cursor-pointer" key={index}>
                    {menu.name}
                  </p>
                );
              })}
            </div>
          </div>

          {/* search part */}
          <div className="flex items-end gap-12">
            <p className="text-white t">df</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
