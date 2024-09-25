import axios from "axios";

/**
 * Axios instance configured to interact with the API backend.
 * - Base URL: `http://127.0.0.1:8000/api/`
 * - Timeout: 5000ms
 * - Content-Type: `application/json`
 *
 * @constant {AxiosInstance} api
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios request interceptor to add the JWT access token to the request headers.
 *
 * @function
 * @param {object} config - The Axios request configuration object.
 * @returns {object} config - The modified Axios request configuration object with the Authorization header set if a valid access token is found.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Function to refresh the access token using the refresh token stored in localStorage.
 * It sends a POST request to the `/refresh-token/` endpoint.
 *
 * @async
 * @function refreshAccessToken
 * @throws {Error} Throws an error if no refresh token is available or if the refresh request fails.
 * @returns {Promise<string>} Returns the new access token and stores it in localStorage.
 */
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    // Handle case where refresh token doesn't exist (e.g., user needs to re-authenticate)
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/refresh-token/",
      {
        refresh_token: refreshToken,
      },
    );

    // Store the new access token
    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error; // This will trigger the logic to log the user out
  }
};

/**
 * Axios response interceptor to handle cases where the access token has expired.
 * If the response status is 401 (Unauthorized), the interceptor attempts to refresh the access token using the refresh token.
 * If the refresh succeeds, the original request is retried with the new access token.
 * If the refresh fails, the user is redirected to the login page.
 *
 * @function
 * @param {object} response - The Axios response object.
 * @param {object} error - The Axios error object.
 * @returns {Promise} Returns the original request with the new token or redirects to the login page if the refresh token is expired.
 */
api.interceptors.response.use(
  (response) => response, // Pass through if the response is successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token (401 Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // To avoid an infinite loop of retries

      try {
        // Attempt to refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Update the Authorization header in the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (err) {
        // If refresh fails (e.g., refresh token is expired), redirect to login
        console.error("Refresh token failed. Redirecting to login.");
        window.location.href = "/login"; // Redirect to login page
      }
    }

    // If the error is not related to token expiration, return a rejected promise
    return Promise.reject(error);
  },
);

export default api;
