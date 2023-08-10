import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Cita from "../../models/Cita";

export async function POST(request) {
  const { nombre, telefono, fecha, hora, calendario } = await request.json();

  console.log(nombre, telefono, fecha, hora, calendario);

  //   try {
  await dbConnect();

  //   const nuevaCita = await new Cita({
  //     nombre,
  //     telefono,
  //     fecha,
  //     hora,
  //     calendario,
  //   });

  //   console.log(nuevaCita);

  //   nuevaCita.save();

  return NextResponse.json({ msg: "cita creada" });

  //   } catch (error) {
  //     return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  //   }
}
