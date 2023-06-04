import axios from "axios";
// const servers = ["http://192.168.1.103:8000", "http://localhost:8000"];

// const selectServer = () => {
//   var s = "";
//   servers.forEach(async (server) => {
//     if ((await fetch(server).status) === 200) {
//       s = server;
//     }
//   });
//   return s;
// };
export default axios.create({
  baseURL: "https://socialize-server-production.up.railway.app/api",
});
