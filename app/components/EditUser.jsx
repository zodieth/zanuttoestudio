import React, { useState } from "react";
import { updateUser } from "../lib/utils";
import { useDispatch } from "react-redux";
import { changeLoading, editPerson } from "../redux/features/peopleSlice";
import { differenceInMonths } from "date-fns";

function EditUser({ user, setEditUser }) {
  const [usuario, setUsuario] = useState(user);

  const dispatch = useDispatch();

  const handleChangeFiscalidad = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUsuario({
        ...usuario,
        fiscal: [...usuario.fiscal, value],
      });
    } else {
      setUsuario({
        ...usuario,
        fiscal: usuario.fiscal.filter((e) => e !== value),
      });
    }
  };

  // ------------Cálculo de edad----------------

  let dobArray = usuario.fecha.toString().split("-");
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

  const excesoDeEdad =
    usuario.sexo === "MASCULINO" && age > 65
      ? Math.floor(
          differenceInMonths(today, new Date(year + 65, month, day)) / 2
        )
      : usuario.sexo === "FEMENINO" && age > 60
      ? Math.floor(
          differenceInMonths(today, new Date(year + 60, month, day)) / 2
        )
      : 0;

  console.log(excesoDeEdad);

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
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full grid grid-cols-2  items-center justify-center  ">
              {/* -----------------inputs------------------------- */}
              <div className="m-3">
                <label
                  htmlFor="UserName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Nombre
                </label>

                <input
                  type="text"
                  id="UserName"
                  placeholder="nombre"
                  defaultValue={usuario.nombre}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  onChange={(e) =>
                    setUsuario({ ...usuario, nombre: e.target.value })
                  }
                />
              </div>

              <div className="m-3">
                <div className="">
                  <label
                    htmlFor="UserSexo"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Sexo
                  </label>
                </div>
                <div className="flex">
                  <button
                    value="FEMENINO"
                    className={
                      usuario.sexo === "FEMENINO"
                        ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                        : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
                    }
                    onClick={(e) =>
                      setUsuario({
                        ...usuario,
                        sexo: e.target.value,
                      })
                    }
                  >
                    FEMENINO
                  </button>
                  <button
                    className={
                      usuario.sexo === "MASCULINO"
                        ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm"
                        : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
                    }
                    value="MASCULINO"
                    onClick={(e) =>
                      setUsuario({
                        ...usuario,
                        sexo: e.target.value,
                      })
                    }
                  >
                    MASCULINO
                  </button>
                </div>
              </div>
              {/* --------------------- */}
              <div className="m-3">
                <label
                  htmlFor="UserFecha"
                  className="block text-xs font-medium text-gray-700"
                >
                  {usuario.extranjero ? (
                    <div>Fecha de ingreso al país</div>
                  ) : (
                    <div> Fecha</div>
                  )}
                </label>

                <input
                  type="date"
                  id="UserName"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  defaultValue={usuario.fecha}
                  onChange={(e) =>
                    setUsuario({ ...usuario, fecha: e.target.value })
                  }
                />
              </div>
              {/* ---------------------------------- */}
              {usuario.sexo === "FEMENINO" ? (
                <div className="m-3 ">
                  <div className="flex items-center justify-center">
                    <div className="mt-1 mx-2">
                      <label
                        htmlFor="UserHijos"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Hijos naturales
                      </label>
                      <input
                        type="number"
                        id="UserHijos"
                        min={0}
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        defaultValue={usuario.hijos >= 0 ? usuario.hijos : 0}
                        onChange={(e) =>
                          setUsuario({ ...usuario, hijos: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-1  mx-2">
                      <label
                        htmlFor="UserHijos"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Hijos discapacitados
                      </label>
                      <input
                        type="number"
                        id="UserHijos"
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        min={0}
                        defaultValue={
                          usuario.hijosDiscapacidad >= 0
                            ? usuario.hijosDiscapacidad
                            : 0
                        }
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            hijosDiscapacidad: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mt-1  mx-2">
                      <label
                        htmlFor="UserHijos"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Hijos adoptados
                      </label>
                      <input
                        type="number"
                        id="UserHijos"
                        min={0}
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        defaultValue={
                          usuario.hijosAdoptados >= 0
                            ? usuario.hijosAdoptados
                            : 0
                        }
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            hijosAdoptados: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* ------------------------------------------------------ */}

              <div className="m-3 flex">
                <div className="mx-1">
                  <label
                    htmlFor="UserFecha1960M"
                    className="block text-xs font-medium text-gray-700"
                  >
                    {usuario.fecha <= "1960-03-03" &&
                    usuario.sexo === "MASCULINO"
                      ? "Hasta 2008"
                      : usuario.fecha >= "1960-02-28" &&
                        usuario.sexo === "MASCULINO"
                      ? "Hasta 2012"
                      : ""}
                    {usuario.fecha <= "1965-02-28" &&
                    usuario.sexo === "FEMENINO"
                      ? "Hasta 2008"
                      : usuario.fecha >= "1965-01-03" &&
                        usuario.sexo === "FEMENINO"
                      ? "Hasta 2012"
                      : ""}
                  </label>
                  <input
                    type="number"
                    id="UserFecha1960M"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    defaultValue={
                      (usuario.fecha <= "1960-03-03" &&
                        usuario.sexo === "MASCULINO") |
                      (usuario.fecha <= "1965-02-28" &&
                        usuario.sexo === "FEMENINO")
                        ? usuario.hasta2008
                        : usuario.hasta2012
                    }
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        hasta2008:
                          (usuario.fecha <= "1960-03-03" &&
                            usuario.sexo === "MASCULINO") |
                          (usuario.fecha <= "1965-02-28" &&
                            usuario.sexo === "FEMENINO")
                            ? e.target.value
                            : 0,
                        hasta2012:
                          (usuario.fecha <= "1960-03-03" &&
                            usuario.sexo === "MASCULINO") |
                          (usuario.fecha <= "1965-02-28" &&
                            usuario.sexo === "FEMENINO")
                            ? 0
                            : e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mx-1">
                  <label
                    htmlFor="UserFecha1960M"
                    className="block text-xs font-medium text-gray-700"
                  >
                    {usuario.fecha <= "1960-03-03" &&
                    usuario.sexo === "MASCULINO"
                      ? "Desde 2008"
                      : usuario.fecha >= "1960-02-28" &&
                        usuario.sexo === "MASCULINO"
                      ? "Desde 2012"
                      : ""}
                    {usuario.fecha <= "1965-02-28" &&
                    usuario.sexo === "FEMENINO"
                      ? "Desde 2009"
                      : usuario.fecha >= "1965-01-03" &&
                        usuario.sexo === "FEMENINO"
                      ? "Desde 2012"
                      : ""}
                  </label>
                  <input
                    type="number"
                    id="UserFecha1960M"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    defaultValue={
                      (usuario.fecha <= "1965-02-28" &&
                        usuario.sexo === "FEMENINO") |
                      (usuario.fecha <= "1960-03-03" &&
                        usuario.sexo === "MASCULINO")
                        ? usuario.desde2009
                        : usuario.desde2012
                    }
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        desde2009:
                          usuario.fecha <= "1965-02-28" &&
                          usuario.sexo === "FEMENINO"
                            ? e.target.value
                            : 0,
                        desde2012:
                          usuario.fecha <= "1965-02-28" &&
                          usuario.sexo === "FEMENINO"
                            ? 0
                            : e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* --------------------- */}
              <div className="m-3">
                <label
                  htmlFor="aportes"
                  className="block text-xs font-medium text-gray-700"
                >
                  Cantidad de aportes
                </label>

                <input
                  type="number"
                  id="aportes"
                  disabled
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  defaultValue={
                    Number(usuario.hasta2008) +
                    Number(usuario.desde2009) +
                    Number(usuario.hasta2012) +
                    Number(usuario.desde2012) +
                    usuario.hijos * 12 +
                    usuario.hijosAdoptados * 12 +
                    usuario.hijosDiscapacidad * 12 +
                    excesoDeEdad +
                    usuario.auh * 12
                  }
                />
              </div>
              {/* --------------------- */}
              <div className="m-3">
                <label
                  htmlFor="UserNum"
                  className="block text-xs font-medium text-gray-700"
                >
                  Número
                </label>

                <input
                  type="number"
                  id="UserNum"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  defaultValue={usuario.num}
                  onChange={(e) =>
                    setUsuario({ ...usuario, num: e.target.value })
                  }
                />
              </div>
              {/* --------------------- */}
              <div className="m-3">
                <label
                  htmlFor="UserNum"
                  className="block text-xs font-medium text-gray-700"
                >
                  Extranjero
                </label>
                <div className="flex items-center justify-center">
                  {["SI", "NO"].map((e, index) => (
                    <button
                      key={index}
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
              {/* --------------------- */}
              <div className="m-3">
                <label
                  htmlFor="UserNum"
                  className="block text-xs font-medium text-gray-700"
                >
                  Estado
                </label>
                <div className="flex items-center justify-center ">
                  {["CONSULTA", "CARPETA", "DERIVADO"].map((e, index) => (
                    <button
                      key={index}
                      className={
                        (e === "CONSULTA") & (usuario.status === "consulta")
                          ? "mx-1 mt-1  inline-flex w-full justify-center rounded-md bg-blue-600 px-1 py-3.5 text-xs font-semibold text-white shadow-sm"
                          : (e === "CARPETA") & (usuario.status === "carpeta")
                          ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-1 py-3.5 text-xs font-semibold text-white shadow-sm"
                          : (e === "DERIVADO") & (usuario.status === "derivado")
                          ? "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-1 py-3.5 text-xs font-semibold text-white shadow-sm"
                          : "mx-1 mt-1 inline-flex w-full justify-center rounded-md bg-gray-300 px-1 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 "
                      }
                      onClick={() =>
                        e === "CONSULTA"
                          ? setUsuario({ ...usuario, status: "consulta" })
                          : e === "CARPETA"
                          ? setUsuario({ ...usuario, status: "carpeta" })
                          : setUsuario({ ...usuario, status: "derivado" })
                      }
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              {/* --------------------- */}
              <div className="m-3">
                <label className="block text-xs font-medium text-gray-700">
                  Fiscal
                </label>
                <div className="grid grid-cols-2  ">
                  <div className="flex items-center mx-2 mt-1 ">
                    <input
                      onChange={(e) => handleChangeFiscalidad(e)}
                      type="checkbox"
                      value="monotributo"
                      checked={usuario.fiscal.includes("monotributo")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
                    />
                    <label className="ml-2 text-xs font-medium text-gray-500">
                      Monotributo
                    </label>
                  </div>
                  {/* ---------------------- */}
                  <div className="flex items-center mx-2 mt-1">
                    <input
                      onChange={(e) => handleChangeFiscalidad(e)}
                      type="checkbox"
                      value="autónomo"
                      checked={usuario.fiscal.includes("autonomo")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
                    />
                    <label className="ml-2 text-xs  font-medium text-gray-500">
                      Autónomo
                    </label>
                  </div>
                  {/* ---------------------- */}
                  <div className="flex items-center mx-2 mt-1">
                    <input
                      onChange={(e) => handleChangeFiscalidad(e)}
                      type="checkbox"
                      value="doméstico"
                      checked={usuario.fiscal.includes("domestico")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
                    />
                    <label className="ml-2 text-xs font-medium text-gray-500">
                      Servicio doméstico
                    </label>
                  </div>
                  {/* ---------------------- */}
                  <div className="flex items-center mx-2 mt-1">
                    <input
                      onChange={(e) => handleChangeFiscalidad(e)}
                      type="checkbox"
                      value="dependencia"
                      checked={usuario.fiscal.includes("dependencia")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-200 dark:border-gray-300"
                    />
                    <label className="ml-2 text-xs font-medium text-gray-500">
                      Dependencia
                    </label>
                  </div>
                </div>
              </div>
              {/* ---------------------- */}

              <div className="m-3">
                <label
                  htmlFor="UserName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Auh
                </label>

                <input
                  type="number"
                  id="auh"
                  placeholder="auh"
                  defaultValue={usuario.auh}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  onChange={(e) =>
                    setUsuario({ ...usuario, auh: e.target.value })
                  }
                />
              </div>

              {/* -----------------inputs------------------------- */}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={async () => [
                  setEditUser(false),
                  dispatch(changeLoading(true)),
                  await updateUser(
                    usuario._id,
                    usuario.nombre,
                    usuario.sexo,
                    usuario.fecha,
                    usuario.hijos,
                    usuario.num,
                    usuario.aportes,
                    usuario.hasta2008,
                    usuario.desde2009,
                    usuario.hasta2012,
                    usuario.desde2012,
                    usuario.moratoria,
                    usuario.hijosDiscapacidad,
                    usuario.hijosAdoptados,
                    usuario.status,
                    usuario.extranjero,
                    usuario.auh,
                    usuario.aportando,
                    usuario.fiscal
                  ),
                  dispatch(editPerson(usuario)),
                  dispatch(changeLoading(false)),
                ]}
              >
                Editar
              </button>
              <div
                onClick={() => [setEditUser(false)]}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
              >
                Cancelar
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------- */}
      </div>
    </div>
  );
}

export default EditUser;
