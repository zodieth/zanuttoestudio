"use client";
const actual = new Date();
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCitas } from "../lib/utils";
import { addCita } from "../redux/features/citaSlice";
import { api } from "../page";

function Calendar({ setConfirmTurno, setErrors, errors, oficina, nombre, telefono, setResponseData }) {
    const diasSemana = ["dom","lun","mar","mie","jue","vie", "sab"];
    const mesesAño = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const horarios = {
        semanal: oficina.horarioSemana,
        sabado: oficina.horarioSabado
    };
    const dispatch = useDispatch();
    const [selectedYear,setSelectedYear] = useState(actual.getFullYear());
    const [selectedMonth,setSelectedMonth] = useState(actual.getMonth());
    const diasDelMes = new Date(selectedYear,selectedMonth+1,0).getDate()
    const [diaCita, setDiaCita] = useState({
        dia:"",
        mes:"",
        año:""
    })
    const [horario, setHorario] = useState("");

    const citas = useSelector((state) => state.citas).cita;

    if(selectedMonth>11){
        setSelectedMonth(0);
        setSelectedYear(selectedYear+1)
    }
    if(selectedMonth<0){
        setSelectedMonth(11);
        setSelectedYear(selectedYear-1)
    }
    const handleSelectDia = (e)=> {
        setDiaCita({
            dia: +e.target.outerText,
            mes: selectedMonth,
            año: selectedYear
        })
        setErrors({...errors, dia: ""})        
    }

    const primerDiaMes = new Date(selectedYear,selectedMonth,1).getDay();
    const ultimaCelda = primerDiaMes+diasDelMes
    const arrDias = [];
    const feriados = citas.map((cita) => {
        if(cita.hora === "allDay") {
            return cita
        }
    }).filter((cita)=> cita !== undefined)
    const feriadosOficina = feriados.map((feriado) => {
        if (feriado.calendario === oficina._id) {
            return feriado.fecha
        }
    }).filter((fecha)=> fecha !== undefined)
    let dia = 0
    for (let i = 0; i <= 41; i++){
        const mañana = new Date(actual.getTime() + 60 * (24 * 60 * 60 * 1000)) // 60 Dias desde hoy
        let diaStr = dia +"";
        if(diaStr.length === 1) {
            diaStr = `0${diaStr}`
        }

        const isFeriado = feriadosOficina.map((fecha) => {
            const holiday = fecha.slice(0,10);
            const day = `${selectedYear}-${selectedMonth+1}-${diaStr}`;
            if(day === holiday) {
                return true
            }
        }).filter((holiday) => holiday === true)[0];

        if(i===primerDiaMes){
            dia=1
        }
        if(i<primerDiaMes || i>= ultimaCelda){
            arrDias.push(<td key={i} className="px-3 my-1 w-14 flex justify-center items-center ">&nbsp;</td>);
        }else if(new Date(selectedYear, selectedMonth, dia).getDay() === 0 || new Date(selectedYear, selectedMonth, dia) < actual || new Date(selectedYear, selectedMonth, dia) > mañana || isFeriado){
            arrDias.push(<td key={i} className="px-3 my-1 w-14 flex justify-center items-center border border-red-500 text-red-500">{dia}</td>);
            dia++;
        }else{
            arrDias.push(<td key={i} className="px-3 my-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer" value={dia} onClick={(e)=> handleSelectDia(e)}>{dia}</td>);
            dia++;
        }
    }
    const semanasCalendario = arrDias.map((dia, i) => {
        return Math.floor(i/7);
    }).reduce((acc, item) => {
        if(!acc.includes(item)){
            acc.push(item);
        }
        return acc;
    }, []);
    
    useEffect(() => {
        api.get("citas").then((data)=>{
            dispatch(addCita(data.data))
        })        
    }, [dispatch]);

    const handleCancel = () => {
        setDiaCita({...diaCita, dia: ""});
        setHorario("");
        setErrors({...errors,dia: "Debe seleccionar un dia para su turno", horario: "Debe seleccionar un horario disponible para su turno"})        
    }

    const handleConfirm = () => {
        if(errors.oficina === "" &&
        errors.dia === "" &&
        errors.horario === "" &&
        errors.nombre === "" &&
        errors.telefono === "" ) 
        {
            createCitas(nombre, telefono, `${diaCita.año}-${diaCita.mes+1}-${diaCita.dia}`, horario, oficina._id)
                .then((data) => {
                    setConfirmTurno(true)
                    setResponseData(data.data)
                    return data})
                .catch((error) => {
                    setResponseData(error)
                    setConfirmTurno(true)
                })
        }
        setDiaCita({...diaCita, dia: ""});
    }

    const handleSelectHora = (e) => {
        const claseComun = "flex h-9 justify-center items-center border rounded-2xl shadow w-full hover:border-green-500 cursor-pointer";
        const claseSelected = "flex h-9 justify-center items-center border rounded-2xl shadow w-full bg-green-500 text-white";
        const selectedDay = document.getElementsByClassName(claseSelected)[0]
        if(selectedDay !== undefined){
            selectedDay.className = claseComun
        }
        e.target.className = claseSelected;
        setHorario(e.target.outerText.slice(0,e.target.outerText.length - 3));
        setErrors({...errors, horario: ""})        
    }
    const checkAvailability = (diaObj, hora) => {
        const dia = `${diaObj.año}-${diaObj.mes+1}-${diaObj.dia.toString().length === 2 ? diaObj.dia : "0"+diaObj.dia }`

        const arrAvailable = citas.map((cita)=>{
            if(cita.fecha?.slice(0,10) === dia && cita.hora === hora && cita.calendario === oficina._id) {
                return false
            }
            return true
        })
        return arrAvailable.includes(false);
    }
    const reservaBtn = document.getElementById("reserva")

    if(errors.oficina === "" &&
    errors.dia === "" &&
    errors.horario === "" &&
    errors.nombre === "" &&
    errors.telefono === "" ) 
    {
        reservaBtn?.removeAttribute("disabled");
        reservaBtn? reservaBtn.className= "flex flex-row items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer": "";
    }
    else {
        reservaBtn?.setAttribute("disabled", "disabled");
        reservaBtn? reservaBtn.className= "flex flex-row items-center justify-center rounded-lg bg-zinc-400 px-5 py-3 text-sm font-medium text-white": "";
    }

    return (
            <div className='flex justify-center items-center gap-5 w-full'>
                <div className='w-full p-6 mx-auto bg-white rounded-2xl shadow-2xl flex flex-col'>
                    <div className="flex justify-between pb-4">
                        <div className="-rotate-90 cursor-pointer" onClick={() => setSelectedMonth(selectedMonth-1)}>
                            <svg width="12" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
        <               span className="uppercase text-sm font-semibold text-gray-600">{mesesAño[selectedMonth]} - {selectedYear}</span>
                        <div className="rotate-90 cursor-pointer" onClick={() => setSelectedMonth(selectedMonth+1)}>
                            <svg width="12" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
               
                    </div>
                    <div className="flex justify-center items-center font-medium uppercase text-xs pt-4 pb-2 border-t">
                        <table className="table-fixed">
                            <thead>
                                <tr className="flex mb-5 justify-center items-center md:gap-7">
                        {diasSemana.map((dia) => {
                            if(dia === "dom") {
                                return (<th key={dia} className="border rounded-sm w-14 h-12 flex items-center justify-center border-red-500 text-red-500 shadow-md md:px-5"> {dia}</th>)
                            }else{
                                return (<th key={dia} className="border rounded-sm w-14 h-12 flex items-center justify-center border-green-500 text-green-500 shadow-md md:px-5"> {dia}</th>)
                            }
                        })}
                                </tr>
                            </thead>
                            <tbody>

                        {semanasCalendario.map((semana) => {
                            return (
                                <tr key={"semana "+ semana+1} className="flex justify-center items-center w-full md:gap-7" >
                                    {arrDias.filter((dia, i) => {
                                        if(Math.floor(i/7) === semana) {
                                            return (dia)
                                        }
                                    })}
                                </tr>
                            )
                        })}
                            </tbody>
                        </table>
                    </div>
                    {diaCita.dia !== ""?
                    <div className="absolute bg-white w-full max-w-2xl p-6 mx-auto rounded-2xl shadow-2xl">
                        <div className="flex flex-col justify-center items-center gap-7 mb-5">
                            <h2 className="border rounded-2xl px-5 font-semibold">{diaCita.dia} de {mesesAño[diaCita.mes]} del {diaCita.año}</h2>
                            <h3>Horario:</h3>
                        </div>    
                        <div className="flex flex-col justify-center items-center gap-7">
                            { new Date(diaCita.año, diaCita.mes, diaCita.dia).getDay() === 6 ?
                                    horarios.sabado.map((hora, i) => {
                                        if(checkAvailability(diaCita, hora)){
                                            return (
                                                <div className="flex h-9 justify-center items-center border rounded-2xl shadow w-full bg-red-500 text-white" key={hora} value={hora}>
                                                    <span value={hora}>{hora}:00</span>
                                                </div>)
                                        }
                                        return (
                                            <div className="flex h-9 justify-center items-center border rounded-2xl shadow w-full hover:border-green-500 cursor-pointer" key={hora} value={hora} onClick={(e)=>handleSelectHora(e)}>
                                                <span value={hora}>{hora}:00</span>
                                            </div>
                                        )
                                    }) :
                                    horarios.semanal.map((hora, i) => {
                                        if(checkAvailability(diaCita, hora)){
                                            return (
                                                <div className="flex h-9 justify-center items-center border rounded-2xl shadow w-full bg-red-500 text-white" key={hora} value={hora}>
                                                    <span value={hora}>{hora}:00</span>
                                                </div>)
                                        }
                                        return (
                                            <div className="flex h-9 justify-center items-center border rounded-2xl shadow w-full hover:border-green-500 cursor-pointer" key={hora} value={hora} onClick={(e)=>handleSelectHora(e)}>
                                                <span value={hora}>{hora}:00</span>
                                            </div>
                                        )
                                    })

                            }
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <button
                                onClick={() => handleCancel()}
                                className="flex flex-row items-center justify-center rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white cursor-pointer">
                                Volver a selección de día
                            </button>
                            <button
                                id="reserva"
                                onClick={() => handleConfirm()}
                                className="flex flex-row items-center justify-center rounded-lg bg-zinc-400 px-5 py-3 text-sm font-medium text-white ">
                                Reservá tu turno
                            </button>
                        </div>
                    </div> :""}      
                </div>
            </div>
    );
}

export default Calendar;