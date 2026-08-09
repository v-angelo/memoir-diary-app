import apiService from "../api/apiService";

// register user
export const registerAPI = (reqBody) =>
  apiService("POST", "/register", reqBody);

// login user
export const loginAPI = (reqBody) => apiService("POST", "/login", reqBody);

// get current user
export const getCurrentUserAPI = () => apiService("GET", "/me");

// logout user
export const logoutAPI = () => {
  sessionStorage.removeItem("token");
};
