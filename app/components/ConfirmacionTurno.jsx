"use client";
import React, { useState } from "react";

function ConfirmacionTurno({responseData}) {

  const nuevaCita = responseData? responseData.nuevaCita : undefined;
  const fecha = nuevaCita?.fecha.slice(0,10).split("-").reverse().join("/");

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