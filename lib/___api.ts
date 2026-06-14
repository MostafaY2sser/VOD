import axios from "axios";

let isRedirecting = false;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

});


// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // custom header
    config.headers = config.headers || {};
    config.headers["request-from"] = "spa";

  }

  return config;
});

// Handle unauthorized errors
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    if (
      status === 401 &&
      typeof window !== "undefined" &&
      !isRedirecting
    ) {
      isRedirecting = true;

      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/login";
    }

    console.error("API Error:", error);

    return Promise.reject(error);
  }
);