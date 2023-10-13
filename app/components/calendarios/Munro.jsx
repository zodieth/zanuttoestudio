import React, { useState } from "react";

function Munro({ setCalendarOn, calendarOn }) {
  return (
    <div className="flex justify-center items-center gap-10 w-full mb-9">
      <button
        onClick={() => setCalendarOn(calendarOn ? false : true)}
        className="flex flex-row items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer"
      >
        Reservá tu turno
      </button>
      <div className="flex items-center justify-center gap-2  text-gray-700">
        <select id="underline_select" defaultValue="none" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option value="none">Seleccione una oficina</option>
            <option value="MUNRO">
              Munro (Belgrano 2487)
            </option>
            <option value="SAN-ISIDRO">
              San Isidro (Belgrano 2487)
            </option>
            <option value="GRAND-BOURG">
              Grand Bourg (Belgrano 2487)
            </option>
            <option value="VIDEOLLAMADA">
              Videollamada
            </option>
        </select>
      </div>
    </div>
  );
}

export default Munro;
