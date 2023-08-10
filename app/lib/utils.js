const { api } = require("../page");

export const sendMsg = async (to, body) => {
  await api.post("wpp", { to, body });
};

export const createPerson = async (
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
  tipoAporte,
  pension
) => {
  await api.post("people", {
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
    tipoAporte,
    pension,
  });
};

export const updateOrCreatePerson = async (
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
  tipoAporte,
  pension
) => {
  const update = await api.put("people", {
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
    tipoAporte,
    pension,
  });

  if (update.length) return;
  else {
    await api.post("people", {
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
      tipoAporte,
      pension,
    });
  }
};

export const deleteUser = async (id) => {
  await api.delete(`people/${id}`);
};

export const updateUser = async (
  _id,
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
  tipoAporte,
  pension,
  dni,
  claveAnses,
  direccion,
  localidad,
  provincia
) => {
  await api.put(`people/${_id}`, {
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
    tipoAporte,
    pension,
    dni,
    claveAnses,
    direccion,
    localidad,
    provincia,
  });
};

export const addCita = async (cliente, fecha, hora, calendario) => {
  const hora = fecha.toTimeString().slice(0, 5);
  const horaInt = parseInt(hora.slice(0, 2));
  const horaArg = (horaInt - 3 + 24) % 24;

  if (horaArg >= 10 && horaArg < 16) {
    await api.post("/cita", {
      cliente,
      fecha,
      hora,
      calendario,
    });
  }
};
