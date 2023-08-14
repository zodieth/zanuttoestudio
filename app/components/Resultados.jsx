"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPeople } from "../redux/features/peopleSlice";
import { api } from "../page";

function Resultados({ mensaje, setResultados }) {
  const data = useSelector((state) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("people").then((data) => dispatch(addPeople(data.data)));
  }, [dispatch]);

  const filterNumbers = data.people?.filter((e) => mensaje.numero === e.num);

  const equalPerson = data.people?.filter(
    (e) => (e.fecha === mensaje.fecha) & (e.num === mensaje.numero)
  );

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
                    className="mb-1 text-center flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {equalPerson.length >= 1
                      ? "YA HAY UN USUARIO REGISTRADO CON SU NÚMERO Y FECHA DE NACIMIENTO"
                      : filterNumbers.length === 3
                      ? "YA HAY 3 USUARIOS REGISTRADOS CON ESTE NÚMERO"
                      : mensaje.edadJubilatoria}
                  </h3>
                  <p className=" mx-4 text-1xl text-gray-500">
                    {equalPerson.length >= 1 ? (
                      "Para realizar otra consulta ultilice otro número"
                    ) : filterNumbers.length === 3 ? (
                      "Para realizar otra consulta ultilice otro número"
                    ) : (
                      <div>
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-xs flex flex-row mt-2">
                            <h1>
                              ATENCIÓN (Este cálculo es general y aproximado.
                              Obtenga su análisis completo haciendo click en
                              CONTINUAR)
                            </h1>
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          - Aportes: {mensaje.aportes}{" "}
                          {mensaje.aportes < 360
                            ? `(Recuerde que necesita acumular 360 meses para cumplir los requisitos de su jubilación, le faltan ${
                                360 - mensaje.aportes
                              })
                              `
                            : ""}
                        </div>
                        <div>
                          - Puede abonar en moratoria: {mensaje.moratoria} meses
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={() => setResultados(false)}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
        {/* --------------------------- */}
      </div>
    </div>
  );
}

export default Resultados;
