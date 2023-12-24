import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Cita from "../../models/Cita";
import CounterCita from "../../models/CounterCita";
const  {AUTH_TOKEN}  = process.env

export async function POST(request) {
  const { nombre, telefono, fecha, hora, calendario } = await request.json();

  try {
    await dbConnect();
    const idSeq = await CounterCita.findOneAndUpdate(
      {id:"autoval"},
      {"$inc":{"seq":1}},
      {upsert:true},
      {new:true}
    ).then(data => data!==null ? data.seq : 0)
    const id = idSeq+1;

    const nuevaCita = await new Cita({
      nombre,
      telefono,
      fecha,
      hora,
      calendario,
      idInc: id
    });

    await nuevaCita.save();
    
    return NextResponse.json({ msg: "cita creada" , nuevaCita});

  } catch (error) {
    console.log(error);   
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
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