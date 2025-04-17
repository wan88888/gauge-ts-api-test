import * as chai from 'chai';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { ApiAssertions } from './assertions';

const { expect } = chai;

/**
 * API test helper class
 */
export class ApiTestHelper {
  /**
   * Validate Post structure
   */
  public static validatePostStructure(post: Post): void {
    expect(post).to.be.an('object');
    ApiAssertions.assertHasProperty(post, 'id');
    ApiAssertions.assertHasProperty(post, 'userId');
    ApiAssertions.assertHasProperty(post, 'title');
    ApiAssertions.assertHasProperty(post, 'body');
    
    ApiAssertions.assertMatchesSchema(post, {
      id: 'number',
      userId: 'number',
      title: 'string',
      body: 'string'
    });
  }

  /**
   * Validate User structure
   */
  public static validateUserStructure(user: User): void {
    expect(user).to.be.an('object');
    ApiAssertions.assertHasProperty(user, 'id');
    ApiAssertions.assertHasProperty(user, 'name');
    ApiAssertions.assertHasProperty(user, 'username');
    ApiAssertions.assertHasProperty(user, 'email');
    
    ApiAssertions.assertMatchesSchema(user, {
      id: 'number',
      name: 'string',
      username: 'string',
      email: 'string'
    });
  }

  /**
   * Validate Comment structure
   */
  public static validateCommentStructure(comment: Comment): void {
    expect(comment).to.be.an('object');
    ApiAssertions.assertHasProperty(comment, 'id');
    ApiAssertions.assertHasProperty(comment, 'postId');
    ApiAssertions.assertHasProperty(comment, 'name');
    ApiAssertions.assertHasProperty(comment, 'email');
    ApiAssertions.assertHasProperty(comment, 'body');
    
    ApiAssertions.assertMatchesSchema(comment, {
      id: 'number',
      postId: 'number',
      name: 'string',
      email: 'string',
      body: 'string'
    });
  }

  /**
   * Generate random post data
   */
  public static generatePostData(userId: number = 1): Post {
    return {
      userId,
      title: `Test Post ${Date.now()}`,
      body: `This is a test post created at ${new Date().toISOString()}`
    };
  }

  /**
   * Generate random user data
   */
  public static generateUserData(): User {
    const timestamp = Date.now();
    return {
      name: `Test User ${timestamp}`,
      username: `testuser${timestamp}`,
      email: `testuser${timestamp}@example.com`
    };
  }
  
  /**
   * Sleep for a specified duration
   */
  public static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Retry an async function with delay
   */
  public static async retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000,
    onRetry?: (error: Error, attempt: number) => void
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (onRetry) {
          onRetry(lastError, attempt);
        }
        
        if (attempt < retries) {
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError!;
  }
} 