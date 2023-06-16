"use client";
import Image from "next/image";
import React, { useState } from "react";
import banner from "../img/background.png";

import BasicForm from "./BasicForm";

function Banner() {
  const [form, setForm] = useState(false);
  const [sexo, setSexo] = useState("");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40rem] bg-slate-800 text-white bg-center bg-cover bg-blend-overlay bg-fixed bg-black/30"
      style={{
        backgroundImage:
          "url('https://media.discordapp.net/attachments/470413233681989642/1119338088523632730/nashe.png?width=810&height=399')",
      }}
    >
      <div className="flex-1 flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center  mx-auto">
          <h1 className="text-4xl font-semibold md:text-6xl">
            Averiguá si te podés jubilar{" "}
          </h1>
          <p className="font-light text-1xl mt-5 w-[25rem] md:w-[40rem] lg:w-[50rem] md:text-2xl ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero
          </p>
          <button
            onClick={() => setForm(true)}
            className="px-6 py-2 inline-block bg-[#2e1cff] text-1xl font-bold text-white hover:bg-[#4B3AFF] transition-colors mt-10 rounded-[1rem]"
          >
            Consultá
          </button>
          {form ? <BasicForm setForm={setForm} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Banner;
