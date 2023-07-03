const axios = require("axios");

export const sendMsg = async (to, body) => {
  await axios.post("http://localhost:3000/api/wpp", { to, body });
};
