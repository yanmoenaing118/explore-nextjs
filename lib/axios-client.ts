import axios from "axios";

export const baseURL = "http://localhost:4000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = "fafdyanjoanfsfyamladyanxyaxzyqbdtyeazz";
//     // const token = "";
    

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// axiosClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
