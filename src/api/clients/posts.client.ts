import { HttpClient } from '../../utils/http-client';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

/**
 * Posts API client
 */
export class PostsClient {
  private httpClient: HttpClient;
  private basePath = '/posts';

  constructor() {
    this.httpClient = new HttpClient();
  }

  /**
   * Get all posts
   */
  public async getAllPosts(): Promise<Post[]> {
    const response = await this.httpClient.get<Post[]>(this.basePath);
    return response.data;
  }

  /**
   * Get post by ID
   */
  public async getPostById(id: number): Promise<Post> {
    const response = await this.httpClient.get<Post>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Create a new post
   */
  public async createPost(post: Post): Promise<Post> {
    const response = await this.httpClient.post<Post>(this.basePath, post);
    return response.data;
  }

  /**
   * Update a post
   */
  public async updatePost(id: number, post: Post): Promise<Post> {
    const response = await this.httpClient.put<Post>(`${this.basePath}/${id}`, post);
    return response.data;
  }

  /**
   * Delete a post
   */
  public async deletePost(id: number): Promise<any> {
    const response = await this.httpClient.delete(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Get comments for a post
   */
  public async getPostComments(postId: number): Promise<Comment[]> {
    const response = await this.httpClient.get<Comment[]>(`${this.basePath}/${postId}/comments`);
    return response.data;
  }
} 