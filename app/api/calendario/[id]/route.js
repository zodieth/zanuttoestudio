import { NextResponse } from "next/server";
import Calendario from "../../../models/Calendario";
import dbConnect from "../../../lib/dbConnect";

export async function PUT(request, { params }) {
  const {
    nombre,
    direccion,
    color,
  } = await request.json();

  const { id } = params;

  await dbConnect();

  try {
    const officeUpdated = await Calendario.findByIdAndUpdate(id, {
      nombre,
      direccion,
      color
    },{
      new: true
    });

    return NextResponse.json(officeUpdated);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const officeDeleted = await Calendario.deleteOne({ _id: id });

    return NextResponse.json({response: officeDeleted, id: id});
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}