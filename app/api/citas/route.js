import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Cita from "../../models/Cita";

export async function POST(request) {
  const { nombre, telefono, fecha, hora, calendario } = await request.json();

  try {
    await dbConnect();

    const nuevaCita = await new Cita({
      nombre,
      telefono,
      fecha,
      hora,
      calendario,
    });


    nuevaCita.save();

    return NextResponse.json({ msg: "cita creada" });

  } catch (error) {
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  await dbConnect();
  const cita = await Cita.find({});
  
  try {
    const token = request.cookies.get("next-auth.session-token")
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
