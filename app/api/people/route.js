import { NextResponse } from "next/server";
import Person from "../../models/Person";
import { sendMsg } from "../../lib/utils";
import dbConnect from "../../lib/dbConnect";

export async function PUT(request) {
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

  const people = await Person.find({});

  const findPerson = people.filter(
    (e) => (e.num === num) & (e.fecha === fecha)
  );

  console.log(findPerson);

  if (!findPerson) {
    return NextResponse.json({ msg: "Person not found" }, { status: 404 });
  }

  const personUpdated = Person.findByIdAndUpdate(findPerson._id, {
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
}

export async function GET(request) {
  await dbConnect();
  const person = await Person.find({});

  return NextResponse.json(person);
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

  // ------------Cálculo de edad----------------

  let dobArray = person.fecha.split("-");
  let year = Number(dobArray[0]);
  let month = Number(dobArray[1]);
  let day = Number(dobArray[2]);
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDay = today.getDate();
  let age = currentYear - year;
  if (currentMonth < month || (currentMonth == month && currentDay < day)) {
    age--;
  }

  // -----------------------------------------------

  const peopleFound = await Person.find({}).then((data) =>
    data.filter((e) => e.num === person.num)
  );

  const equalPerson = await Person.find({}).then((data) =>
    data.filter((e) => (e.fecha === person.fecha) & (e.num === person.num))
  );

  if ((peopleFound.length === 3) | (equalPerson.length >= 1)) {
    return NextResponse.json({ msg: "Num already exists" }, { status: 409 });
  }

  await person.save();

  sendMsg(
    person.num,
    `*${
      ((person.sexo === "MASCULINO") & (age >= 65)) |
      ((person.sexo === "FEMENINO") & (age >= 60))
        ? "USTED YA TIENE LA EDAD JUBILATORIA"
        : "USTED AÚN NO TIENE LA EDAD JUBILATORIA"
    }*. ${
      ((age >= 50) & (person.sexo === "FEMENINO")) |
      ((age >= 55) & (person.sexo === "MASCULINO"))
        ? `${
            (person.aportes >= 360) | (person.hijos >= 7)
              ? "Tiene la cantidad de aportes necesarios para jubilarse. "
              : "Debe pagar en moratoria"
          }${
            (person.aportes >= 360) | (person.hijos >= 7)
              ? ""
              : ` *${person.moratoria}* aportes`
          }`
        : ""
    } ${
      ((person.sexo === "FEMENINO") & (age >= 50)) |
      ((person.sexo === "MASCULINO") & (age >= 55))
        ? "para regularizar su situación previsional, Si quiere comenzar su trámite, complete el próximo formulario y un operador se comunicará con usted. "
        : ""
    }`
  );

  return NextResponse.json("creado");
}
