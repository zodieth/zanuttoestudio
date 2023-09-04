import { NextResponse } from "next/server";
import Detalle from "../../../models/DetalleAportes";
import dbConnect from "../../../lib/dbConnect";

export async function PATCH(request, { params }) {
  const {
    //_id,
    año,
    cantidadMeses,
    tipoDeAporte,
    persona
  } = await request.json();

  const { _id } = params;

  await dbConnect();

  try {
    const detalle = await Detalle.findOneAndUpdate({ persona: persona }, {        
      _id,
      año,
      cantidadMeses,
      tipoDeAporte,
      persona
    }, {
      new: true,
      upsert: true,
      rawResult: true
    });

    return NextResponse.json(detalle);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const detalleDeleted = await Detalle.deleteOne({ _id: id });

    return NextResponse.json(detalleDeleted);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}