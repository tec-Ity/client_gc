import axios from "axios";
import api_DNS from './conf/dns'
const api_version = "/api/v1";

export const get_DNS = () =>  api_DNS;

const fetchProm = ( api, method, bodyObj) => {
  return new Promise(async (resolve) => {
    try {
      const api_server = api_DNS + api_version + api;
      const token = localStorage.getItem("accessToken");
      const fetchObj = {
        method,
        headers: {
          "content-type": "application/json",
          authorization: "Bear " + token,
        },
      };
      if (method === "GET" || method === "DELETE") {
      } else if (method === "POST" || method === "PUT") {
        fetchObj.body = JSON.stringify(bodyObj);
      } else {
        resolve({ status: 400, message: `[front] method Error` });
      }
      // console.log(api_server)
      // console.log(method)
      const resPromise = await fetch(api_server, fetchObj);
      // console.log("resPromise: ", resPromise)
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      resolve({ status: 500, message: `[front] fetchProm Error: ${error}` });
    }
  });
};
export const fetch_Prom = ( api, method="GET", bodyObj) => {
  // console.log(api);
  // console.log(method);
  return new Promise(async (resolve) => {
    try {
      method = method.toUpperCase();

      let result = await fetchProm( api, method, bodyObj);
      //unauthorized user
      if (result.status === 401) {
        const auth_res = await refreshToken_Prom();
        if (auth_res.status === 200) {
          result = await fetchProm( api, method, bodyObj);
        } else {
          result.status = auth_res.status;
          result.message = auth_res.message;
        }
      }
      return resolve(result);
    } catch (error) {
      return resolve({
        status: 500,
        message: `[front] fetch_Prom Error: ${error}`,
      });
    }
  });
};

export const logout_Prom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const api = api_DNS + api_version + "/logout";
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "DELETE",
      });
      const result = await resPromise.json();
      if(result.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("crClient");
        localStorage.removeItem("google");
        localStorage.removeItem("thirdPartyLogin");
        
        window.location.reload();
      }
      resolve(result);
    } catch (error) {
      reject({ message: "logout_Prom error", error });
    }
  });
};
export const refreshToken_Prom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const api = api_DNS + api_version + "/refreshtoken";
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "GET",
      });
      const result = await resPromise.json();
      if (result.status === 200) {
        localStorage.setItem("accessToken", result.data?.accessToken);
      } else {
        localStorage.removeItem("refreshToken");
        window.location.reload();
      }
      resolve(result);
    } catch (error) {
      reject({ message: "refreshToken_Prom error", error });
    }
  });
};

export const axios_Prom = async (type, api_router, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      let result;
      if (type === "POST") {
        result = await axios.post(api, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "accessToken " + accessToken,
          },
        });
      } else if (type === "PUT") {
        result = await axios.put(api, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "accessToken " + accessToken,
          },
        });
      }
      console.log(result);
      if (!result.data.status) return reject(result.data);

      return resolve(result.data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};