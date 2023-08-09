"use client";
import React, { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import DeleteConfirm from "../components/DeleteConfirm";
import EditUser from "../components/EditUser";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import FilterStatusSelect from "../components/FilterStatusSelect";
import { useDispatch } from "react-redux";

function Table({ people }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage, setPeoplePerPage] = useState(8);
  const lastPersonIndex = currentPage * peoplePerPage;
  const firstPersonIndex = lastPersonIndex - peoplePerPage;
  const currentPeople = people.people.slice(firstPersonIndex, lastPersonIndex);

  // ----------------------------

  const [deleteUser, setDeleteUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const [user, setUser] = useState({
    nombr: "",
    sexo: "",
    fecha: "",
    hijos: 0,
    num: 0,
    aportes: 0,
    hasta2008: 0,
    desde2009: 0,
    hasta2012: 0,
    desde2012: 0,
    moratoria: 0,
    hijosDiscapacidad: 0,
    hijosAdoptados: 0,
    status: "",
    extranjero: false,
    auh: 0,
    aportando: false,
    tipoAporte: [],
    pension: "",
    dni: 0,
    claveAnses: "",
  });
  const [search, setSearch] = useState("");

  return (
    <div className="overflow-x-auto mx-10 my-10 w-full flex-col items-start justify-center ">
      {deleteUser && (
        <DeleteConfirm user={user} setDeleteUser={setDeleteUser} />
      )}
      {editUser && <EditUser user={user} setEditUser={setEditUser} />}

      <div className="flex flex-row items-center justify-between mb-10">
        <div className="flex gap-4">
          <SearchBar setSearch={setSearch} />
          <FilterStatusSelect useDispatch={useDispatch} />
        </div>

        <div className="mx-1 flex flex-row items-center justify-center rounded bg-blue-600 px-4 py-3 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer">
          <h1 className="text-md">Crear</h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center">
        {/* <FilterStatus status={status} setStatus={setStatus} /> */}
        {people.isLoading === true ? (
          <RiLoader5Fill
            size={40}
            className="animate-spin text-blue-500 text-center"
          />
        ) : (
          <div className="w-full">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Id
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Estado
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nombre
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Fecha de nacimiento
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Sexo
                  </th>

                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Número
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentPeople
                  ?.filter((people) => {
                    return search.toLowerCase() === ""
                      ? people
                      : people.nombre
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase());
                  })
                  .map((e, index) => (
                    <tr key={index} className="">
                      <td className="whitespace-nowrap px-4 py-2 text-blue-600">
                        <h1 className="hover:underline cursor-pointer">
                          {e._id
                            // .split("")                                 REVERSE STRING
                            // .reduce((acc, char) => char + acc, "")
                            .substring(0, 6)}
                          ...
                        </h1>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                        <span
                          className={
                            e.status === "consulta"
                              ? "whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700"
                              : e.status === "carpeta"
                              ? "whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700"
                              : "whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700 "
                          }
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {e.nombre}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {e.fecha}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {e.sexo}
                      </td>

                      <td>
                        <a
                          href={`https://wa.me/${e.num}`}
                          className="whitespace-nowrap px-4 py-2 text-gray-700 hover:underline"
                        >
                          {e.num}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <div
                          onClick={() => [setUser(e), setEditUser(true)]}
                          className="mx-1 inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </div>
                        <div
                          onClick={() => [setDeleteUser(true), setUser(e)]}
                          className="mx-1 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              peopleData={people.people?.length}
              peoplePerPage={peoplePerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
