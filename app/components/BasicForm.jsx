import React, { useState } from "react";

function BasicForm({ setForm }) {
  const [sexo, setSexo] = useState("");
  const [fecha, setFecha] = useState(false);
  const [hijos, setHijos] = useState(0);
  const [num, setNum] = useState("");

  // ------------aportes----------------

  const [hasta2008, sethasta2008] = useState(0);
  const [desde2008, setDesde2008] = useState(0);

  const [hasta2012, sethasta2012] = useState(0);
  const [desde2012, setDesde2012] = useState(0);

  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>

      <div className=" flex items-center justify-center fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Completar formulario
                  </h3>
                  <p className=" mx-4 text-1xl text-gray-500">
                    Completá este formulario para obtener tus resultados de
                    jubilación
                  </p>
                  {/* -----------sexo--------------- */}

                  <div>
                    <h2 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                      Sexo
                    </h2>

                    <div className="mt-2 flex flex-row items-center justify-center w-full">
                      <button
                        onClick={() => setSexo("FEMENINO")}
                        className={
                          sexo === "FEMENINO"
                            ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  "
                            : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 "
                        }
                      >
                        FEMENINO
                      </button>
                      <button
                        onClick={() => setSexo("MASCULINO")}
                        className={
                          sexo === "MASCULINO"
                            ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                            : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3  "
                        }
                      >
                        MASCULINO
                      </button>
                    </div>
                  </div>
                  {/* -------------------------- */}
                  {/* --------nacimiento-------- */}
                  <div>
                    <div className="mt-2 flex flex-row items-center justify-start ">
                      <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                        Fecha de naciemiento
                      </h2>
                      <input
                        type="date"
                        onChange={(e) => setFecha(e.target.value)}
                        className="mx-2 w-full text-black border-2 rounded-md "
                      />
                    </div>
                  </div>
                  {/* -------------------------- */}
                  {/* --------Hijos si es mujer-------- */}
                  {sexo === "FEMENINO" ? (
                    <div>
                      <div className="mt-2 flex flex-row items-center justify-start ">
                        <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          Cantidad de hijos
                        </h2>
                        <input
                          type="number"
                          onChange={(e) => setHijos(e.target.value)}
                          className="mx-2 w-full text-black border-2 rounded-md "
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* -------------------------- */}
                  {/* --------Si fecha hasta 31/12/1964 Aportes hasta 2008/desde 2008-------- */}
                  {/* --------Si fecha desde 01/01/1965 Aportes hasta 2012/desde 2012-------- */}
                  {fecha >= "1965-01-01" ? (
                    <div>
                      <div className="mt-2 flex flex-row items-center justify-start ">
                        <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          Aportes hasta 2012 (años)
                        </h2>
                        <input
                          type="number"
                          onChange={(e) => sethasta2012(e.target.value)}
                          className="mx-2 w-full text-black border-2 rounded-md "
                        />
                      </div>
                      <div className="mt-2 flex flex-row items-center justify-start ">
                        <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          Aportes desde 2012 (años)
                        </h2>
                        <input
                          type="number"
                          onChange={(e) => setDesde2012(e.target.value)}
                          className="mx-2 w-full text-black border-2 rounded-md "
                        />
                      </div>
                    </div>
                  ) : fecha <= "1964-12-31" ? (
                    <div>
                      <div className="mt-2 flex flex-row items-center justify-start ">
                        <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          Aportes hasta 2008 (años)
                        </h2>
                        <input
                          type="number"
                          onChange={(e) => sethasta2008(e.target.value)}
                          className="mx-2 w-full text-black border-2 rounded-md "
                        />
                      </div>
                      <div className="mt-2 flex flex-row items-center justify-start ">
                        <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          Aportes desde 2008 (años)
                        </h2>
                        <input
                          type="number"
                          onChange={(e) => setDesde2008(e.target.value)}
                          className="mx-2 w-full text-black border-2 rounded-md "
                        />
                      </div>
                    </div>
                  ) : !fecha ? (
                    ""
                  ) : (
                    ""
                  )}
                  {/* -------------------------- */}
                  {/* -----------número--------------- */}
                  <div>
                    <div className="mt-2 flex flex-row items-center justify-start ">
                      <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                        Número de teléfono
                      </h2>
                      <input
                        type="text"
                        onChange={(e) => setNum(e.target.value)}
                        className="mx-2 w-full text-black border-2 rounded-md "
                      />
                    </div>
                  </div>
                  {/* -------------------------- */}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Continuar
              </button>
              <button
                onClick={() => setForm(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicForm;
