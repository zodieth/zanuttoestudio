"use client";
import { useState } from "react";

function FormularioAvanzado() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    extranjero: false,
    fecha: "",
    sexo: "MASCULINO",
    hijos: 0,
    hijosDiscapacidad: 0,
    hijosAdoptados: 0,
    num: 0,
    aportes: 0,
    hasta2008: 0,
    desde2009: 0,
    hasta2012: 0,
    desde2012: 0,
    moratoria: 0,
    auh: 0,
    aportando: false,
    status: "carpeta",
  });

  console.log(usuario);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-center mx-10">
        Completa el formulario para regularizar su situación previsional
      </h1>

      <div className="grid grid-cols-1">
        <div className="formulario grid grid-cols-2 mt-10 mx-6">
          <Nombre usuario={usuario} setUsuario={setUsuario} />
          <Sexo usuario={usuario} setUsuario={setUsuario} />
          <Extranjero usuario={usuario} setUsuario={setUsuario} />
          <Fecha usuario={usuario} setUsuario={setUsuario} />
        </div>
        <div className="formulario grid grid-cols-1 mx-6 ">
          {usuario.sexo === "FEMENINO" && (
            <Hijos usuario={usuario} setUsuario={setUsuario} />
          )}
          {usuario.hijos > 0 && (
            <Auh usuario={usuario} setUsuario={setUsuario} />
          )}
          <Aportes usuario={usuario} setUsuario={setUsuario} />
        </div>
      </div>
    </div>
  );
}

export default FormularioAvanzado;

const Nombre = ({ usuario, setUsuario }) => {
  return (
    <div className="nombre completo mx-2 m-2">
      <label className="">Nombre completo</label>
      <input
        type="text"
        id="Search"
        placeholder="Nombre ..."
        className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
      />
    </div>
  );
};

const Extranjero = ({ usuario, setUsuario }) => {
  return (
    <div className="nombre completo w-full mx-2 m-2">
      <label className="text-center">¿Es extranjero?</label>
      <div className="flex flex-row items-center justify-center w-full">
        {["SI", "NO"].map((e) => (
          <button
            className={
              (e === "SI") & (usuario.extranjero === true)
                ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : (e === "NO") & (usuario.extranjero === false)
                ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
            }
            onClick={() =>
              e === "SI"
                ? setUsuario({ ...usuario, extranjero: true })
                : setUsuario({ ...usuario, extranjero: false })
            }
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};

const Sexo = ({ usuario, setUsuario }) => {
  return (
    <div className="nombre completo mx-2 w-full m-2 ">
      <label className="text-center">Sexo</label>
      <div className="flex flex-row items-center justify-center w-full">
        {["FEMENINO", "MASCULINO"].map((e, index) => (
          <button
            key={index}
            className={
              (e === "FEMENINO") & (usuario.sexo === "FEMENINO")
                ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : (e === "MASCULINO") & (usuario.sexo === "MASCULINO")
                ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
            }
            onClick={() =>
              e === "FEMENINO"
                ? setUsuario({ ...usuario, sexo: "FEMENINO" })
                : setUsuario({ ...usuario, sexo: "MASCULINO" })
            }
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};

const Fecha = ({ usuario, setUsuario }) => {
  return (
    <div className="mx-2 m-2 w-full">
      <label className="">
        {usuario.extranjero
          ? "Fecha de ingreso al país"
          : "Fecha de nacimiento"}
      </label>
      <input
        type="date"
        id="Search"
        className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        onChange={(e) => setUsuario({ ...usuario, fecha: e.target.value })}
      />
    </div>
  );
};

const Hijos = ({ usuario, setUsuario }) => {
  return (
    <div className="mx-2 m-2 w-full flex flex-col justify-between">
      <label className="text-center">
        {usuario.extranjero ? (
          <h1 className="mb-2">Hijos nacidos en Argentina</h1>
        ) : (
          ""
        )}
      </label>
      <div className="flex items-center">
        <div className="mx-1">
          <label className="text-sm">Hijos naturales</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) => setUsuario({ ...usuario, hijos: e.target.value })}
          />
        </div>
        <div className="mx-1">
          <label className="text-sm">Hijos discapacitados</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) =>
              setUsuario({ ...usuario, hijosDiscapacidad: e.target.value })
            }
          />
        </div>
        <div className="mx-1">
          <label className="text-sm">Hijos adoptados</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) =>
              setUsuario({ ...usuario, hijosAdoptados: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

const Auh = ({ usuario, setUsuario }) => {
  const [auh, setAuh] = useState(false);

  return (
    <div className="mx-2 m-2 w-full">
      <label className="">
        ¿Cobra o cobró AUH (Asignación Universal por Hijo)?
      </label>
      <div className="flex">
        {["SI", "NO"].map((e, index) => (
          <button
            key={index}
            className={
              (e === "SI") & (auh === true)
                ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : (e === "NO") & (auh === false)
                ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
            }
            onClick={() => (e === "SI" ? setAuh(true) : setAuh(false))}
          >
            {e}
          </button>
        ))}
      </div>
      {auh && (
        <div className="mt-2 flex-col">
          <label className="">
            <div className="">
              <div className="flex items-center justify-start text-xs md:text-lg">
                ¿Por cuántos hijos cobra o cobró AUH?
                <h1 className="text-xs mx-1 md:text-1xl">
                  (Seleccione la cantidad de hijos)
                </h1>
              </div>
            </div>
          </label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) => setUsuario({ ...usuario, auh: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};

const Aportes = (usuario, setUsuario) => {
  return (
    <div className="mx-2 m-2 w-full">
      <label className="">Cantidad de años aportados</label>
      <div className="flex">
        <div className="mx-1">
          <label className="text-sm">
            {/* {(usuario.fecha >= "1965-01-03" && usuario.sexo === "FEMENINO") |
            (usuario.fecha >= "1960-02-28" && usuario.sexo === "MASCULINO") ? (
              <h1>Hasta 2012</h1>
            ) : (
              <h1>Aportes hasta 12/2008</h1>
            )} */}
          </label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) => setUsuario({ ...usuario, auh: e.target.value })}
          />
        </div>
        <div className="mx-1">
          <label className="text-sm">desde</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="mt-1 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(e) => setUsuario({ ...usuario, auh: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
