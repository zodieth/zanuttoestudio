import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Cita from "../../models/Cita";
const  {AUTH_TOKEN}  = process.env

export async function POST(request) {
  const { nombre, telefono, fecha, hora, calendario } = await request.json();

  console.log(nombre, telefono, fecha, hora, calendario);

  //   try {
  await dbConnect();
  const cita = await Cita.find({});
  
  try {
    const token = request.cookies.get(AUTH_TOKEN)
    if(token){ 
      return NextResponse.json(cita);
    }else{
      const citaFiltrada = cita.map((e)=>{
        return {
          fecha: e.fecha,
          hora: e.hora,
          calendario: e.calendario
        }
      })
      return NextResponse.json(citaFiltrada);
    }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 404 });
  }
}
