import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { BASE_API } from "./constants";

const API = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch {
    return null;
  }
};

API.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
    }

    const msg = error.response?.data?.message || "Something went wrong!";
    console.error("API Error:", msg);

    return Promise.reject(error);
  }
);

export default API;
