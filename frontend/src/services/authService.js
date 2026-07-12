import api from "./api";

// Register User
export const registerUser = async (userData) => {
  const response = await api.post("/users/register/", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await api.post("/users/login/", userData);
  return response.data;
};

// Get Logged-in User
export const getProfile = async () => {
  const token = localStorage.getItem("access");

  const response = await api.get("/users/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};