const { api } = require("../page");

export const sendMsg = async (to, body) => {
  await api.post("wpp", { to, body });
};

export const createPerson = async (persona) => {
  await api.post("people", {
    persona,
  });
};

export const updateOrCreatePerson = async (
  nombre,
  sexo,
  fecha,
  fechaDeIngreso,
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
  comentarios
  //idInc
) => {
  const update = await api.put("people", {
    nombre,
    sexo,
    fecha,
    fechaDeIngreso,
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
    comentarios,
    // idInc,
  });

  if (update.length) return;
  else {
    await api.post("people", {
      nombre,
      sexo,
      fecha,
      fechaDeIngreso,
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
      comentarios,
      idInc,
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
  fechaDeIngreso,
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
  comentarios,
  idInc
) => {
  await api.put(`people/${_id}`, {
    nombre,
    sexo,
    fecha,
    fechaDeIngreso,
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
    comentarios,
    idInc,
  });
};

export const createDetalle = async (
  año,
  cantidadMeses,
  tipoDeAporte,
  persona
) => {
  const newDetalle = await api
    .post("detalle", {
      año,
      cantidadMeses,
      tipoDeAporte,
      persona,
    })
    .then((detalleNuevo) => {
      return detalleNuevo;
    });
  return newDetalle;
};
export const updateDetalle = async (
  _id,
  año,
  cantidadMeses,
  tipoDeAporte,
  persona
) => {
  await api.patch(`detalle/${_id}`, {
    año,
    cantidadMeses,
    tipoDeAporte,
    persona,
  });
};
export const getDetalle = async () => {
  await api.get(`detalle`);
};
export const deleteDetail = async (id) => {
  await api.delete(`detalle/${id}`);
};

export const getCitas = async () => {
  await api.get(`citas`);
};
export const createCitas = async (     
    nombre,
    telefono,
    fecha,
    hora,
    calendario
  ) => {
    const response = await api.post(`citas`, {
      nombre,
      telefono,
      fecha,
      hora,
      calendario
  });
  return response;
};
export const updateCita = async (
  _id,
  nombre,
  telefono,
  fecha,
  hora,
  calendario
) => {
  const response = await api.put(`citas/${_id}`, {
    nombre,
    telefono,
    fecha,
    hora,
    calendario
  });
  return response
};

export const createOffice = async (
  nombre,
  direccion,
  color,
  horarioSemana,
  horarioSabado
) => {
  const newOffice = await api
    .post("calendario", {
      nombre,
      direccion,
      color,
      horarioSemana,
      horarioSabado
    })
    .then((office) => {
      return office;
    });
  return newOffice;
};
export const updateOffice = async (
  _id,
  nombre,
  direccion,
  color,
  horarioSemana,
  horarioSabado
) => {
  const response = await api.patch(`calendario/${_id}`, {
    nombre,
    direccion,
    color,
    horarioSemana,
    horarioSabado
  });
  return response
};
export const deleteOffice = async (id) => {
  const response = await api.delete(`calendario/${id}`);
  return response
};