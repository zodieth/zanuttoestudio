const axios = require("axios");

export const sendMsg = async (to, body) => {
  await axios.post("http://localhost:3000/api/wpp", { to, body });
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
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  await instance.post("http://localhost:3000/api/person", {
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
