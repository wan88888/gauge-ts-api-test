import { HttpClient } from '../../utils/http-client';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

/**
 * Users API client
 */
export class UsersClient {
  private httpClient: HttpClient;
  private basePath = '/users';

  constructor() {
    this.httpClient = new HttpClient();
  }

  /**
   * Get all users
   */
  public async getAllUsers(): Promise<User[]> {
    const response = await this.httpClient.get<User[]>(this.basePath);
    return response.data;
  }

  /**
   * Get user by ID
   */
  public async getUserById(id: number): Promise<User> {
    const response = await this.httpClient.get<User>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Create a new user
   */
  public async createUser(user: User): Promise<User> {
    const response = await this.httpClient.post<User>(this.basePath, user);
    return response.data;
  }

  /**
   * Update a user
   */
  public async updateUser(id: number, user: User): Promise<User> {
    const response = await this.httpClient.put<User>(`${this.basePath}/${id}`, user);
    return response.data;
  }

  /**
   * Delete a user
   */
  public async deleteUser(id: number): Promise<any> {
    const response = await this.httpClient.delete(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Get posts for a user
   */
  public async getUserPosts(userId: number): Promise<Post[]> {
    const response = await this.httpClient.get<Post[]>(`${this.basePath}/${userId}/posts`);
    return response.data;
  }
} 