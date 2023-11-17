import { NextResponse } from "next/server";
import Calendario from "../../../models/Calendario";
import dbConnect from "../../../lib/dbConnect";

export async function PUT(request, { params }) {
  const {
    _id,
    nombre,
    direccion,
    color,
  } = await request.json();

  const { id } = params;

  await dbConnect();

  try {
    const offices = await Calendario.find({});
    const findOffice = offices.filter((e) => e._id === id);
    if (!findOffice) {
      return NextResponse.json({ msg: "Office not found" }, { status: 404 });
    }

    const officeUpdated = await Calendario.findByIdAndUpdate(id, {
      _id,
      nombre,
      direccion,
      color
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

    return NextResponse.json(officeDeleted);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}