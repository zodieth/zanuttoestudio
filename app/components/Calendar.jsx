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
    const arrDias = [];
    for (let dias = 1; dias <= diasDelMes; dias++){
        arrDias.push(dias)       
    }
    

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
                    <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                        {/* {diasSemana.map((dia) => {
                            if(dia === "dom") {
                                return (<div key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-red-500 text-red-500 shadow-md"        > {dia}</div>)
                            }else{
                                return (<div key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-green-500 text-green-500 shadow-md"> {dia}</div>)
                            }
                        })} */}
        
                    </div>
                    
                    <div className="grid grid-cols-7 justify-items-center font-medium text-sm pb-2">
                        {diasSemana.map((dia) => {
                            if(dia === "dom") {
                                return (<div key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-red-500 text-red-500 shadow-md"> {dia}</div>)
                            }else{
                                return (<div key={dia} className="px-5 border rounded-sm w-14 h-12 flex items-center justify-center border-green-500 text-green-500 shadow-md"> {dia}</div>)
                            }
                        })}

                        {arrDias.map((dia, i) => {
                            const column = new Date(selectedYear,selectedMonth,dia).getDay()+1;
                            return(
                            <span key={dia} className={`px-3 w-14 m-1 items-center border hover:border-green-500 hover:text-green-500 cursor-pointer col-start-${column}`}>
                                {dia}
                            </span>)
                        })}
                    </div>
                    {/* <div className="flex justify-between font-medium text-sm pb-2">
                        {

                        }
        
                        <span className="px-3 text-gray-400 w-14 flex justify-center items-center">
        30
                        </span>
        
        
                        <span className="px-3 text-gray-400 w-14 flex justify-center items-center">
        31
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        01
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        02
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        03
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        04
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        05
                        </span>
        
                    </div>
                    <div className="flex justify-between font-medium text-sm pb-2">
        
                        <span className="px-3 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
        06
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        07
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        08
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        09
                        </span>
        
        
                        <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        10
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        11
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        12
            </span>
        
                    </div>
        
                    <div className="flex justify-between font-medium text-sm pb-2">
        
                        <span className="px-3 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
        13
                        </span>
        
        
           <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        14
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        15
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        16
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        17
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        18
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        19
            </span>
        
                    </div>
        
                    <div className="flex justify-between font-medium text-sm pb-2">
        
           <span className="px-3 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
        20
            </span>
        
        
           <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        21
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        22
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        23
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        24
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border border-green-500 text-white bg-green-500 rounded-2xl cursor-pointer shadow-md">
        25
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        26
            </span>
        
                    </div>
        
                    <div className="flex justify-between font-medium text-sm pb-2">
        
           <span className="px-3 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
        27
            </span>
        
        
           <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        28
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        29
            </span>
        
        
            <span className="px-3 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
        30
            </span>
        
        
            <span className="px-3 text-gray-400 w-14 flex justify-center items-center">
        01
            </span>
        
        
            <span className="px-3 text-gray-400 w-14 flex justify-center items-center">
        02
            </span>
        
        
            <span className="px-3 text-gray-400 w-14 flex justify-center items-center">
        03
            </span>
        
                    </div> */}
        
                </div>
            </div>
        
    );
}

export default Calendar;
