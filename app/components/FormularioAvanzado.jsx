"use client";
import { useState } from "react";

function FormularioAvanzado() {
  const [nombre, setNombre] = useState("");
  const [extranjero, setExtranjero] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-center">
        Completa el formulario para regularizar su situación previsional
      </h1>

      <div className="formulario flex items-center justify-center mt-10 mx-6">
        <Nombre setNombre={setNombre} />
        <Extranjero extranjero={extranjero} setExtranjero={setExtranjero} />
      </div>
    </div>
  );
}

export default FormularioAvanzado;

const Nombre = ({ setNombre }) => {
  return (
    <div className="nombre completo mx-1">
      <label className="">Nombre completo</label>
      <input
        type="text"
        id="Search"
        placeholder="Nombre ..."
        className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        onChange={(e) => setNombre(e.target.value)}
      />
    </div>
  );
};

const Extranjero = ({ extranjero, setExtranjero }) => {
  return (
    <div className="nombre completo mx-1 w-full">
      <label className="text-center">¿Es extranjero?</label>
      <div className="flex flex-row items-center justify-center w-full">
        {["SI", "NO"].map((e) => (
          <button
            className={
              (e === "SI") & (extranjero === true)
                ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : (e === "NO") & (extranjero === false)
                ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
            }
            onClick={() =>
              e === "SI" ? setExtranjero(true) : setExtranjero(false)
            }
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};
