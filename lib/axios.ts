import ROUTES from "@/constants/routes";
import axios from "axios";
import cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL
      : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// HANDLE ACCESS EXPIRATION ON CLIENT
axiosInstance.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("auth")
    ) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        // Make a request to your auth server to refresh the token.

        const response = await axiosInstance.post("/auth/refresh");
        const { accessToken } = response.data?.data;

        if (!accessToken) throw new Error("Canot generate access token");

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken?.value}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        cookies.remove("accessToken");
        cookies.remove("refreshToken");

        // window.location.href = ROUTES.LOGIN;

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);
