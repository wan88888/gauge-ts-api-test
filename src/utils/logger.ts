/**
 * Simple logger utility
 */
export class Logger {
  private static instance: Logger;
  private logEnabled: boolean = true;
  
  private constructor() {}
  
  /**
   * Get logger instance
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  /**
   * Enable or disable logging
   */
  public setLogEnabled(enabled: boolean): void {
    this.logEnabled = enabled;
  }
  
  /**
   * Log info message
   */
  public info(message: string, ...args: any[]): void {
    if (this.logEnabled) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }
  
  /**
   * Log error message
   */
  public error(message: string, ...args: any[]): void {
    if (this.logEnabled) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
  
  /**
   * Log warning message
   */
  public warn(message: string, ...args: any[]): void {
    if (this.logEnabled) {
      console.warn(`[WARNING] ${message}`, ...args);
    }
  }
  
  /**
   * Log debug message (only in development)
   */
  public debug(message: string, ...args: any[]): void {
    if (this.logEnabled && process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
  
  /**
   * Log request and response details
   */
  public logRequest(method: string, url: string, data?: any): void {
    if (this.logEnabled) {
      this.info(`Request: ${method} ${url}`);
      if (data) {
        this.debug('Request Data:', data);
      }
    }
  }
  
  /**
   * Log response details
   */
  public logResponse(status: number, data: any): void {
    if (this.logEnabled) {
      this.info(`Response: Status ${status}`);
      this.debug('Response Data:', data);
    }
  }
} 