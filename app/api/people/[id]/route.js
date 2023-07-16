import { NextResponse } from "next/server";
import Person from "../../../models/Person";
import dbConnect from "../../../lib/dbConnect";

export async function PUT(request, { params }) {
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

  const { id } = params;

  await dbConnect();

  try {
    const people = await Person.find({});
    const findPerson = people.filter((e) => e._id === id);
    if (!findPerson) {
      return NextResponse.json({ msg: "Person not found" }, { status: 404 });
    }

    const personUpdated = await Person.findByIdAndUpdate(id, {
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
    });

    return NextResponse.json(personUpdated);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const personDeleted = await Person.deleteOne({ _id: id });

    return NextResponse.json(personDeleted);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
