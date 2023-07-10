import React, { useState } from "react";
import { updateUser } from "../lib/utils";

function EditUser({ user, setEditUser }) {
  const [usuario, setUsuario] = useState(user);

  console.log(usuario);

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
                        ? "bg-blue-600 text-white p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm mx-1"
                        : "p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm mx-1"
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
                        ? "bg-blue-600 text-white p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm mx-1"
                        : "p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm mx-1"
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
                  Fecha
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
                <div className="m-3">
                  <label
                    htmlFor="UserHijos"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Hijos
                  </label>

                  <input
                    type="number"
                    id="UserHijos"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    defaultValue={usuario.hijos >= 0 ? usuario.hijos : 0}
                    onChange={(e) =>
                      setUsuario({ ...usuario, fecha: e.target.value })
                    }
                  />
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

              {/* -----------------inputs------------------------- */}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={() => [
                  setEditUser(false),
                  updateUser(
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
                    usuario.moratoria
                  ),
                  location.reload(),
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