"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPeople } from "../redux/features/peopleSlice";
import { api } from "../page";
import { BsWhatsapp, BsDot } from "react-icons/bs";
import {
  differenceInMonths,
  differenceInDays,
  differenceInYears,
} from "date-fns";

import Link from "next/link";

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

  let dobArray = mensaje.fecha.toString().split("-");
  let year = Number(dobArray[0]);
  let month = Number(dobArray[1]);
  let day = Number(dobArray[2]);
  let today = new Date();

  const edadJubilatoria =
    mensaje.sexo === "FEMENINO"
      ? new Date(year + 60, month, day)
      : new Date(year + 65, month, day);

  const fechaMoratoria = new Date(2025, 1, 1);

  const pasoDelTiempo =
    Math.round(differenceInDays(fechaMoratoria, edadJubilatoria) / 30 / 2) -
    mensaje.excesoDeEdad;

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
                  <div className=" mx-4 text-1xl text-gray-500">
                    {/* {equalPerson.length >= 1 ? (
                      "Para realizar otra consulta ultilice otro número"
                    ) : filterNumbers.length === 3 ? (
                      "Para realizar otra consulta ultilice otro número"
                    ) : ( */}
                    <>
                      <div className="">
                        <div className="flex flex-row items-center text-sm mt-2 ">
                          <h1>
                            • Aportes: <strong>{mensaje.aportes} </strong>{" "}
                            {mensaje.aportes < 360 ? (
                              <>
                                (Recuerde que necesita acumular 360 meses para
                                cumplir los requisitos de su jubilación, le
                                faltan
                                <strong> {360 - mensaje.aportes}</strong>){" "}
                              </>
                            ) : (
                              <h1>
                                Aportes: <strong>{mensaje.aportes} </strong>,
                                Tiene la cantidad de aportes necesarios para
                                jubilarse.
                              </h1>
                            )}
                          </h1>
                        </div>
                        {mensaje.aportes >= 360 ? (
                          ""
                        ) : (
                          <div className="flex flex-row items-center text-sm mt-2">
                            <h1>
                              • Puede abonar en moratoria:{" "}
                              {mensaje.moratoria > 360 - mensaje.aportes ? (
                                <>
                                  <strong>{360 - mensaje.aportes}</strong> meses
                                </>
                              ) : (
                                <>
                                  <strong>{mensaje.moratoria}</strong> meses,
                                  pero aún asi no alcanzaría la cantidad
                                  necesaria para jubilarse. Le harían falta un
                                  total de{" "}
                                  <strong>
                                    {360 - mensaje.moratoria - mensaje.aportes}
                                  </strong>{" "}
                                  meses adicionales.
                                  <div className="mt-2">
                                    {mensaje.fecha >= "1965-01-03" ? (
                                      ""
                                    ) : (
                                      <div>
                                        {pasoDelTiempo * 2 >
                                        360 -
                                          mensaje.moratoria -
                                          mensaje.aportes ? (
                                          <>
                                            • La primera opción sería por el
                                            paso del tiempo: En{" "}
                                            <strong>
                                              {pasoDelTiempo}
                                              {/* poner meses exactos */}
                                            </strong>{" "}
                                            meses tendría la opción de acceder a
                                            su jubilación
                                          </>
                                        ) : (
                                          <>
                                            {" "}
                                            • Con el paso del tiempo podrá
                                            obtener{" "}
                                            <strong>
                                              {pasoDelTiempo}
                                            </strong>{" "}
                                            meses por el exceso de edad pero no
                                            llega a la cantidad de aportes
                                            necesarios
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}{" "}
                            </h1>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-xs flex flex-row mt-2">
                          <h1>
                            <strong className="text-red-500">ATENCIÓN</strong>{" "}
                            (Este cálculo es general y aproximado. Obtenga su
                            análisis completo haciendo click en{" "}
                            <strong className="text-blue-600">CONTINUAR</strong>
                            )
                          </h1>
                        </div>
                      </div>
                    </>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link href="https://api.whatsapp.com/send?phone=541139193711&text=Hola%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20informaci%C3%B3n!">
                <button
                  type="button"
                  className="flex flex-row items-center justify-center gap-2  w-full  rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  onClick={() => setResultados(false)}
                >
                  Continuar
                  {/* <BsWhatsapp size={15} /> */}
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* --------------------------- */}
      </div>
    </div>
  );
}

export default Resultados;
