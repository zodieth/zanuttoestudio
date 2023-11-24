"use client";
import React, { useState } from "react";
import Munro from "./calendarios/Munro";
import Calendar from "./Calendar";
import ConfirmacionTurno from "./ConfirmacionTurno"

function Turnos() {
  const [confirmTurno, setConfirmTurno] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [calendarOn, setCalendarOn] = useState(false);
  const [oficina, setOficina] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState({
    oficina : "Debe seleccionar una oficina",
    dia: "Debe seleccionar un dia para su turno",
    horario: "Debe seleccionar un horario disponible para su turno",
    nombre: "Por favor ingrese su nombre",
    telefono: "Por favor ingrese su numero de teléfono"
  });
  const [animationErrors, setAnimationErrors] = useState(false) 
  const handleChangeName = (e) => {
    if (e.target.value.length < 6) {
      setErrors({...errors, nombre: "El nombre debe contener mas de 6 caracteres"});
    }else{
      setNombre(e.target.value);
      setErrors({...errors, nombre: ""});
    }
  }
  const handleChangePhone = (e) => {
    if (e.target.value.length !== 10) {
      setErrors({...errors, telefono: "El telefono debe contener 10 números"});
    }else{
      setTelefono(e.target.value);
      setErrors({...errors, telefono: ""});
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
    {confirmTurno && <ConfirmacionTurno responseData={responseData}/> || 
      <div>
        <div className="grid justify-center items-center mb-5 space-x-4 w-full md:flex">
          <div>
            <h4>Ingrese su nombre:</h4>
            <input type="text" name="name" id="name" onChange={(e)=> handleChangeName(e)} className="text-gray-500 bg-transparent border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
            { errors.nombre !== "" ? 
            <div className="flex justify-center items-center space-x-4 w-full text-red-500">
              <h6 className={`${animationErrors && "animate-wiggle"}`} onAnimationEnd={() => setAnimationErrors(false)}>{errors.nombre}</h6>
            </div> : "" }
          </div>
          <div>
            <h4>Ingrese su teléfono:</h4>
            <input type="tel" name="phoneNum" id="phoneNum" onChange={(e)=> handleChangePhone(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
            { errors.telefono !== "" ? 
            <div className="flex justify-center items-center space-x-4 w-full text-red-500">
              <h6 className={`${animationErrors && "animate-wiggle"}`} onAnimationEnd={() => setAnimationErrors(false)}>{errors.telefono}</h6>
            </div> : "" }
          </div>
        </div>
        <Munro setCalendarOn={setCalendarOn} setAnimationErrors={setAnimationErrors} setOficina={setOficina} setErrors={setErrors} errors={errors}/>
        {calendarOn && <Calendar setConfirmTurno={setConfirmTurno} setErrors={setErrors} errors={errors} oficina={oficina} nombre={nombre} telefono={telefono} setResponseData={setResponseData} className="md:w-[800px] lg:w-[1000px] h-screen mt-20 mx-10" />}
      </div> }

  </div>
  );
}

export default Turnos;