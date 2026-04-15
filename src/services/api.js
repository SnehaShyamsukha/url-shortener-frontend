import axios from "axios";

const API = axios.create({
  baseURL: "https://url-shortener-backend-deo7.onrender.com"
});

// AUTH HEADER AUTO
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

// FIXED ROUTES
export const login = (data) => API.post("/api/auth/login", data);
export const signup = (data) => API.post("/api/auth/signup", data);

export const shortenUrl = (data) => API.post("/api/url/create", data);

export const getUrls = () => API.get("/api/url/my");

export const shareUrl = (data) => API.post("/api/url/share", data);