import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from './config';
import { Logger } from './logger';

/**
 * API Error class for better error handling
 */
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * HTTP Client for making API requests
 */
export class HttpClient {
  private client: AxiosInstance;
  private logger: Logger;
  
  constructor(baseURL: string = config.api.baseUrl) {
    this.logger = Logger.getInstance();
    
    this.client = axios.create({
      baseURL,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    // Add default interceptors
    this.setupDefaultInterceptors();
  }
  
  /**
   * Set up default interceptors
   */
  private setupDefaultInterceptors(): void {
    // Request interceptor for logging
    this.client.interceptors.request.use((config) => {
      this.logger.logRequest(
        config.method?.toUpperCase() || 'UNKNOWN',
        config.url || 'UNKNOWN',
        config.data
      );
      return config;
    });
    
    // Response interceptor for error handling and logging
    this.client.interceptors.response.use(
      (response) => {
        this.logger.logResponse(response.status, response.data);
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          this.logger.error(
            `API Error: ${error.response.status} - ${error.message}`,
            error.response.data
          );
          throw new ApiError(
            error.message || 'API Error',
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          this.logger.error('No response received from server', error.request);
          throw new ApiError(
            'No response received from server',
            0,
            null
          );
        } else {
          this.logger.error('Request configuration error', error.message);
          throw new ApiError(
            'Request configuration error',
            0,
            null
          );
        }
      }
    );
  }
  
  /**
   * Add request interceptor
   */
  public addRequestInterceptor(onFulfilled: any, onRejected: any): void {
    this.client.interceptors.request.use(onFulfilled, onRejected);
  }
  
  /**
   * Add response interceptor
   */
  public addResponseInterceptor(onFulfilled: any, onRejected: any): void {
    this.client.interceptors.response.use(onFulfilled, onRejected);
  }
  
  /**
   * Perform GET request
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get<T>(url, config);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Perform POST request
   */
  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.post<T>(url, data, config);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Perform PUT request
   */
  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.put<T>(url, data, config);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Perform PATCH request
   */
  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.patch<T>(url, data, config);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Perform DELETE request
   */
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete<T>(url, config);
    } catch (error) {
      throw error;
    }
  }
} 