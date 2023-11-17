import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDispatch, useSelector } from "react-redux";
import { addCita, editCita } from "../redux/features/citaSlice";
import { updateCita } from "../lib/utils";
import { RiLoader5Fill } from "react-icons/ri";
import { api } from "../page";

function Citas({setTurnosOn}) {
  const actual = new Date();
  const diasSemana = ["dom","lun","mar","mie","jue","vie", "sab"];
  const mesesAño = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const horarios = ["9am", "10am", "11am", "12pm", "14pm", "15pm"];
  const dispatch = useDispatch();
  const citas = useSelector((state) => state.citas);
  const oficinasColor = {
    "MUNRO": "#f8df81",
    "SAN-ISIDRO": "#f6aa90",
    "GRAND-BOURG": "#d5b6d5",
    "VIDEOLLAMADA": "#badfda"
  }
  const oficinas = Object.keys(oficinasColor);

  const [event, setEvent] = useState(false);

  useEffect(() => {
      api.get("citas").then((data)=>{
          dispatch(addCita(data.data))
      })        
  }, [dispatch]);

  function renderEventContent(eventInfo) {
    return (
      <div className="flex flex-col">
        <b>{eventInfo.timeText}</b>
        <b>{eventInfo.event.title}</b>
        <i>Telefono: <b>{eventInfo.event.extendedProps.telefono}</b></i>
      </div>
    )
  }
  const events = citas.cita?.map((cita)=> {
    const date = new Date(cita.fecha);
    date.setDate(date.getDate()+1);
    const horario = parseInt(cita.hora);
    let color;
    for (let key in oficinasColor) {
      if(key === cita.calendario) {
        color = oficinasColor[key]
      }
    }

    return { 
      title: cita.nombre, 
      start: date.setHours(horario,0,0,0),
      color: color,
      textColor: 'black',
      extendedProps: {
        telefono: cita.telefono,
        id: cita._id
      }
    }
  });

  function handleClickEvent(e) {
    const nombre = e.event.title;
    const telefono = e.event.extendedProps.telefono;
    const _id = e.event.extendedProps.id;
    const dia = e.event.start.getDate();
    const mes = e.event.start.getMonth();
    const año = e.event.start.getFullYear();
    const hora = e.event.start.getHours() + "";
    console.log("MES",mes);
    setEvent({
      nombre,
      telefono,
      dia,
      mes,
      año,
      hora,
      _id
    })
  }

  const handleConfirmEdit = async (e) => {
    const fecha = `${event.año}-${event.mes+1}-${event.dia}`;


    const newCita = await updateCita(
      event._id,
      event.nombre,
      event.telefono,
      fecha,
      event.hora,
      "MUNRO"
    )
    dispatch(editCita(newCita.data));

    /// Esta funcion debe editar la cita en la DB 
    setEvent(false)
  };

  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center mx-5 h-full p-3">
              <div className="flex flex-col w-full h-full rounded-lg bg-white text-left shadow-xl m-5 items-center justify-center">
                <div className="flex w-full px-5 mt-3 justify-end">
                  <button className="w-10 h-10 bg-red-500  rounded-lg text-white font-bold aspect-square" onClick={()=> setTurnosOn(false)}>X</button>
                </div>
                {citas.isLoading ? (
                    <div className="flex items-center justify-between">
                      <RiLoader5Fill size={40} className="animate-spin text-blue-500" />
                    </div>
                ) : event ? (
                  <div className="grid w-5/6 py-8 overflow-y-auto items-center justify-center">
                    <h2>Editar Cita:</h2>
                    <div className="flex items-center justify-center">
                      <h4>Nombre:</h4>
                      <input type="text" placeholder={event.nombre} value={event.nombre} onChange={(e) => setEvent({...event, nombre:e.target.value})}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <h4>Telefono:</h4>
                      <input type="text" placeholder={event.telefono} value={event.telefono} onChange={(e) => setEvent({...event, telefono:e.target.value})}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <h4>Dia/Mes/Año:</h4>
                      <input type="number" placeholder={event.dia} value={event.dia} onChange={(e) => setEvent({...event, dia:e.target.value})}/>
                      {/* Select con los meses, valor por index */}
                      <select name="meses" id="meses" defaultValue={event.mes} onChange={(e) => {
                        const mes = Number(e.target.value);
                        console.log("MES EVENT",mes);
                        setEvent({...event, mes:mes})}}>
                        {mesesAño.map((mes, i) => {
                          return (
                            <option value={i} key={mes}>{mes}</option>
                          )
                        })}
                      </select>
                      <input type="number" placeholder={event.año} value={event.año} onChange={(e) => setEvent({...event, año:e.target.value})}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <h4>Hora:</h4>
                      <input type="number" placeholder={event.hora} value={event.hora} onChange={(e) => setEvent({...event, hora:e.target.value})}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="h-10 bg-red-500 p-2 rounded-lg text-white" onClick={()=> setEvent(false)}>Cancelar Edición</button>
                      <button className="h-10 bg-blue-500 p-2 rounded-lg text-white font-bold" onClick={(e)=> handleConfirmEdit(e)}>Confirmar Edición</button>
                    </div>
                  </div>
                ) : (
                  <div className="w-5/6 py-8 overflow-y-auto">
                    <FullCalendar
                      locale={esLocale}
                      plugins={[timeGridPlugin]}
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
                      eventClick={(e) => handleClickEvent(e)}
                      allDaySlot={false}
                      //height={"auto"}
                    />
                  </div>
                ) }
                <div>
                  <h6>Leyenda:</h6>
                  <div className="flex m-3">
                    {oficinas.map((oficina)=>{
                      return (
                        <div className="rounded-lg font-light bg-[$] mx-2" style={{ backgroundColor: `${oficinasColor[oficina]}`}} key={oficina}>
                          <h5>{oficina}</h5>
                        </div>                        
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>

  );
}

export default Citas;