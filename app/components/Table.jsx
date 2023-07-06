"use client";
import React from "react";
import { useContext } from "react";
import { peopleContext } from "../layout";
import { BiSolidEditAlt } from "react-icons/bi";
function Table() {
  const data = useContext(peopleContext);
  console.log(data);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
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
              Aportes
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data?.map((e, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {e.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {e.fecha}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {e.sexo}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {e.aportes}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  <BiSolidEditAlt size={20} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
