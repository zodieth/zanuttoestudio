"use client";
import React, { useState } from "react";

function ConfirmacionTurno({responseData}) {
//   const [calendarOn, setCalendarOn] = useState(false);
//   const [oficina, setOficina] = useState("");
//   const [telefono, setTelefono] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [errors, setErrors] = useState({
//     oficina : "Debe seleccionar una oficina",
//     dia: "Debe seleccionar un dia para su turno",
//     horario: "Debe seleccionar un horario disponible para su turno",
//     nombre: "Por favor ingrese su nombre",
//     telefono: "Por favor ingrese su numero de teléfono"
//   });
//   const [animationErrors, setAnimationErrors] = useState(false) 
//   const handleChangeName = (e) => {
//     if (e.target.value.length < 6) {
//       setErrors({...errors, nombre: "El nombre debe contener mas de 6 caracteres"});
//     }else{
//       setNombre(e.target.value);
//       setErrors({...errors, nombre: ""});
//     }
//   }
//   const handleChangePhone = (e) => {
//     if (e.target.value.length !== 10) {
//       setErrors({...errors, telefono: "El telefono debe contener 10 números"});
//     }else{
//       setTelefono(e.target.value);
//       setErrors({...errors, telefono: ""});
//     }
//   }
  const nuevaCita = responseData? responseData.nuevaCita : undefined;
  const fecha = nuevaCita?.fecha.slice(0,10).split("-").reverse().join("/");

  // console.log(fecha);


  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {
        nuevaCita ? (
          <div className="flex flex-col justify-center items-center mb-5 space-x-4 w-full">
            <h1 className="text-2xl font-bold mb-12">Turno asignado con éxito</h1>
            <h3 className="mt-5">Su cita se ha agendado para el dia {fecha} a las {nuevaCita.hora}:00 en la oficina de {nuevaCita.calendario}</h3>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-5 space-x-4 w-full">
            <h1 className="text-2xl font-bold mb-12">Ha ocurrido un error, por favor intente nuevamente.</h1>
          </div>
        )
      }
    </div>
  );
}

export default ConfirmacionTurno;