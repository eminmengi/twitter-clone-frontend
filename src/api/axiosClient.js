import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Her istekte token ekle
axiosClient.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${t}`,
    };
  }
  return config;
});

// 401 olursa otomatik logout
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
