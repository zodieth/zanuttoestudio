import { NextResponse } from "next/server";
import Cita from "../../../models/Cita";
import dbConnect from "../../../lib/dbConnect";

export async function PUT(request, { params }) {
  const {
    nombre,
    telefono,
    fecha,
    hora,
    calendario
  } = await request.json();

  const { id } = params;
 
  await dbConnect();

  try {
    const citaUpdated = await Cita.findByIdAndUpdate(id, {
      nombre,
      telefono,
      fecha,
      hora,
      calendario
    }, {
      new: true
    });

    return NextResponse.json(citaUpdated);
} catch (error) {
  return NextResponse.json({ msg: error }, { status: 500 });
}
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const citaDeleted = await Cita.deleteOne({ _id: id });

    return NextResponse.json({response: citaDeleted, id: id});
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}