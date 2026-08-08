import apiService from "../api/apiService";

// create entry
export const createEntryAPI = async (reqBody) => {
  try {
    const response = await apiService("POST", "/entry", reqBody);

    return response;
  } catch (error) {
    throw error;
  }
};

// get all entries
export const getEntriesAPI = async () => {
  try {
    const response = await apiService("GET", "/entries");

    return response;
  } catch (error) {
    throw error;
  }
};

// get single entry
export const getEntryAPI = async (entryId) => {
  try {
    const response = await apiService("GET", `/entry/${entryId}`);

    return response;
  } catch (error) {
    throw error;
  }
};

// update entry
export const updateEntryAPI = async (entryId, reqBody) => {
  try {
    const response = await apiService("PUT", `/entry/${entryId}`, reqBody);

    return response;
  } catch (error) {
    throw error;
  }
};

// delete entry
export const deleteEntryAPI = async (entryId) => {
  try {
    const response = await apiService("DELETE", `/entry/${entryId}`);

    return response;
  } catch (error) {
    throw error;
  }
};

// get entries by date
export const getEntriesByDateAPI = async (date) => {
  try {
    const response = await apiService("GET", `/entries/date/${date}`);

    return response;
  } catch (error) {
    throw error;
  }
};
