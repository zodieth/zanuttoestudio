import React, { useState } from "react";
import { differenceInMonths, differenceInDays } from "date-fns";
import Resultados from "./Resultados";
import NumberForm from "./NumberForm";

function BasicForm({ setForm }) {
  const [firstForm, setFirstForm] = useState(true);
  const [sexo, setSexo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hijos, setHijos] = useState(0);
  const [aportando, setAportando] = useState("");

  // ------------Cálculo de edad----------------

  let dobArray = fecha.toString().split("-");
  let year = Number(dobArray[0]);
  let month = Number(dobArray[1]);
  let day = Number(dobArray[2]);
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDay = today.getDate();
  let age = currentYear - year;
  if (currentMonth < month || (currentMonth == month && currentDay < day)) {
    age--;
  }

  // ------------aportes----------------

  const [hasta2008, sethasta2008] = useState(0);
  const [desde2009, setDesde2009] = useState(0);

  const [hasta2012, sethasta2012] = useState(0);
  const [desde2012, setDesde2012] = useState(0);

  // ------------Cumple con edad jubilatoria?----------------

  const date = new Date(year + 18, month, day);
  const fechaMoratoria2008 = new Date(2008, 12, 31);
  const fechaMoratoria2012 = new Date(2012, 3, 31);

  const excesoDeEdad =
    sexo === "MASCULINO" && age >= 65
      ? Math.round(
          differenceInDays(today, new Date(year + 65, month, day)) / 30
        ) / 2
      : sexo === "FEMENINO" && age >= 60
      ? Math.round(
          differenceInDays(today, new Date(year + 60, month, day)) / 30 / 2
        )
      : 0;

  const diferenciaMesesMoratoria2008 =
    differenceInMonths(fechaMoratoria2008, date) - hasta2008 * 12;
  const diferenciaMesesMoratoria2012 =
    differenceInMonths(fechaMoratoria2012, date) - hasta2012 * 12;

  // ------------errores----------------
  const [errors, setErrors] = useState(true);
  const [showError, setShowError] = useState(false);

  // ------------segundo form----------------
  const [numForm, setNumForm] = useState(false);
  const [mensaje, setMensaje] = useState({
    fecha: "",
    hijos: 0,
    sexo: "",
    edadJubilatoria: "",
    moratoria: 0,
    numero: "",
    aportes: 0,
    hasta2008: 0,
    desde2009: 0,
    hasta2012: 0,
    desde2012: 0,
    excesoDeEdad: 0,
    comentarios: "",
    idInc: 0,
  });

  // -----------------------tercer cartel resultados---------------------------------
  const [resultados, setResultados] = useState(false);

  return (
    <>
      {firstForm ? (
        <div
          className="relative z-10 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

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
                      <p className="mt-4 text-center mx-4 text-1xl text-gray-500">
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
                            onClick={() => [
                              setSexo("FEMENINO"),
                              setErrors(false),
                            ]}
                            className={
                              sexo === "FEMENINO"
                                ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  "
                                : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 "
                            }
                          >
                            FEMENINO
                          </button>

                          <button
                            onClick={() => [
                              setSexo("MASCULINO"),
                              setErrors(false),
                            ]}
                            className={
                              sexo === "MASCULINO"
                                ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                                : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3  "
                            }
                          >
                            MASCULINO
                          </button>
                        </div>
                        {showError && sexo === "" ? (
                          <h1 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-red-600">
                            Debe seleccionar sexo
                          </h1>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* -------------------------- */}
                      {/* --------nacimiento-------- */}
                      <div>
                        <div className="mt-2 flex flex-row items-center justify-start ">
                          <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                            Fecha de nacimiento
                          </h2>
                          <input
                            onChange={(e) => setFecha(e.target.value)}
                            type="date"
                            min="1940-01-01"
                            max="2030-01-01"
                            className="mx-2 w-full text-black border-2 rounded-md "
                          />
                        </div>
                        {showError && fecha === "" ? (
                          <h1 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-red-600">
                            Debe seleccionar fecha de nacimiento
                          </h1>
                        ) : (
                          ""
                        )}
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
                              min={0}
                              onChange={(e) => setHijos(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* -------------------------- */}
                      {/* --------Si fecha hasta 31/12/1964 Aportes hasta 2008/desde 2008-------- */}
                      {/* --------Si fecha desde 01/01/1965 Aportes hasta 2012/desde 2012-------- */}

                      {fecha === "" ? (
                        ""
                      ) : fecha >= "1965-01-03" && sexo === "FEMENINO" ? (
                        <div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes hasta el año 2012 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => sethasta2012(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes desde el año 2012 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => setDesde2012(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                        </div>
                      ) : fecha <= "1965-02-28" && sexo === "FEMENINO" ? (
                        <div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes hasta 12/2008 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => sethasta2008(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes desde 01/2009 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => setDesde2009(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                        </div>
                      ) : fecha <= "1960-03-03" && sexo === "MASCULINO" ? (
                        <div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes hasta 12/2008 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => sethasta2008(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes desde 01/2009 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => setDesde2009(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                        </div>
                      ) : fecha >= "1960-02-28" && sexo === "MASCULINO" ? (
                        <div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes hasta el año 2012 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => sethasta2012(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                          <div className="mt-2 flex flex-row items-center justify-start ">
                            <h2 className="w-full mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                              Aportes desde el año 2012 (años)
                            </h2>
                            <input
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => setDesde2012(e.target.value)}
                              className="mx-2 w-full text-black border-2 rounded-md text-center"
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* ---------aportando----------------- */}
                      <div>
                        <h2 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-gray-900">
                          ¿Está aportando actualmente?
                        </h2>

                        <div className="mt-2 flex flex-row items-center justify-center w-full">
                          <button
                            onClick={() => [
                              setAportando(true),
                              setErrors(false),
                            ]}
                            className={
                              aportando === true
                                ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  "
                                : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 "
                            }
                          >
                            SI
                          </button>

                          <button
                            onClick={() => [
                              setAportando(false),
                              setErrors(false),
                            ]}
                            className={
                              aportando === false
                                ? "m-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                                : "m-2 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3  "
                            }
                          >
                            NO
                          </button>
                        </div>
                        {showError && aportando === "" ? (
                          <h1 className="mt-2 mx-2 flex items-center justify-start  font-semibold leading-6 text-1xl text-red-600">
                            Debe seleccionar si o no
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
                      errors
                        ? setShowError(true)
                        : [
                            setNumForm(true),
                            setFirstForm(false),
                            setMensaje({
                              ...mensaje,
                              fecha: fecha,
                              hijos: hijos,
                              sexo: sexo,
                              edadJubilatoria:
                                sexo === "MASCULINO" && age >= 65
                                  ? "USTED YA TIENE LA EDAD JUBILATORIA"
                                  : sexo === "FEMENINO" && age >= 60
                                  ? "USTED YA TIENE LA EDAD JUBILATORIA"
                                  : "USTED AÚN NO TIENE LA EDAD JUBILATORIA",

                              aportes:
                                hasta2008 * 12 +
                                desde2009 * 12 +
                                hasta2012 * 12 +
                                desde2012 * 12 +
                                hijos * 12 +
                                excesoDeEdad,
                              aportando: aportando,
                              moratoria:
                                fecha >= "1965-01-03" &&
                                (sexo === "FEMENINO") |
                                  (fecha >= "1960-02-28") &&
                                sexo === "MASCULINO"
                                  ? diferenciaMesesMoratoria2012
                                  : diferenciaMesesMoratoria2008,
                              hasta2008: hasta2008 * 12,
                              desde2009: desde2009 * 12,
                              hasta2012: hasta2012 * 12,
                              desde2012: desde2012 * 12,
                              excesoDeEdad: excesoDeEdad,
                              comentarios: "",
                              idInc: 0,
                            }),
                          ]
                    }
                  >
                    Continuar
                  </button>
                  <button
                    onClick={() => setForm(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {numForm === true ? (
        <NumberForm
          age={age}
          setMensaje={setMensaje}
          mensaje={mensaje}
          setShowError={setShowError}
          setNumForm={setNumForm}
          setResultados={setResultados}
          setForm={setForm}
          errors={errors}
        />
      ) : (
        ""
      )}
      {resultados === true ? (
        <Resultados mensaje={mensaje} setResultados={setResultados} />
      ) : (
        ""
      )}
    </>
  );
}

export default BasicForm;
