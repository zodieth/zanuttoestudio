import { NextResponse } from "next/server";
import Detalle from "../../models/DetalleAportes";
import dbConnect from "../../lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const detalle = await Detalle.find({});

    return NextResponse.json(detalle);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error }, { status: 404 });
  }
}

export async function POST(request) {
  const { año, cantidadMeses, tipoDeAporte, persona } = await request.json();

  try {
    await dbConnect();

    const detalle = await new Detalle({
      año, 
      cantidadMeses, 
      tipoDeAporte, 
      persona,
    });
  
    detalle.save();
  
    return NextResponse.json({ msg: "detalle creado", detalle });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 404 });
  }
}
