// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // optional, if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for auth, logging, etc.
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // log or handle global errors here
    return Promise.reject(err);
  }
);

export default axiosInstance;
