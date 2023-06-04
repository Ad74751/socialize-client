import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const servers = ["http://192.168.1.103:8000", "http://localhost:8000"];

// const selectServer = () => {
//   servers.forEach(async (server) => {
//     if ((await fetch(server).status) === 200) {
//       return server;
//     }
//   });
// };

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? "https://socialize-server-production.up.railway.app/" : "https://socialize-server-production.up.railway.app/";

const getUser = () => {
  try {
    return JSON.parse(atob(localStorage.getItem("token").split(".")[1])).email;
  } catch (e) {
    return null;
  }
};
export const socket = io(URL, {
  query: `user=${getUser()}`,
  autoConnect: false,
});
