import api from "../api/axiosClient";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function register(email, password) {
  return api.post(`${apiURL}/auth/signup`, { email, password });
}

export async function login(email, password) {
  return api.post(`${apiURL}/auth/login`, { email, password });
}

export async function refreshToken() {
  return api.post(`${apiURL}/auth/refresh`, {});
}

export async function logout() {
  return api.post(`${apiURL}/auth/logout`, {});
}
