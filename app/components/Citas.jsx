import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import FilterCitas from "./FilterCitas"
import { useDispatch, useSelector } from "react-redux";
import { addCita, editCita, deleteCita } from "../redux/features/citaSlice";
import { addCalendario } from "../redux/features/calendarioSlice";
import { updateCita, createCitas, deleteCitas } from "../lib/utils";
import { RiLoader5Fill } from "react-icons/ri";
import { api } from "../page";
const actual = new Date();

function Citas({setTurnosOn}) {
  const mesesAño = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const dispatch = useDispatch();
  const citas = useSelector((state) => state.citas);
  const oficinas = useSelector((state) => state.calendario);
  
  const [newHoliday, setNewHoliday] = useState(false);
  const [newHolidayDate, setNewHolidayDate] = useState({
    dia: actual.getDate(),
    mes: actual.getMonth(),
    año: actual.getFullYear(),
  });
  const [motivo, setMotivo] = useState("");

  const [event, setEvent] = useState(false);

  useEffect(() => {
      api.get("citas").then((data)=>{
          dispatch(addCita(data.data))
      })
      api.get("calendario").then((data) =>{
          dispatch(addCalendario(data.data))
          setCheckedState(new Array(data.data?.length).fill(false))
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
    const office = oficinas.calendario?.filter((oficina) => {
      return oficina._id === cita.calendario;
    })[0];
    return { 
      title: cita.nombre, 
      start: date.setHours(horario,0,0,0),
      color: office?.color,
      textColor: 'black',
      extendedProps: {
        telefono: cita.telefono,
        id: cita._id,
        oficina: cita.calendario
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
    const oficina = e.event.extendedProps.oficina;
    setEvent({
      nombre,
      telefono,
      dia,
      mes,
      año,
      hora,
      oficina,
      _id
    })
  }
  const feriados = citas.cita.filter((cita) => cita.hora === "allDay");

  const removeDuplicates = (citas) => {
    const jsonObject = citas.map(JSON.stringify);
    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
 
    return uniqueArray;
  }

  const arrFeriadosDuplicados = feriados.map((feriado) => {
    const sameName = feriados.filter((day) => day.nombre === feriado.nombre);
    const oficinasAfectadas = [];
    sameName.map((office)=>{
      const officeName = oficinas.calendario.filter((oficina) => oficina._id === office.calendario)[0];
      if (officeName) {
        oficinasAfectadas.push(officeName);
      }
    })
    const oficinasFiltered = removeDuplicates(oficinasAfectadas)
console.log(oficinasFiltered);
    return {
      motivo: feriado.nombre,
      fecha: feriado.fecha,
      oficinas: oficinasFiltered
    }
  })

  const feriadosFiltrados = removeDuplicates(arrFeriadosDuplicados).sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

  const handleConfirmEdit = async (e) => {
    const fecha = `${event.año}-${event.mes+1}-${event.dia-1}`;

    const newCita = await updateCita(
      event._id,
      event.nombre,
      event.telefono,
      fecha,
      event.hora,
      event.oficina
    )
    dispatch(editCita([...citas, newCita.data]));
    setEvent(false)
  };

  const [checkedState, setCheckedState] = useState(
    new Array(oficinas.calendario?.length).fill(false) 
  );
  const [allChecked, setAllChecked] = useState(false)
  const handleCheckedOffice = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    const filterChecked = updatedCheckedState.filter((bool)=> bool === true);
    if(filterChecked.length === checkedState.length) {
      setAllChecked(true);
    }else{
      setAllChecked(false);
    };
    setCheckedState(updatedCheckedState);
    if(e.target.value === "todos"){
      const allCheckedState = checkedState.map(() => { return true});
      const notChecked = checkedState.map(() => { return false});
      allChecked ? (
        setCheckedState(notChecked),
        setAllChecked(false)
        ) : (
          setCheckedState(allCheckedState),
          setAllChecked(true)
        );
    };
  };
  const handleCreateHoliday = async (e) => {
    const fecha = `${newHolidayDate.año}-${newHolidayDate.mes+1}-${newHolidayDate.dia}`;
    const oficinasChecked = oficinas.calendario.filter((oficina, index) => checkedState[index]);
    const arrCreated = []
    for (let index = 0; index < oficinasChecked.length; index++) {
      const calendario = oficinasChecked[index]._id
      const element = await createCitas(motivo, "", fecha, "allDay", calendario).then((data)=> data.data.nuevaCita);
      arrCreated.push(element)
    }
    dispatch(addCita([...citas.cita, ...arrCreated]));
    setCheckedState( new Array(oficinas.calendario?.length).fill(false) );
    setAllChecked(false);
  };

  const [deleteFeriados, setDeleteFeriados] = useState(false)
  const handleDeleteFeriado = async (e) => {
    const feriados = deleteFeriados
    for (let i = 0; i < feriados.length; i++) {
      const feriadoId = feriados[i]._id;
      const deletedCita = await deleteCitas(feriadoId).then(data => data.data)
      dispatch(deleteCita(deletedCita.id))
    }
    setDeleteFeriados(false)
  }

  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center mx-5 h-full p-3">
              <div className="flex flex-col w-full h-full rounded-lg bg-white text-left shadow-xl m-5 items-center justify-center overflow-y-auto">
                <div className="flex w-full px-5 mt-3 justify-end">
                  <button className="w-10 h-10 bg-red-500  rounded-lg text-white font-bold aspect-square" onClick={()=> setTurnosOn(false)}>X</button>
                </div>
                {citas.isLoading || oficinas.isLoading ? (
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
                      <h4>Oficina:</h4>
                      <select name="oficinas" id="oficinas" defaultValue={event.oficina} onChange={(e) => {
                        setEvent({...event, oficina:e.target.value})}}>
                        {oficinas.calendario.map((oficina) => {
                          return (
                            <option value={oficina._id} key={oficina._id}>{oficina.nombre}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="h-10 bg-red-500 p-2 rounded-lg text-white" onClick={()=> setEvent(false)}>Cancelar Edición</button>
                      <button className="h-10 bg-blue-500 p-2 rounded-lg text-white font-bold" onClick={(e)=> handleConfirmEdit(e)}>Confirmar Edición</button>
                    </div>
                  </div>
                ) : newHoliday ? (
                  <div className="relative z-10 "
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                      <div className="flex items-center mx-5 h-full p-3">
                        <div className="flex flex-col w-full h-full rounded-lg bg-white text-left shadow-xl m-5 items-center justify-center overflow-y-auto">
                          <div className="space-y-7">
                          {!deleteFeriados? 
                            <div>
                              <button className="h-10 bg-red-500 p-2 rounded-lg text-white font-bold" onClick={() => setNewHoliday(false)}>Cancelar</button>
                            </div> :
                            ""
                          }
                          {deleteFeriados? (
                              <div className="flex flex-col items-center justify-center">
                                <h2 className="font-bold">{deleteFeriados[0].nombre}</h2>
                                <h5>¿Seguro de borrar el feriado seleccionado?</h5>
                                <div className="flex items-center justify-center">
                                  <button className="h-10 bg-slate-300 p-2 rounded-lg text-white" onClick={()=> setDeleteFeriados(false)}>Cancelar</button>
                                  <button className="h-10 bg-red-500 p-2 rounded-lg text-white font-bold" onClick={(e)=> handleDeleteFeriado(e)}>Borrar Feriado</button>
                                </div>
                              </div>
                            ) : (
                        <div className="space-y-5">
                          <h3>Feriados existentes: </h3>
                          <div className="grid grid-cols-4 space-x-4 ">
                            {feriadosFiltrados.map((feriado)=> {
                              const motivo = feriado.motivo;
                              const fecha = feriado.fecha.slice(0,10).split("-").reverse().join("/");
                              const arrOficinas = feriado.oficinas;
                              return (
                                <div key={motivo} className="rounded-lg border border-slate-300 hover:cursor-pointer hover:bg-slate-200" value={motivo} title={`Borrar ${motivo}`} onClick={()=>setDeleteFeriados(feriados.filter((feriado) => feriado.nombre === motivo ))}>
                                  <h5 className="font-bold">{motivo}</h5>
                                  <h5>Fecha: {fecha}</h5>
                                  <h5>Oficinas afectadas:</h5>
                                  {arrOficinas.map((oficina)=>{
                                    const nombreOficina = oficina.nombre;
                                    return <p key={oficina._id} className="italic font-bold">{nombreOficina}</p>
                                    })}
                                </div>
                              )
                            })} 
                          </div>
                        <h4>Seleccione el dia que desea inhabilitar:</h4>
                        <input type="number" placeholder={newHolidayDate.dia} value={newHolidayDate.dia} onChange={(e) => setNewHolidayDate({...newHolidayDate, dia:e.target.value})}/>
                        {/* Select con los meses, valor por index */}
                        <select name="meses" id="meses" defaultValue={newHolidayDate.mes} onChange={(e) => {
                          const mes = Number(e.target.value);
                          setNewHolidayDate({...newHolidayDate, mes:mes})}}>
                          {mesesAño.map((mes, i) => {
                            return (
                              <option value={i} key={mes}>{mes}</option>
                            )
                          })}
                        </select>
                        <input type="number" placeholder={newHolidayDate.año} value={newHolidayDate.año} onChange={(e) => setNewHolidayDate({...newHolidayDate, año:e.target.value})}/>
                        <h4>Motivo:</h4>
                        {// HANDLESETMOTIVO
}
                        <input type="text" placeholder={motivo} value={motivo} onChange={(e) => setMotivo(e.target.value)}/>
                        <h4>Seleccione la/s oficina/s que no atenderán:</h4>
                        <ul className="flex space-x-5">
                          <li>
                              <input 
                                type="checkbox"
                                id="todos"
                                value="todos"
                                checked={allChecked}
                                onChange={(e) => handleCheckedOffice(e)}/>
                              <label htmlFor="todos">Todas</label>
                            </li>
                          {oficinas.calendario.map((oficina, index) => {
                            return (
                              <li key={oficina._id}>
                                <input 
                                  type="checkbox"
                                  id={oficina._id}
                                  value={oficina._id}
                                  checked={checkedState[index]}
                                  onChange={(e) => handleCheckedOffice(e, index)}/>
                                <label htmlFor={oficina._id}>{oficina.nombre}</label>
                              </li>
                            )
                          })}
                        </ul>
                        <button className="h-10 bg-blue-500 p-2 rounded-lg text-white font-bold" onClick={(e)=> handleCreateHoliday(e)}>Crear nuevo Feriado</button>
                      </div>
                      )
                    }       
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                ) : (
                  <div className="w-5/6 py-8 overflow-y-auto">
                    <div className="flex space-x-2">
                      <FilterCitas useDispatch={useDispatch} />
                      <button className="h-10 bg-blue-500 p-2 rounded-lg text-white font-bold" onClick={()=> setNewHoliday(true)}>Crear feriado</button>
                    </div>
                    <FullCalendar
                      locale={esLocale}
                      plugins={[timeGridPlugin]}
                      initialView='timeGridWeek'
                      slotMinTime="08:00:00"
                      slotMaxTime="20:00:00"
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
                    <div>
                      <h6>Leyenda:</h6>
                      <div className="flex m-3">
                        {oficinas.calendario.map((oficina)=>{
                          return (
                            <div className="rounded-lg font-light bg-[$] mx-2" style={{ backgroundColor: `${oficina.color}`}} key={oficina.nombre}>
                              <h5>{oficina.nombre}</h5>
                            </div>                        
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
    </div>

  );
}

export default Citas;