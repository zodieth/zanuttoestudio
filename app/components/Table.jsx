"use client";
import React, { useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import DeleteConfirm from "../components/DeleteConfirm";
import EditUser from "../components/EditUser";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import FilterStatusSelect from "../components/FilterStatusSelect";
import DeleteSelectedConfirm from "../components/DeleteSelectedConfirm";
import { addPeople } from "../redux/features/peopleSlice";
import { addDetail } from "../redux/features/detailSlice";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../page";
import * as XLSX from "xlsx";
import { BsFillCalculatorFill, BsFillPersonPlusFill } from "react-icons/bs";
import CalculateUser from "../components/CalculateUser";
import CreatePerson from "../components/CreatePerson";
import WhatsAppComponent from "./whatsapp/whatsappPruebas";

function Table({whatsappSession, setWhatsappSession}) {
  const [actualPage, setActualPage] = useState(1);
  const total_Page = 10;

  const people = useSelector((state) => state.people);
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("people")
      .then((datos) =>
        datos.data.sort((a, b) => {
          const idA = a.idInc || a._id;
          const idB = b.idInc || b._id;

          // Si idA es número y idB es string, a debe aparecer primero
          if (typeof idA === "number" && typeof idB === "string") {
            return -1;
          }

          // Si idA es string y idB es número, b debe aparecer primero
          if (typeof idA === "string" && typeof idB === "number") {
            return 1;
          }

          // Si ambos son números, ordenar de manera descendente
          if (typeof idA === "number" && typeof idB === "number") {
            return idB - idA;
          }

          // Si ambos son strings, se pueden comparar lexicográficamente (esto mantendrá el orden basado en el componente temporal de los ObjectIDs de MongoDB)
          return idA.localeCompare(idB);
        })
      )
      .then((data) => dispatch(addPeople(data)));
    api.get("detalle").then((data) => dispatch(addDetail(data.data)));
  }, [dispatch]);

  let peoplePagination;

  useEffect(() => {
    setActualPage(1);
  }, [people.people]);

  peoplePagination = people.people.slice(
    (actualPage - 1) * total_Page,
    actualPage * total_Page - 1
  );

  const getTotalPages = () => {
    return Math.ceil(people.people.length / total_Page);
  };

  // ----------------------------

  // const [deleteUser, setDeleteUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [calculateUser, setCalculateUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  const [checkedState, setCheckedState] = useState([]);

  const [allCheckedState, setAllCheckedState] = useState(false);
  const handleSelectOne = (_id) => {
    if (checkedState.includes(_id)) {
      const updatedCheckedState = checkedState.filter((item) => item !== _id);
      setCheckedState(updatedCheckedState);
    } else {
      setCheckedState([...checkedState, _id]);
    }
  };
  const handleSelectAll = (e) => {
    let newState = [...checkedState];
    if (e === true) {
      const allSelected = peoplePagination.map((item) => item._id);
      for (let i = 0; i < allSelected.length; i++) {
        if (!newState.includes(allSelected[i])) {
          newState.push(allSelected[i]);
        }
      }
      setAllCheckedState(true);
    } else {
      const allSelected = peoplePagination.map((item) => item._id);
      for (let i = 0; i < allSelected.length; i++) {
        newState = newState.filter((item) => item !== allSelected[i]);
      }

      setAllCheckedState(false);
    }
    setCheckedState(newState);
  };

  const [user, setUser] = useState({
    nombr: "",
    sexo: "",
    fecha: "",
    fechaDeIngreso: "",
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
    direccion: "",
    localidad: "",
    provincia: "",
    comentarios: "",
  });
  const [search, setSearch] = useState("");
  useEffect(() => {
    const allChecked = peoplePagination.map(() => true);
    const allPeople = peoplePagination.map((item) =>
      checkedState.includes(item._id)
    );
    if (allPeople.toString() === allChecked.toString()) {
      setAllCheckedState(true);
    } else {
      setAllCheckedState(false);
    }
  }, [checkedState]);

  const dataSelected = (people, checkedState) => {
    //console.log(people);
    const dataPersonArr = [];
    people.map((item) => {
      if (checkedState.includes(item._id)) {
        dataPersonArr.push(item);
      }
    });
    return dataPersonArr;
  };
  const dataPerson = dataSelected(people.people, checkedState);
  const dataDetails = dataPerson.map((p) => {
    const d = detail.detail;
    for (let i = 0; i < d.length; i++) {
      if (d[i].persona === p._id) {
        let arrayDetalles = [];
        d[i].año.forEach((a,z) => {
          if(d[i].cantidadMeses[z] !== 0) {
            arrayDetalles.push({
              año: a, 
              mes: d[i].cantidadMeses[z],
              tipo: d[i].tipoDeAporte[z]
            })
          }
        })
        return arrayDetalles;
      }
    }
    return [];
  });
  const downloadExcel = (dataPerson, dataDetails) => {
    if (dataPerson.toString() === [].toString()) {
      return alert("Ningun usuario seleccionado");
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    dataPerson.forEach((person) => {
      const detail = dataDetails[dataPerson.indexOf(person)];
      let detailString = "[" + detail.map((e) => JSON.stringify(e)).join(",").replace(/["]+/g,"") + "]";
      console.log(detailString);
      XLSX.utils.sheet_add_json(worksheet, [{
        Carpeta:person.idInc,
        Nombre: person.nombre,
        Documento:person.dni,
        Sexo: person.sexo,
        Fecha: person.fecha,
        Hijos: person.hijos,
        HijosAdoptados: person.hijosAdoptados,
        HijosDiscapacidad: person.hijosDiscapacidad,
        Numero: person.num,
        Status: person.status,
        Extranjero: person.extranjero,
        Auh: person.auh,
        claveAnses: person.claveAnses,
        Pension: person.pension,
        Aportando: person.aportando,
        Dirección: person.direccion,
        Localidad: person.localidad,
        Provincia: person.provincia,
        Comentarios: person.comentarios,
        FechaDeConsulta: person.createdAt,
        "Año|Mes|Tipo": detailString!=="[]"? detailString : ""
      }], {origin: -1})
    })
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <div className="overflow-x-auto mx-10 my-10 w-full flex-col items-start justify-center ">
      {/* {deleteUser && (
        <DeleteConfirm
          user={user}
          setDeleteUser={setDeleteUser}
          detail={detail}
        />
      )} */}

      {createUser && <CreatePerson setCreateUser={setCreateUser} />}
      {whatsappSession && (
        <WhatsAppComponent setWhatsappSession={setWhatsappSession} />
      )}
      {editUser && (
        <EditUser user={user} setEditUser={setEditUser} detail={detail} />
      )}
      {calculateUser && (
        <CalculateUser user={user} setCalculateUser={setCalculateUser} />
      )}
      {deleteSelected && (
        <DeleteSelectedConfirm
          dataPerson={dataPerson}
          setDeleteSelected={setDeleteSelected}
          dataDetails={dataDetails}
        />
      )}

      <div className="flex flex-row items-center justify-between mb-10 mx-">
        <div className="flex gap-4">
          <SearchBar setSearch={setSearch} />
          <FilterStatusSelect useDispatch={useDispatch} />
        </div>

        <div className="flex">
          <div
            className="mx-1 flex flex-row items-center justify-center rounded bg-gray-300 px-4 py-3 text-xs font-medium text-white hover:bg-gray-200 cursor-pointer"
            onClick={() => downloadExcel(dataPerson, dataDetails)}
          >
            <h1 className="text-md">Exportar</h1>

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
          <div
            className="mx-1 flex flex-row items-center justify-center rounded bg-red-600 px-4 py-3 text-xs font-medium text-white hover:bg-red-500 cursor-pointer"
            onClick={() => [setDeleteSelected(true)]}
          >
            {/* <h1 className="text-md">Borrar </h1> */}
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
          <div
            className="mx-1 flex flex-row items-center justify-center rounded bg-blue-600 px-4 py-3 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer"
            onClick={() => [setCreateUser(true)]}
          >
            <BsFillPersonPlusFill className="h-4 w-4" />
          </div>
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
                    Carpeta
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
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Fecha de consulta
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <input
                      type="checkbox"
                      className="rounded-sm"
                      //defaultChecked={allCheckedState}
                      checked={allCheckedState}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {peoplePagination
                  ?.filter((people) => {
                    //console.log(people);
                    //console.log(search);
                    return search.toLowerCase() === ""
                      ? people
                      : people.nombre
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                          people.num
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          people.idInc?.toString().includes(search) ||
                          people._id?.toString().includes(search);
                  })
                  .map((e, index) => {
                    const dateString = e.createdAt;
                    const dateObj = new Date(dateString);

                    const year = dateObj.getUTCFullYear();
                    const month = String(dateObj.getUTCMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const day = String(dateObj.getUTCDate()).padStart(2, "0");

                    const formattedDate = `${day}/${month}/${year}`;

                    return (
                      <tr key={index} className="">
                        <td className="whitespace-nowrap px-4 py-2 text-blue-600">
                          <h1 className="hover:underline cursor-pointer">
                            {!e.idInc
                              ? e._id
                                  // .split("")                                 REVERSE STRING
                                  // .reduce((acc, char) => char + acc, "")
                                  .substring(0, 6) + "..."
                              : e.idInc}
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
                            href={`https://wa.me/+54${e.num}`}
                            className="whitespace-nowrap px-4 py-2 text-gray-700 hover:underline"
                          >
                            {e.num}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {formattedDate === "NaN/NaN/NaN" ? "" : formattedDate}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <input
                            className="rounded-sm"
                            type="checkbox"
                            key={e._id}
                            checked={checkedState.includes(e._id)}
                            onChange={() => handleSelectOne(e._id)}
                          />
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
                            onClick={() => [setCalculateUser(true), setUser(e)]}
                            className="mx-1 inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-500 cursor-pointer"
                          >
                            <BsFillCalculatorFill size={15} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <Pagination
              page={actualPage}
              total={getTotalPages()}
              onChange={(pageChange) => {
                setActualPage(pageChange);
                setAllCheckedState(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
