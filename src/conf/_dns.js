// const api_DNS = "https://172.20.10.3:9000";//green
// const api_DNS = "https://172.20.10.3:9000";//feng
// const api_DNS = "https://192.168.43.20:9000"; //ge
// const api_DNS = "https://192.168.43.187:9000"; //hy8
// const api_DNS = "https://172.20.10.6:9000"; //普通
// const api_DNS = "https://192.168.1.55:9000";//FOM
const api_DNS = "https://server.unioncityitaly.com"; //server
// const api_DNS = "https://dev.unioncityitaly.com"; //server

const port = "";
export const my_Domain = `https://${window.location.hostname}${
  port ? ":" + port : ""
}`;

export default api_DNS;
