import React, { useState } from "react";
import { updateUser } from "../lib/utils";
import { useDispatch } from "react-redux";
import { changeLoading, editPerson } from "../redux/features/peopleSlice";

function Detalle(user){

    const [usuario, setUsuario] = useState(user);

    return (
        <aside className="w-50%">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>

                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Año
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Meses Aportados
                  </th>
                  <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Tipo de Aporte
                  </th>
                </tr>
              </thead>

                <tbody>
                    {/* <tr>
                        <td>usuario.dni</td>
                    </tr>                     */}
                </tbody>
            </table>
          </aside>
    )
}

export default Detalle;