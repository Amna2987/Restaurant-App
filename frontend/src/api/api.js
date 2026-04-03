import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-app-production-916b.up.railway.app/",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let isRedirecting = false; ///

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
        error.response?.status === 401 &&
        !originalRequest._retry
    ) {
//   if (
//   error.response?.status === 401 &&
//   !originalRequest._retry &&
//   !originalRequest.url.includes("/auth/refresh") &&
//   !originalRequest.url.includes("/auth/login") &&
//   !originalRequest.url.includes("/auth/register") 
//   // !originalRequest.url.includes("/auth/me") 
// )
// {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh",
          {},
          { withCredentials: true },
        );

        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        // catch (err) {
        //     processQueue(err);
        //     window.location.href = "/";    //// "/login"
        //     return Promise.reject(err);
        // }
        //////////////////
        // processQueue(err);

        // // 🔥 Kill all pending requests
        // failedQueue = [];
        // isRefreshing = false;

        // // 🔥 FULL RESET
        // window.location.replace("/");

        // return Promise.reject(err);
        ///////////////////////
         processQueue(err);

  failedQueue = [];
  isRefreshing = false;

  if (!isRedirecting) {
    isRedirecting = true;
    window.location.replace("/");
  }

  return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

//// for SSR we do this
// import { cookies } from 'next/headers';

// const cookieStore = cookies();

// fetch("http://localhost:3000/users/me", {
//     headers: {
//         Cookie: cookieStore.toString(),
//     },
// });
