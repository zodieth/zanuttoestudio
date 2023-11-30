import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCitas } from "../../lib/utils";
import { addCalendario } from "../../redux/features/calendarioSlice";
import { api } from "../../page";

function Munro({ setCalendarOn, setAnimationErrors, setOficina, setErrors, errors}) {

  const handleSelectOffice = (e) => {
    if (errors.nombre !== "" || errors.telefono !== "") {
      setAnimationErrors(true)
      setCalendarOn(false)
      e.target.setAttribute("disabled", "disabled");
      e.target.value = "none"
      e.target.removeAttribute("disabled")
    } else {
      if (e.target.value === "none") {
        setErrors({...errors, oficina: "Debe seleccionar una oficina"})
        setCalendarOn(false)
      }else{
        setOficina(e.target.value);
        setCalendarOn(true);
        setErrors({...errors, oficina: ""})
      }
    }
  };
  const dispatch = useDispatch();
  const oficinas = useSelector((state) => state.calendario);

  useEffect(() => {
    api.get("calendario").then((data)=>{
        dispatch(addCalendario(data.data))
    })        
}, [dispatch]);


  return (
    <div className="flex justify-center items-center gap-10 w-full mb-9">
      <div className="flex items-center justify-center gap-2  text-gray-700">
        {
          oficinas.isLoading ? (
            <div>
              Cargando oficinas
            </div>
          ) : oficinas.calendario.length ? (
            <select
            id="underline_select" 
            defaultValue="none" 
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
            onChange={(e)=>handleSelectOffice(e)}>
              <option value="none">Seleccione una oficina</option>
              {
                oficinas.calendario.map((oficina, key) => {
                  return (<option value={oficina.nombre} key={key}>
                  {oficina.nombre} ({oficina.direccion})
                </option>)
                })
              }
          </select>
          ) : (
            <div>
              No hay sucursales disponibles
            </div>
          )
        }

      </div>
    </div>
  );
}

export default Munro;