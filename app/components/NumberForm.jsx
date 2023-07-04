import React, { useState } from "react";
import { createPerson, sendMsg } from "../lib/utils";

function NumberForm({
  setMensaje,
  mensaje,
  setNumForm,
  setResultados,
  setForm,
  age,
}) {
  const [error, setError] = useState(false);
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
                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    OBTENGA LOS RESULTADOS CON SU NÚMERO
                  </h3>
                  <p className=" mx-4 text-1xl text-gray-500">
                    Complete con su número telefónico para obtener los
                    resultados via whatsapp
                  </p>

                  {/* -------------------------- */}
                  {/* -----------número--------------- */}
                  <div>
                    <div className="mt-2 flex flex-row items-center justify-start ">
                      <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                        Número de teléfono (+54)
                      </h2>

                      <input
                        type="number"
                        onChange={(e) =>
                          setMensaje({
                            ...mensaje,
                            numero: e.target.value,
                          })
                        }
                        className="mx-2 w-full text-black border-2 rounded-md "
                      />
                    </div>
                    {error &&
                    !mensaje.numero.length | error &&
                    mensaje.numero.length < 10 ? (
                      <h1 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-red-600">
                        Debe agregar un número de teléfono que contenga al menos
                        10 caracteres
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* -------------------------- */}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={() =>
                  !mensaje.numero.length | (mensaje.numero.length < 10)
                    ? setError(true)
                    : [
                        setNumForm(false),
                        setResultados(true),
                        createPerson({
                          nombre: "",
                          sexo: mensaje.sexo,
                          fecha: mensaje.fecha,
                          hijos: mensaje.hijos,
                          num: mensaje.numero,
                          aportes: mensaje.aportes,
                          hasta2008: mensaje.hasta2008,
                          desde2009: mensaje.desde2009,
                          hasta2012: mensaje.hasta2012,
                          desde2012: mensaje.desde2012,
                          moratoria: mensaje.moratoria,
                        }),
                      ]
                }
              >
                Continuar
              </button>
              <button
                onClick={() => [setForm(false)]}
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

export default NumberForm;
