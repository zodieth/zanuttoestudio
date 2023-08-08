import { NextResponse } from "next/server";
import Person from "../../models/Person";
import { sendMsg } from "../../lib/utils";
import dbConnect from "../../lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const person = await Person.find({});

    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 404 });
  }
}

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
    hijosDiscapacidad,
    hijosAdoptados,
    status,
    extranjero,
    auh,
    aportando,
    fiscal,
    pension,
  } = await request.json();

  await dbConnect();

  try {
    const person = new Person(
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
      hijosDiscapacidad,
      hijosAdoptados,
      status,
      extranjero,
      auh,
      aportando,
      fiscal,
      pension
    );

    const find = await Person.find({});

    const filter = find.filter(
      (e) => (e.fecha === person.fecha) & (e.num === person.num)
    );

    // if (filter.length) {
    const personUpdated = await Person.findByIdAndUpdate(filter[0]._id, {
      nombre: person.nombre,
      sexo: person.sexo,
      fecha: person.fecha,
      hijos: person.hijos,
      num: person.num,
      aportes: person.aportes,
      hasta2008: person.hasta2008,
      desde2009: person.desde2009,
      hasta2012: person.hasta2012,
      desde2012: person.desde2012,
      moratoria: person.moratoria,
      hijosDiscapacidad: person.hijosDiscapacidad,
      hijosAdoptados: person.hijosAdoptados,
      status: person.status,
      extranjero: person.extranjero,
      auh: person.auh,
      aportando: person.aportando,
      fiscal: person.fiscal,
      pension: person.pension,
    });

    return NextResponse.json(personUpdated), { status: 200 };
    // } else {
    //   return NextResponse.json(""), { status: 500 };
    // }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
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
    hijosDiscapacidad,
    hijosAdoptados,
    status,
    extranjero,
    auh,
    aportando,
    fiscal,
    pension,
  } = await request.json();

  try {
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
      moratoria,
      hijosDiscapacidad,
      hijosAdoptados,
      status,
      extranjero,
      auh,
      aportando,
      fiscal,
      pension
    );

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
        person.aportes >= 360
          ? ""
          : `Tiene ${person.aportes} aportes en posesión.`
      }${
        ((age >= 50) & (person.sexo === "FEMENINO")) |
        ((age >= 55) & (person.sexo === "MASCULINO"))
          ? `${
              person.aportes >= 360
                ? "Tiene la cantidad de aportes necesarios para jubilarse. "
                : ` Debe pagar en moratoria *${person.moratoria}* aportes.`
            }`
          : ""
      } ${
        ((person.sexo === "FEMENINO") & (age >= 50)) |
        ((person.sexo === "MASCULINO") & (age >= 55))
          ? `Para regularizar su situación previsional, Si quiere comenzar su trámite, complete el próximo formulario y un operador se comunicará con usted.${
              person.aportes >= 360
                ? ""
                : " Recuerde que necesita la cantidad de 360 aportes para jubilarse"
            }`
          : ""
      }`
    );

    return NextResponse.json("creado");
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
