"use client";
import React, { useState } from "react";
import Munro from "../components/calendarios/Munro";
import Calendar from "./Calendar";

function Turnos() {
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
//console.log(nombre);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex justify-center items-center mb-5 space-x-4 w-full">
        <div>
          <h4>Ingrese su nombre:</h4>
          <input type="text" name="name" id="name" onChange={(e)=> handleChangeName(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
        </div>
        <div>
          <h4>Ingrese su teléfono:</h4>
          <input type="tel" name="phoneNum" id="phoneNum" onChange={(e)=> handleChangePhone(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
        </div>
      </div>
      <Munro setCalendarOn={setCalendarOn} calendarOn={calendarOn} setOficina={setOficina} setErrors={setErrors} errors={errors}/>
      {calendarOn && <Calendar setErrors={setErrors} errors={errors} oficina={oficina} nombre={nombre} telefono={telefono} className="md:w-[800px] lg:w-[1000px] h-screen mt-20 mx-10" />}
    </div>
  );
}

export default Turnos;

// const CalendarMunro = () => {
//   return (
//     <iframe
//       className="md:w-[800px] lg:w-[1000px] h-screen mt-20 mx-10 bg-clip-content"
//       src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1T1dl_1i_y7ev3JUEHXdVaN36-UZ-hVrB-0H6d0XvpYUKnK4vorMgsPVHB5B0fIDAwwfBCiqYq?gv=true"
//       //   style="border: 0"
//       width="100%"
//       //   height="600"
//       //   frameborder="0"
//     ></iframe>
//   );
// };
