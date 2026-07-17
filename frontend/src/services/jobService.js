import axios from "axios";

const API_URL =
  "https://jobconnect-ai-powered-job-portal.onrender.com/api";

export const getJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/`);
  return response.data.results || response.data;
};

export const getPopularSearches = async () => {
  const response = await axios.get(
    `${API_URL}/jobs/popular-searches/`
  );
  return response.data;
};