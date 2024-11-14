// services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const fetchTenders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tenders`);
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to retrieve tenders.");
    }
  } catch (error) {
    console.error("Error fetching tenders:", error);
    throw error;
  }
};

// Fetch a single tender
export const fetchTenderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tenders/${id}`);
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve tender details."
      );
    }
  } catch (error) {
    console.error("Error fetching tender details:", error);
    throw error;
  }
};

export const createTender = async (tenderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tenders`, tenderData);
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to create tender.");
    }
  } catch (error) {
    console.error("Error creating tender:", error);
    throw error;
  }
};
