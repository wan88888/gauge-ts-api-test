import * as chai from 'chai';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';

const { expect } = chai;

/**
 * API assertions helper class
 */
export class ApiAssertions {
  /**
   * Assert response status
   */
  public static assertStatusCode(actual: number, expected: number): void {
    expect(actual).to.equal(expected, `Expected status code ${expected}, but got ${actual}`);
  }

  /**
   * Assert response is successful
   */
  public static assertSuccessResponse(statusCode: number): void {
    expect(statusCode).to.be.within(200, 299, `Expected success status code, but got ${statusCode}`);
  }

  /**
   * Assert response is client error
   */
  public static assertClientError(statusCode: number): void {
    expect(statusCode).to.be.within(400, 499, `Expected client error status code, but got ${statusCode}`);
  }

  /**
   * Assert response is server error
   */
  public static assertServerError(statusCode: number): void {
    expect(statusCode).to.be.within(500, 599, `Expected server error status code, but got ${statusCode}`);
  }

  /**
   * Assert response has content type
   */
  public static assertContentType(headers: Record<string, string>, contentType: string): void {
    const actualContentType = headers['content-type'] || '';
    expect(actualContentType).to.include(contentType, 
      `Expected content type to include "${contentType}", but got "${actualContentType}"`);
  }

  /**
   * Assert array has items
   */
  public static assertHasItems<T>(array: T[]): void {
    expect(array).to.be.an('array');
    expect(array.length).to.be.greaterThan(0, 'Expected array to have at least one item');
  }

  /**
   * Assert array has exact number of items
   */
  public static assertItemCount<T>(array: T[], count: number): void {
    expect(array).to.be.an('array');
    expect(array.length).to.equal(count, `Expected array to have ${count} items, but got ${array.length}`);
  }

  /**
   * Assert object has property
   */
  public static assertHasProperty<T>(obj: T, property: keyof T): void {
    expect(obj).to.have.property(property as string);
  }

  /**
   * Assert property equals value
   */
  public static assertPropertyEquals<T, K extends keyof T>(obj: T, property: K, value: T[K]): void {
    expect(obj).to.have.property(property as string).that.equals(value);
  }

  /**
   * Assert object matches schema
   */
  public static assertMatchesSchema<T>(obj: T, schema: Record<string, any>): void {
    for (const [key, type] of Object.entries(schema)) {
      expect(obj).to.have.property(key);
      expect(typeof (obj as any)[key]).to.equal(type, 
        `Expected property "${key}" to be of type "${type}", but got "${typeof (obj as any)[key]}"`);
    }
  }
} 