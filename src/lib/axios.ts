import axios from "axios";
import type { AxiosResponse } from "axios";
import {
  API_ERROR_MESSAGES,
  isGlobalMutationErrorCode,
} from "@/const/apiErrorCodes";
import { API_BASE_URL, GLOBAL_ERROR_THROTTLE_MS } from "@/const/apiConfig";
import type { HttpClientOptions } from "@/types/common";
import { handleApiError } from "@/utils/apiError";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let lastGlobalErrorTime = 0;

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = handleApiError(error);
    const method = error.config?.method?.toUpperCase() || "";
    const isMutation = ["GET", "POST", "PUT", "PATCH", "DELETE"].includes(
      method,
    );

    if (isMutation) {
      const isGlobalMutationError = isGlobalMutationErrorCode(
        normalizedError.code,
      );

      if (isGlobalMutationError) {
        const now = Date.now();
        if (now - lastGlobalErrorTime > GLOBAL_ERROR_THROTTLE_MS) {
          lastGlobalErrorTime = now;
          const message = API_ERROR_MESSAGES[normalizedError.code];

          window.dispatchEvent(
            new CustomEvent("global-api-error", {
              detail: { message },
            }),
          );
        }
      }
    }

    return Promise.reject(normalizedError);
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

// For testing purposes
export const __resetGlobalErrorTimeForTesting = () => {
  lastGlobalErrorTime = 0;
};

export default httpClient;
