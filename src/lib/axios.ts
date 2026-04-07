// Axios HTTP client (moved from services/httpClient.ts)
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { HttpClientOptions } from "@/types/common";
import { handleApiError } from "@/utils/apiError";

const BASE_URL = "https://api.vanannek.blog";
// const BASE_URL = "";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let lastGlobalErrorTime = 0;
const GLOBAL_ERROR_THROTTLE_MS = 3000;

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const method = error.config?.method?.toUpperCase() || "";
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    if (isMutation) {
      const isNetworkError = !error.response;
      const isServerError = error.response && error.response.status >= 500;

      if (isNetworkError || isServerError) {
        const now = Date.now();
        if (now - lastGlobalErrorTime > GLOBAL_ERROR_THROTTLE_MS) {
          lastGlobalErrorTime = now;

          const message = isNetworkError
            ? "Unable to connect. Please check your connection and try again."
            : "Server error. Please try again in a moment.";

          window.dispatchEvent(
            new CustomEvent("global-api-error", {
              detail: { message },
            })
          );
        }
      }
    }

    return Promise.reject(handleApiError(error));
  },
);

export async function get<T>(
  url: string,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.get(url, config);
  return response.data;
}

export async function post<T>(
  url: string,
  data?: unknown,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.post(url, data, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data?: unknown,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.put(url, data, config);
  return response.data;
}

export async function patch<T>(
  url: string,
  data?: unknown,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.patch(url, data, config);
  return response.data;
}

export async function del<T>(
  url: string,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.delete(url, config);
  return response.data;
}

export default httpClient;
