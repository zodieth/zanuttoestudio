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
  moratoria
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
  });
};

export const deleteUser = async (id) => {
  await api.delete(`people/${id}`);
};

export const updateUser = async (
  id,
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
) => {
  await api.put(`/people/${id}`, {
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
};
