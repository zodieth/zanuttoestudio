import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Person from "../../models/Person";

export async function GET(request) {
  await dbConnect();
  return NextResponse.json({ msg: "bien" });
}

export async function POST(request) {
  const {
    nombre,
    sexo,
    fecha,
    hijos,
    num,
    aportes,
    hasta2008,
    desde2009,
    hasta2012,
    desde2012,
    moratoria,
  } = await request.json();

  await dbConnect();

  const personFound = await Person.findOne({ num });

  if (personFound) {
    return NextResponse.json({ msg: "Num already exists" }, { status: 409 });
  }

  const person = await new Person(
    nombre,
    sexo,
    fecha,
    hijos,
    num,
    aportes,
    hasta2008,
    desde2009,
    hasta2012,
    desde2012,
    moratoria
  );

  await person.save();

  return NextResponse.json("creado");
}
