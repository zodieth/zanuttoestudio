import Image from "next/image";
import React from "react";
import logo from "../img/logo.png";
import TemporaryDrawer from "./Drawer";
import Link from "next/link";

function Header() {
  return (
    <div className="flex items-center justify-between bg-[#111827] h-20 px-6">
      <Link href="/">
        <Image src={logo} height={50} alt="logo " className="md:mx-10" />
      </Link>
      <div className="hidden md:flex items-center justify-center mx-40">
        {[
          "Inicio",
          // "Turnos",
          "Contacto",
        ].map((e, index) => (
          <span
            className="mx-2 text-bold cursor-pointer text-white hover:text-gray-100"
            key={index}
          >
            <Link
              href={
                e === "Inicio"
                  ? "/"
                  : e === "Contacto"
                  ? "https://api.whatsapp.com/send?phone=5491176293141&text=Hola%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20informaci%C3%B3n!"
                  : ""
              }
            >
              {e}
            </Link>
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center md:hidden">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
