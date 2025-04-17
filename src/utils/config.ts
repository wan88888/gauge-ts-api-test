import * as dotenv from 'dotenv';
import * as path from 'path';

// Initialize dotenv
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  logging: {
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  test: {
    defaultTimeout: number;
  };
}

/**
 * Global configuration
 */
export const config: AppConfig = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.TIMEOUT || '30000'),
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(process.env.RETRY_DELAY || '1000')
  },
  logging: {
    enabled: process.env.LOGGING_ENABLED !== 'false',
    level: (process.env.LOGGING_LEVEL as any) || 'info'
  },
  test: {
    defaultTimeout: parseInt(process.env.TEST_TIMEOUT || '60000')
  }
};

/**
 * Get environment specific configuration
 */
export function getConfig(): AppConfig {
  return config;
} 