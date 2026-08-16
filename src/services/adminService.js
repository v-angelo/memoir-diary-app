import apiService from "../api/apiService";

export const getUsersAPI = () => {
  return apiService("GET", "/user-list");
};

export const getStatsAPI = () => {
  return apiService("GET", "/stats");
};

export const deleteUserAPI = (userId) => {
  return apiService("DELETE", `/user/${userId}`);
};
