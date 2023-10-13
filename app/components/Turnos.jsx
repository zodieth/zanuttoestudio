"use client";
import React, { useState } from "react";
import Munro from "../components/calendarios/Munro";
import Calendar from "./Calendar";

function Turnos() {
  const [calendarOn, setCalendarOn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Munro setCalendarOn={setCalendarOn} calendarOn={calendarOn} />
      {calendarOn && <Calendar className="md:w-[800px] lg:w-[1000px] h-screen mt-20 mx-10" />}
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
