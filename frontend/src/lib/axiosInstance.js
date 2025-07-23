import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  withCredentials: true,
});

// Avoid retrying refresh on logout or refresh-token itself
const noRetryRoutes = ["/logout", "/refresh-token", "/login", "/register"];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !noRetryRoutes.some(route => originalRequest.url.includes(route))
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/api/v1/users/refresh-token");
        return axiosInstance(originalRequest); // retry original
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        //don't redirect again if already at sign-in
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
