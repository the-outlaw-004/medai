import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const storedToken = localStorage.getItem("accessToken");
    if (err.response?.status === 401 && storedToken && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await api.post("/auth/refresh");
        const newToken = refreshRes.data?.accessToken;
        localStorage.setItem("accessToken", newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshError) {
        console.log("referesh failed", refreshError);
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
