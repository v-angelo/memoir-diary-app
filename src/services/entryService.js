import apiService from "../api/apiService";

// create entry
export const createEntryAPI = async (data) => {
  return await apiService("POST", "/entry", data);
};

// get all entries
export const getEntriesAPI = async () => {
  return await apiService("GET", "/entries");
};

// get entries by date
export const getEntriesByDateAPI = async (date) => {
  return await apiService("GET", `/entries/date/${date}`);
};

// get a single entry
export const getEntryAPI = async (id) => {
  return await apiService("GET", `/entry/${id}`);
};

// update entry
export const updateEntryAPI = async (id, data) => {
  return await apiService("PUT", `/entry/${id}`, data);
};

// delete entry
export const deleteEntryAPI = async (id) => {
  return await apiService("DELETE", `/entry/${id}`);
};
