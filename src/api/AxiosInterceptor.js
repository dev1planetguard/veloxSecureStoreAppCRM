// api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API_BASE_URL = "http://192.168.0.204:9191/api/v1"; //development env
// export const API_BASE_URL = 'http://45.118.160.135:9192/api/v1'; // public not secured env
// export const API_BASE_URL = 'https://veloxcrm.com/api/v1'; //production env (secured)

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // optional: 10s timeout
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Example: attach token if exists
    //  if (!config.url.includes("/login")) {
    //    const token = await AsyncStorage.getItem("jwtToken");
    //    console.log('in axios interceptor',token);
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('config urlllllll----', config.url);

    if (config.url !== "/login" || config.url !== '/createUser') {  // exclude only "/login"
      const token = await AsyncStorage.getItem("jwtToken");
      console.log('in axios interceptor', token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (401, 500, etc.)
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
      // e.g. redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
