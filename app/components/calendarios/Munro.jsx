import React, { useState } from "react";

function Munro({ setCalendarOn, calendarOn }) {
  return (
    <div className="flex justify-center items-center gap-10 w-full">
      <button
        onClick={() => setCalendarOn(calendarOn ? false : true)}
        className="flex flex-row items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer"
      >
        Reservá tu turno
      </button>
      <div className="flex items-center justify-center gap-2  text-gray-700">
        <h1>Munro</h1>
        <h3 className="text-sm">(Belgrano 2487)</h3>
      </div>
    </div>
  );
}

export default Munro;
