import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log("Unauthorized Access!");
      } else if (status === 404) {
        console.log("API not found!");
      } else if (status === 500) {
        console.log("Server Error!");
      }
    } else if (error.request) {
      console.log("No response received from server!");
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
