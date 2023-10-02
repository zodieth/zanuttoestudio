"use client";
import React, { useState } from "react";
import BasicForm from "./BasicForm";
import banner from "../img/banner zanutto.jpg";
import Image from "next/image";

function Banner() {
  const [form, setForm] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40rem] text-white bg-center bg-cover bg-blend-overlay bg-fixed md:items-start "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dyo8w75kn/image/upload/v1693500690/Hello_March_Spring_Flowers_Bloom_Quote_Blog_Banner_5_xwr1ol.jpg')",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="flex items-center justify-center md:mx-40 lg:mx-[20rem] mb-5">
        <div className="flex flex-col justify-center items-center mx-auto  ">
          <div className="font-semibold text-center md:text-left">
            <h1 className="my-2 text-5xl md:text-8xl">
              HACÉ TU <br />
            </h1>
            <h1 className="my-2 text-5xl md:text-8xl">
              CÁLCULO <br />
            </h1>
            <h1 className="my-2 text-5xl md:text-8xl"> JUBILATORIO</h1>

            <p className="font-light text-1xl mt-3 mx-5">
              GRATIS Y EN TRES SIMPLES PASOS{" "}
            </p>
            <button
              onClick={() => setForm(true)}
              className="mx-5 px-6 py-2 inline-block bg-white text-[1.25rem] font-bold text-black hover:bg-gray-100 transition-colors mt-5 rounded-md"
            >
              HACER CÁLCULO
            </button>
          </div>

          {form ? <BasicForm setForm={setForm} /> : ""}
        </div>
      </div>
    </div>
  );
}

// violeta: bg-[#2e1cff] hover:bg-[#4B3AFF]

export default Banner;
