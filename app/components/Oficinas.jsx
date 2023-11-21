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
    const [editOffice, setEditOffice] = useState(false)
    const dispatch = useDispatch();
    const oficinas = useSelector((state) => state.calendario).calendario;
  
    useEffect(() => {
      api.get("calendario").then((data)=>{
          dispatch(addCalendario(data.data))
      })        
    }, [dispatch]);

    const handleChangeName = (e) => {
        setNameOffice(e.target.value)
    };

    
    const handleChangeAddress = (e) => {
        setAddressOffice(e.target.value)
    };
    const handleClickOffice = (oficina) => {
        setNewOffice(false)
        setEditOffice(oficina)
        setSketchPickerColor(oficina.color)
        console.log(oficina);
    }
    const handleEditOffice = () => {

    }
    const deleteOffice = () => {
        
    }
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
                    {editOffice && (
                        <div className="flex flex-col items-justify justify-center">
                            <h1>Modifique los datos de la oficina seleccionada:</h1>
                            <div className="flex items-center justify-center space-x-4">
                                <h3>Nombre: </h3>
                                <input type="text" name="name" placeholder={editOffice.nombre} id="name" onChange={(e)=> handleChangeName(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
                                <h3>Dirección: </h3>
                                <input type="text" name="address" placeholder={editOffice.direccion} id="address" onChange={(e)=> handleChangeAddress(e)} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
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
                            <div className="flex justify-center space-x-6">
                                <button className="bg-zinc-400 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> setEditOffice(false)}>Cancelar</button>
                                <button className="bg-red-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> deleteOffice(false)}>Eliminar Oficina</button>
                                <button className="bg-blue-500 p-2 mt-12 rounded-lg text-white font-bold"onClick={(e) => handleEditOffice(e)}>Editar Oficina</button>
                            </div>
                        </div>
                    )}
                    <div className="grid mt-12 items">
                        <h2>Oficinas Actuales:</h2>
                        <div className="flex">
                            {oficinas.map((oficina)=>{
                                return (
                                    <button className="grid items-center justify-center m-5 p-2 text-center border-2 borde-indigo-400 rounded-lg hover:cursor-pointer"
                                        key={oficina.nombre}
                                        value={oficina._id}
                                        onClick={()=> handleClickOffice(oficina)}>
                                        <p>{oficina.nombre}</p>
                                        <p>{oficina.direccion}</p>
                                        <div style={{
                                            backgroundColor: `${oficina.color}`,
                                            height:"15px",
                                            width:"auto"
                                        }}></div>
                                    </button>
                                )
                            })}
                        </div>
                        {!newOffice && (<button className="bg-blue-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> {setEditOffice(false), setNewOffice(true)}}>Crear nueva</button>)}
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
                            <div className="flex justify-center space-x-6">
                                <button className="bg-red-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=>setNewOffice(false)}>Cancelar</button>
                                <button className="bg-blue-500 p-2 mt-12 rounded-lg text-white font-bold">Crear Oficina</button>
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