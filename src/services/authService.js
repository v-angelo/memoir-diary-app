import apiService from "../api/apiService";

// register user
export const registerAPI = async (reqBody) => {
  try {
    const response = await apiService("POST", "/register", reqBody);

    return response;
  } catch (error) {
    throw error;
  }
};

// login user
export const loginAPI = async (reqBody) => {
  try {
    const response = await apiService("POST", "/login", reqBody);

    // save token if login successful
    if (response?.data?.token) {
      sessionStorage.setItem("token", response?.data?.token);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// get current user
export const getCurrentUserAPI = async () => {
  try {
    const response = await apiService("GET", "/me");

    return response;
  } catch (error) {
    throw error;
  }
};

// logout user
export const logoutAPI = () => {
  sessionStorage.removeItem("token");
};
