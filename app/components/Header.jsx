import Image from "next/image";
import React from "react";
import logo from "../img/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import TemporaryDrawer from "./Drawer";

function Header() {
  return (
    <div className="flex items-center justify-between bg-[#006CCF] h-20 px-6">
      <Image src={logo} height={50} alt="logo" />
      <div className="flex items-center justify-center md:hidden">
        {/* <RxHamburgerMenu size={30} className="text-white cursor-pointer " /> */}
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
