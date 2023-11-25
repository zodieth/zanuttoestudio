import { NextResponse } from "next/server";
import Calendario from "../../models/Calendario";
import dbConnect from "../../lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();

    const calendarios = await Calendario.find({});

    if (!calendarios.length) {
      return NextResponse.json({ msg: "no hay calendarios creados" });
    }

    return NextResponse.json(calendarios);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 404 });
  }
}

export async function POST(request) {
  const { nombre, citas } = await request.json();

  await dbConnect();

  const calendario = await new Calendario({
    nombre,
    citas,
  });

  calendario.save();

  return NextResponse.json({ msg: "calendario creado", calendario });
}
