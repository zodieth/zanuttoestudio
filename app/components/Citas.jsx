import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDispatch, useSelector } from "react-redux";
import { addCita } from "../redux/features/citaSlice";
import { RiLoader5Fill } from "react-icons/ri";
import { api } from "../page";

function Citas({setTurnosOn}) {
  const actual = new Date();
  const diasSemana = ["dom","lun","mar","mie","jue","vie", "sab"];
  const mesesAño = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const horarios = ["9am", "10am", "11am", "12pm", "14pm", "15pm"];
  const dispatch = useDispatch();
  const citas = useSelector((state) => state.citas);
  const oficinas = {
    "MUNRO": "#f8df81",
    "SAN-ISIDRO": "#f6aa90",
    "GRAND-BOURG": "#d5b6d5",
    "VIDEOLLAMADA": "#badfda"
  }


  useEffect(() => {
      api.get("citas").then((data)=>{
          dispatch(addCita(data.data))
      })        
  }, [dispatch]);

  const handleSelectAlgo = (e) => {
    console.log("AAAA");
  };

  function renderEventContent(eventInfo) {
    return (
      <div className="grid">
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <i>Telefono: {eventInfo.event.extendedProps.telefono}</i>
      </div>
    )
  }
  const events = citas.cita?.map((cita)=> {
    const date = new Date(cita.fecha);
    date.setDate(date.getDate()+1);
    const horario = parseInt(cita.hora);
    let color;
    for (let key in oficinas) {
      if(key === cita.calendario) {
        color = oficinas[key]
      }
    }

    return { 
      title: cita.nombre, 
      start: date.setHours(horario,0,0,0),
      color: color,
      textColor: 'black',
      extendedProps: {
        telefono: cita.telefono
      }
    }
  });


  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center justify-center fixed inset-0 z-10 overflow-y-auto mx-[2.5rem]">
              <div className="w-full overflow-hidden rounded-lg bg-white text-left shadow-xl grid grid-cols-1 items-center justify-center justify-items-center">
                <div className="flex w-full justify-end px-5 mt-2">
                  <button onClick={()=> setTurnosOn(false)}>X</button>
                </div>
                {citas.isLoading ? (
                    <div className="flex items-center justify-between">
                      <RiLoader5Fill size={20} className="animate-spin text-blue-500" />
                    </div>
                ) : (
                  <div className="w-5/6 pb-8">
                    <FullCalendar
                      locale={esLocale}
                      plugins={[dayGridPlugin, timeGridPlugin]}
                      initialView='timeGridWeek'
                      slotMinTime="09:00:00"
                      slotMaxTime="16:00:00"
                      expandRows={true}
                      weekends={true}
                      events={events}
                      eventContent={renderEventContent}
                      headerToolbar={{
                        start: 'today',
                        center: '',
                        end: 'prev,next',
                      }}
                      allDaySlot={false}
                      height={600}
                      contentHeight={200}
                    />
                  </div>
                ) }
              </div>
            </div>
          </div>
    </div>

  );
}

export default Citas;