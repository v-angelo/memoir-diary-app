import axiosInstance from "./axiosInstance";

const apiService = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService;
