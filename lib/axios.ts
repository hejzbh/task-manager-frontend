import axios from "axios";
import cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    console.log(request);
    if (request.url?.includes("auth")) return request;

    console.log("✅✅✅✅");
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        const response = await axios.post(
          "test",
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data?.data;

        if (!accessToken) throw new Error("Canot generate access token");

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        // window.location.href = "/login";s
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);
