"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function ConfirmacionTurno({responseData}) {
  const nuevaCita = responseData.nuevaCita? responseData.nuevaCita : undefined;
  const fecha = nuevaCita?.fecha.slice(0,10).split("-").reverse().join("/");
  const oficinas = useSelector((state) => state.calendario);
  const oficina = oficinas.calendario.filter((oficina) => {
    return oficina._id === nuevaCita?.calendario;
  })[0];
  const idInc = nuevaCita?.idInc;
console.log(idInc);
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {
        nuevaCita ? (
          <div className="flex flex-col justify-center items-center mb-5 space-x-4 w-full">
            <h1 className="text-2xl font-bold mb-12">Turno asignado con éxito</h1>
            <h3 className="mt-5">Su cita se ha agendado para el dia {fecha} a las {nuevaCita.hora}:00 en la oficina de {oficina.nombre}</h3>
            <h3 className="mt-5">Puede realizar cualquier consulta respecto a su reserva al 011-1576293141 con el número de ticket {idInc}</h3>
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