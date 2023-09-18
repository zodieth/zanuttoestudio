import React from "react";
import { differenceInMonths, differenceInDays } from "date-fns";

function CalculateUser({ user, setCalculateUser }) {
  let dobArray = user.fecha.toString().split("-");
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

  const date = new Date(year + 18, month, day);
  const fechaMoratoria2008 = new Date(2008, 12, 31);
  const fechaMoratoria2012 = new Date(2012, 3, 31);

  const excesoDeEdad =
    user.sexo === "MASCULINO" && age >= 65
      ? Math.round(
          differenceInDays(today, new Date(year + 65, month, day)) / 30
        ) / 2
      : user.sexo === "FEMENINO" && age >= 60
      ? Math.round(
          differenceInDays(today, new Date(year + 60, month, day)) / 30 / 2
        )
      : 0;

  const diferenciaMesesMoratoria2008 = Math.floor(
    differenceInMonths(fechaMoratoria2008, date) -
      user.hasta2008 -
      user.desde2009 -
      user.hasta2012 -
      user.desde2012 -
      excesoDeEdad
  );

  const diferenciaMesesMoratoria2012 = Math.floor(
    differenceInMonths(fechaMoratoria2012, date) -
      user.hasta2008 -
      user.desde2009 -
      user.hasta2012 -
      user.desde2012 -
      excesoDeEdad
  );

  const moratoria =
    user.fecha >= "1965-01-03" &&
    (user.sexo === "FEMENINO") | (user.fecha >= "1960-02-28") &&
    user.sexo === "MASCULINO"
      ? diferenciaMesesMoratoria2012
      : diferenciaMesesMoratoria2008;

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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex gap-4 items-center justify-center ">
                    <div className="izquierda">
                      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <tbody class="divide-y divide-gray-200">
                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Sexo
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {user.sexo}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Edad
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {age}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {user.sexo === "MASCULINO" && age >= 65
                                ? "YA TIENE LA EDAD JUBILATORIA"
                                : user.sexo === "FEMENINO" && age >= 60
                                ? "YA TIENE LA EDAD JUBILATORIA"
                                : "AÚN NO TIENE LA EDAD JUBILATORIA"}{" "}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Cantidad de aportes{" "}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {Number(user.hasta2008) +
                                Number(user.desde2009) +
                                Number(user.hasta2012) +
                                Number(user.desde2012)}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tareas de cuidado
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {user.hijos * 12 +
                                user.hijosAdoptados * 24 +
                                user.hijosDiscapacidad * 24 +
                                user.auh * 12}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Exceso de edad
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {excesoDeEdad}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="flex items-center justify-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Total
                              <h1 className="mx-1 text-xs">
                                (aportes + tareas de cuidado + exceso de edad)
                              </h1>
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {Number(user.hasta2008) +
                                Number(user.desde2009) +
                                Number(user.hasta2012) +
                                Number(user.desde2012) +
                                user.hijos * 12 +
                                user.hijosAdoptados * 24 +
                                user.hijosDiscapacidad * 24 +
                                user.auh * 1 +
                                excesoDeEdad}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>

                          <tr class="odd:bg-gray-50">
                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Puede abonar en moratoria
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {moratoria < 0 ? 0 : moratoria}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              {""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="m-1 mx-2">
                    <button
                      onClick={() => [setCalculateUser(false)]}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculateUser;
