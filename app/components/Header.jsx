import Image from "next/image";
import React from "react";
import logo from "../img/logo.png";
import TemporaryDrawer from "./Drawer";
import Link from "next/link";

function Header() {
  return (
    <div className="flex items-center justify-between bg-[#006CCF] h-20 px-6">
      <Link href="/">
        <Image src={logo} height={50} alt="logo " className="md:mx-10" />
      </Link>
      <div className="hidden md:flex items-center justify-center mx-40">
        {["Home", "Contacto", "Turnos"].map((e) => (
          <span className="mx-2 text-white">{e}</span>
        ))}
      </div>
      <div className="flex items-center justify-center md:hidden">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
