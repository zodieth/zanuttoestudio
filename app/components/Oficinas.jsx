"use client";
import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { createOffice, updateOffice, deleteOffice } from "../lib/utils";
import { addCalendario, editCalendario, deleteCalendario } from "../redux/features/calendarioSlice";
import { api } from "../page";

function Oficinas({ setOficinasOn }) {
    const [sketchPickerColor, setSketchPickerColor] = useState("#737373");
    const [deleteOfficeState, setDeleteOfficeState] = useState(false);
    const [newOffice, setNewOffice] = useState(false);
    const [editOffice, setEditOffice] = useState(false)
    const dispatch = useDispatch();
    const oficinas = useSelector((state) => state.calendario);

    const horarios = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const [horarioStartSemana, setHorarioStartSemana] = useState(8);
    const [horarioEndSemana, setHorarioEndSemana] = useState(15);
    const [horarioStartSabado, setHorarioStartSabado] = useState(8);
    const [horarioEndSabado, setHorarioEndSabado] = useState(15);
    const [errorHorario, setErrorHorario] = useState("");
    const horarioSemana = [];
    const horarioSabado = [];

    useEffect(() => {
      api.get("calendario").then((data)=>{
          dispatch(addCalendario(data.data))
      })        
    }, [dispatch]);

    const handleChangeName = (e) => {
        newOffice?
        setNewOffice({...newOffice, nombre: e.target.value}) :
        setEditOffice({...editOffice, nombre: e.target.value})
    };

    
    const handleChangeAddress = (e) => {
        newOffice?
        setNewOffice({...newOffice, direccion: e.target.value}) :
        setEditOffice({...editOffice, direccion: e.target.value})
    };
    const handleClickOffice = (oficina) => {
        setNewOffice(false)
        setEditOffice(oficina)
    }
    const handleEditOffice = async() => {

        const editedOffice = await updateOffice(
            editOffice._id,
            editOffice.nombre,
            editOffice.direccion,
            editOffice.color,
            editOffice.horarioSemana,
            editOffice.horarioSabado
        )
        dispatch(editCalendario(editedOffice.data))
        setEditOffice(false)
    }
    const handleDeleteOffice = async() => {
        const deletedOffice = await deleteOffice(editOffice._id).then(data => data.data)
        dispatch(deleteCalendario(deletedOffice.id))
        setDeleteOfficeState(false)
        setEditOffice(false)
    }
    
    const createNewOffice = async() => {
        if(newOffice.nombre && newOffice.direccion) {
            const nuevo = await createOffice(newOffice.nombre, newOffice.direccion, newOffice.color, newOffice.horarioSemana, newOffice.horarioSabado)
                .then((data) => data.data)
            dispatch(addCalendario([...oficinas.calendario, nuevo.calendario]));
        };
        setNewOffice(false);
    }
    const handleChangeHours = (e) => {
        const value = Number(e.target.value)
        switch (e.target.id) {
            case "horarioStartSemana":
                if(e.target.value > horarioEndSemana){
                    setErrorHorario("El horario de apertura debe ser menor al de cierre");
                    setTimeout(() => {
                        setErrorHorario("")
                    }, 2500)
                }else{
                    setErrorHorario("");
                    setHorarioStartSemana(value);
                }
                break;
            case "horarioStartSabado":
                if(e.target.value > horarioEndSabado){
                    setErrorHorario("El horario de apertura debe ser menor al de cierre");
                    setTimeout(() => {
                        setErrorHorario("")
                    }, 2500)
                }else{
                    setErrorHorario("");
                    setHorarioStartSabado(value);
                }
                break;
            case "horarioEndSemana":
                if(e.target.value < horarioStartSemana){
                    setErrorHorario("El horario de cierre debe ser mayor al de apertura");
                    setTimeout(() => {
                        setErrorHorario("")
                    }, 2500)

                }else{
                    setErrorHorario("");
                    setHorarioEndSemana(value);
                }
                break;
            case "horarioEndSabado":
                if(e.target.value < horarioStartSabado){
                    setErrorHorario("El horario de cierre debe ser mayor al de apertura");
                    setTimeout(() => {
                        setErrorHorario("")
                    }, 2500)
                }else{
                    setErrorHorario("");
                    setHorarioEndSabado(value);
                }
                break;
            default:
                setErrorHorario("Ha ocurrido un error, por favor actualice la página");
        }
        for (let i = horarioStartSemana; i < horarioEndSemana; i++) {
            horarioSemana.push(i+"")
        }
        for (let i = horarioStartSabado; i < horarioEndSabado; i++) {
            horarioSabado.push(i+"")
        }
        newOffice?
        setNewOffice({...newOffice, horarioSemana, horarioSabado}) :
        setEditOffice({...editOffice, horarioSemana, horarioSabado})
    };
    
  return (
    <div className="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center mx-5 h-full p-3">
                <div className="flex flex-col w-full h-full rounded-lg bg-white text-left shadow-xl m-5 items-center justify-start overflow-auto">
                    {deleteOfficeState && (
                        <div className="relative z-10 "
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity justify-center">
                                <div className="flex items-center mx-5 h-full p-3 justify-center">
                                    <div className="flex flex-col w-1/3 h-1/3 rounded-lg bg-white text-left shadow-xl m-5 items-center justify-center">
                                        <h1 className="font-bold mb-6">{editOffice.nombre}</h1>
                                        <h2>¿Seguro de eliminar la oficina seleccionada?</h2>
                                        <div className="space-x-5">
                                            <button className="bg-zinc-400 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> setDeleteOfficeState(false)}>Cancelar</button>
                                            <button className="bg-red-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=> handleDeleteOffice(editOffice)}>Eliminar Oficina</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex w-full px-5 my-5 justify-end">
                        <button className="w-10 h-10 bg-red-500  rounded-lg text-white font-bold aspect-square" onClick={()=> setOficinasOn(false)}>X</button>
                    </div>
                    {editOffice && (
                        <div className="flex flex-col items-justify justify-center">
                            <h1>Modifique los datos de la oficina seleccionada:</h1>
                            <div className="flex items-center justify-center space-x-4">
                                <h3>Nombre: </h3>
                                <input type="text" name="name" placeholder={editOffice.nombre} id="name" onChange={(e)=> setEditOffice({...editOffice, nombre: e.target.value})} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
                                <h3>Dirección: </h3>
                                <input type="text" name="address" placeholder={editOffice.direccion} id="address" onChange={(e)=> setEditOffice({...editOffice, direccion: e.target.value})} className="text-gray-500 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"/>
                            </div>
                            <div className="flex flex-col mb-3 items-center justify-center">
                            <h6>Seleccione un color para representar la oficina:</h6>
                            <div
                            style={{
                                backgroundColor: `${editOffice.color}`,
                                width: 100,
                                height: 50,
                                border: "2px solid white",
                            }}
                            ></div>
                            <ChromePicker
                            onChange={(color) => {
                                setEditOffice({...editOffice, color: color.hex});
                            }}
                            color={editOffice.color}
                            />
                            </div>
                            <div className="flex flex-col my-1.5 items-center justify-center">
                                <h6>Seleccione el horario de atencion de Lunes a Viernes:</h6>
                                <div  className="flex items-center justify-center space-x-3">
                                    <h6>Apertura:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioStart"
                                    id="horarioStartSemana"
                                    value={horarioStartSemana}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"StartSemana"}>{hora}</option>
                                        })}
                                    </select>
                                    <h6>Cierre:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioEnd"
                                    id="horarioEndSemana"
                                    value={horarioEndSemana}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"EndSemana"}>{hora}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col my-3 items-center justify-center">
                                <h6>Seleccione el horario de atencion los Sábados:</h6>
                                <div  className="flex items-center justify-center space-x-3">
                                    <h6>Apertura:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioStart"
                                    id="horarioStartSabado"
                                    value={horarioStartSabado}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"StartSabado"}>{hora}</option>
                                        })}
                                    </select>
                                    <h6>Cierre:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioEnd"
                                    id="horarioEndSabado"
                                    value={horarioEndSabado}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"EndSabado"}>{hora}</option>
                                        })}
                                    </select>
                                </div>
                                {errorHorario && <h6 className="flex justify-center items-center space-x-4 w-full text-red-500">{errorHorario}</h6>}
                            </div>
                            <div className="flex justify-center space-x-6">
                                <button className="bg-zinc-400 p-2 mt-8 rounded-lg text-white font-bold" onClick={()=> setEditOffice(false)}>Cancelar</button>
                                <button className="bg-red-500 p-2 mt-8 rounded-lg text-white font-bold" onClick={()=> setDeleteOfficeState(true)}>Eliminar Oficina</button>
                                <button className="bg-blue-500 p-2 mt-8 rounded-lg text-white font-bold"onClick={(e) => handleEditOffice(e)}>Editar Oficina</button>
                            </div>
                        </div>
                    )}
                    <div className="grid mt-12 items">
                        <h2>Oficinas Actuales:</h2>
                        <div className="flex">
                            {!oficinas.isLoading ? oficinas.calendario.map((oficina)=>{
                                return (
                                    <div className="grid items-center justify-center m-5 p-2 text-center border-2 borde-indigo-400 rounded-lg hover:cursor-pointer"
                                        key={oficina._id}
                                        onClick={()=> handleClickOffice(oficina)}>
                                        <p>{oficina.nombre}</p>
                                        <p>{oficina.direccion}</p>
                                        <div style={{
                                            backgroundColor: `${oficina.color}`,
                                            height:"15px",
                                            width:"auto"
                                        }}></div>
                                    </div>
                                )
                            }) : (
                                <div>
                                    Cargando...
                                </div>
                            )
                            }
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
                                setNewOffice({...newOffice, color: color.hex})
                                setSketchPickerColor(color.hex);
                            }}
                            color={sketchPickerColor}
                            />
                            </div>
                            <div className="flex flex-col my-1.5 items-center justify-center">
                                <h6>Seleccione el horario de atencion de Lunes a Viernes:</h6>
                                <div  className="flex items-center justify-center space-x-3">
                                    <h6>Apertura:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioStart"
                                    id="horarioStartSemana"
                                    value={horarioStartSemana}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"StartSemana"}>{hora}</option>
                                        })}
                                    </select>
                                    <h6>Cierre:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioEnd"
                                    id="horarioEndSemana"
                                    value={horarioEndSemana}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"EndSemana"}>{hora}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col my-3 items-center justify-center">
                                <h6>Seleccione el horario de atencion los Sábados:</h6>
                                <div  className="flex items-center justify-center space-x-3">
                                    <h6>Apertura:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioStart"
                                    id="horarioStartSabado"
                                    value={horarioStartSabado}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"StartSabado"}>{hora}</option>
                                        })}
                                    </select>
                                    <h6>Cierre:</h6>
                                    <select
                                    className="py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" 
                                    name="horarioEnd"
                                    id="horarioEndSabado"
                                    value={horarioEndSabado}
                                    onChange={(e) => handleChangeHours(e)}>
                                        {horarios.map((hora) => {
                                            return <option value={hora} key={hora+"EndSabado"}>{hora}</option>
                                        })}
                                    </select>
                                </div>
                                {errorHorario && <h6 className="flex justify-center items-center space-x-4 w-full text-red-500">{errorHorario}</h6>}
                            </div>
                            <div className="flex justify-center space-x-6">
                                <button className="bg-red-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=>setNewOffice(false)}>Cancelar</button>
                                <button className="bg-blue-500 p-2 mt-12 rounded-lg text-white font-bold" onClick={()=>createNewOffice(newOffice)}>Crear Oficina</button>
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