import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://3.27.202.81:8080/api';

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.get(url, config).then((response: AxiosResponse<T>) => response.data);
};

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return http.post(url, data, config).then((response: AxiosResponse<T>) => response.data);
};

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return http.put(url, data, config).then((response: AxiosResponse<T>) => response.data);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.delete(url, config).then((response: AxiosResponse<T>) => response.data);
};

// 确保所有HTTP方法都使用相同的拦截器
export const httpService = {
  get,
  post,
  put,
  delete: del,
};

// 导出类型以增强类型安全
export type { AxiosRequestConfig as HttpRequestConfig };
export type { AxiosResponse as HttpResponse };

export default httpService;