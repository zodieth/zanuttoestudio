"use client";
import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { createCitas } from "../lib/utils";
import { addCalendario } from "../redux/features/calendarioSlice";
import { api } from "../page";

function Oficinas({ setOficinasOn }) {
    const [sketchPickerColor, setSketchPickerColor] = useState("#737373");
    const [nameOffice, setNameOffice] = useState("");
    const [addressOffice, setAddressOffice] = useState("");
    const [newOffice, setNewOffice] = useState(false);
    const dispatch = useDispatch();
    const oficinas = useSelector((state) => state.calendario).calendario;
  
    useEffect(() => {
      api.get("calendario").then((data)=>{
          dispatch(addCalendario(data.data))
      })        
    }, []);

    const handleChangeName = (e) => {
        setNameOffice(e.target.value)
    };

    
    const handleChangeAddress = (e) => {
        setAddressOffice(e.target.value)
    };

console.log(oficinas);
  return (
    <div className="relative z-10 "
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center mx-5 h-full p-3">
                <div className="flex flex-col w-full h-full rounded-lg bg-white text-left shadow-xl m-5 items-center justify-start">
                    <div className="flex w-full px-5 my-5 justify-end">
                        <button className="w-10 h-10 bg-red-500  rounded-lg text-white font-bold aspect-square" onClick={()=> setOficinasOn(false)}>X</button>
                    </div>
                    <div className="grid mt-12 items">
                        <h2>Oficinas Actuales:</h2>
                        <div className="flex">
                            {oficinas.map((oficina)=>{
                                return (
                                    <div className="grid items-center justify-center m-5 p-2 text-center border-2 borde-indigo-400 rounded-lg hover:cursor-pointer">
                                        <h3>{oficina.nombre}</h3>
                                        <h3>{oficina.direccion}</h3>
                                        <div style={{
                                            backgroundColor: `${oficina.color}`,
                                            height:"15px",
                                            width:"auto"

                                        }}></div>
                                    </div>
                                )
                            })}
                        </div>
                        {!newOffice && (<button className="bg-blue-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> setNewOffice(true)}>Crear nueva</button>)}
                    </div>
                    {newOffice && (
                        <div className="grid mt-6 overflow-y-auto">
                            <h1>Ingrese los datos de la nueva oficina:</h1>
                            <div>
                                <input type="text" name="name" placeholder="NOMBRE" id="name" onChange={(e)=> handleChangeName(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
                                <input type="text" name="address" placeholder="Dirección" id="address" onChange={(e)=> handleChangeAddress(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                            <h6>Seleccione un color para representar la oficina:</h6>
                            <div
                            style={{
                                backgroundColor: `${sketchPickerColor}`,
                                width: 100,
                                height: 50,
                                border: "2px solid white",
                            }}
                            ></div>
                            <ChromePicker
                            onChange={(color) => {
                                setSketchPickerColor(color.hex);
                            }}
                            color={sketchPickerColor}
                            />
                            </div>
                        </div>
                    )}
     
                </div>
            </div>
        </div>
    </div>

  );
}

export default Oficinas;