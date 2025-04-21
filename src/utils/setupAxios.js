import axios from "axios";
import Cookies from "js-cookie";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3002", // Replace with your API base URL
  timeout: 10000, // Optional: set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage (or any storage mechanism you're using)
    const token = Cookies.get("token");

    // If the token exists, add it to the headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

export default axiosInstance;
