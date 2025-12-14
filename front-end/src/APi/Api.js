import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-ecommerce-n4t6.onrender.com", // apna backend ka baseURL
});

// Agar har request me token bhejna ho to
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const signUp = (data) => API.post("/api/signup", data);
export const login = (data) => API.post("/api/login", data);



