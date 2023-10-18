import { tr } from "date-fns/locale";
import React, { useState } from "react";

const actual = new Date();

function Calendar({ setCalendarOn, calendarOn }) {
    const diasSemana = ["dom","lun","mar","mie","jue","vie", "sab"];
    const mesesAño = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const [selectedYear,setSelectedYear] = useState(actual.getFullYear());
    const [selectedMonth,setSelectedMonth] = useState(actual.getMonth());
    const diasDelMes = new Date(selectedYear,selectedMonth+1,0).getDate()
    const [diaCita, setDiaCita] = useState({
        dia:"",
        mes:"",
        año:""
    })
    const [calendario, setCalendario] = useState({
        dias: 0,
        mes: selectedMonth,
        año: selectedYear
    })
    if(selectedMonth>11){
        setSelectedMonth(0);
        setSelectedYear(selectedYear+1)
    }
    if(selectedMonth<0){
        setSelectedMonth(11);
        setSelectedYear(selectedYear-1)
    }
    const handleSelectDia = (e)=> {
        const claseComun = "px-3 my-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer";
        const claseSelected = "px-3 w-14 flex justify-center items-center border border-green-500 text-white bg-green-500 rounded-2xl cursor-pointer shadow-md";
        const selectedDay = document.getElementsByClassName(claseSelected)[0]
        if(selectedDay !== undefined){
            selectedDay.className = claseComun
        }
        // e.target.className === claseSelected ?
        // e.target.className = claseComun :
        e.target.className = claseSelected;
        
    }

    const primerDiaMes = new Date(selectedYear,selectedMonth,1).getDay();
    const ultimaCelda = primerDiaMes+diasDelMes
    const arrDias = [];
    let dia = 0
    for (let i = 0; i <= 41; i++){
        if(i===primerDiaMes){
            dia=1
        }
        if(i<primerDiaMes || i>= ultimaCelda){
            arrDias.push(<td key={i} className="px-3 my-1    w-14 flex justify-center items-center ">&nbsp;</td>);
        }else if(new Date(selectedYear, selectedMonth, dia).getDay() === 0){
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
    }, [])

    return (
            <div className='flex justify-center items-center gap-5 w-full'>
                <div className='w-full max-w-2xl p-6 mx-auto bg-white rounded-2xl shadow-2xl flex flex-col'>
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
                        <table>
                            <thead>
                                <tr className="flex mb-5 justify-center items-center gap-7 w-full ">
                        {diasSemana.map((dia) => {
                            if(dia === "dom") {
                                return (<th key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-red-500 text-red-500 shadow-md"> {dia}</th>)
                            }else{
                                return (<th key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-green-500 text-green-500 shadow-md"> {dia}</th>)
                            }
                        })}
                                </tr>
                            </thead>
                            <tbody>

                        {semanasCalendario.map((semana) => {
                            return (
                                <tr key={"semana "+ semana+1} className="flex justify-center items-center gap-7 w-full " >
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
                </div>
            </div>
        
    );
}

export default Calendar;
