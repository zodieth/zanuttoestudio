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
  fiscal,
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
    fiscal,
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
  fiscal,
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
    fiscal,
    pension,
  });

  console.log(update);

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
      fiscal,
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
  fiscal,
  pension
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
    fiscal,
    pension,
  });
};
