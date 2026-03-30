// Axios HTTP client (moved from services/httpClient.ts)
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { HttpClientOptions } from "@/types/common";

const BASE_URL = "https://api.vanannek.blog";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function get<T>(
  url: string,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.get(url, config);
  return response.data;
}

export async function post<T>(
  url: string,
  data?: any,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.post(url, data, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data?: any,
  config?: HttpClientOptions,
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.put(url, data, config);
  return response.data;
}

export async function patch<T>(
  url: string,
  data?: any,
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
