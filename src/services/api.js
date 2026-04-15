import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// AUTH HEADER AUTO
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);

export const shortenUrl = (data) => API.post("/url/create", data);

export const getUrls = () => API.get("/url/my");

export const shareUrl = (data) => API.post("/url/share", data);