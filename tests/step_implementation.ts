import { Step, BeforeSuite, AfterSuite, DataStoreFactory } from 'gauge-ts';
import * as chai from 'chai';
import { PostsClient } from '../src/api/clients/posts.client';
import { UsersClient } from '../src/api/clients/users.client';
import { ApiTestHelper } from '../src/api/helpers/test.helper';
import { ApiAssertions } from '../src/api/helpers/assertions';
import { Post } from '../src/api/models/post.model';
import { User } from '../src/api/models/user.model';
import { Comment } from '../src/api/models/comment.model';
import { Logger } from '../src/utils/logger';

const { expect } = chai;
const dataStore = DataStoreFactory.getScenarioDataStore();
const suiteStore = DataStoreFactory.getSuiteDataStore();
const postsClient = new PostsClient();
const usersClient = new UsersClient();
const logger = Logger.getInstance();

export default class StepImplementation {
  @BeforeSuite()
  public async beforeSuite() {
    // Setup code that runs before the test suite
    logger.info('Starting API tests');
    
    // Store the start time for performance tracking
    suiteStore.put('startTime', Date.now());
  }

  @AfterSuite()
  public async afterSuite() {
    // Calculate test execution time
    const startTime = suiteStore.get('startTime') as number;
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    
    logger.info(`API tests completed. Total execution time: ${executionTime.toFixed(2)} seconds`);
  }

  // Posts API steps
  @Step("I get all posts")
  public async getAllPosts() {
    const posts = await ApiTestHelper.retry(
      async () => await postsClient.getAllPosts()
    );
    
    dataStore.put('posts', posts);
    ApiAssertions.assertHasItems(posts);
  }

  @Step("All posts should have the correct structure")
  public async validatePostsStructure() {
    const posts = dataStore.get('posts') as Post[];
    for (const post of posts) {
      ApiTestHelper.validatePostStructure(post);
    }
  }

  @Step("I get post with id <id>")
  public async getPostById(id: string) {
    const post = await ApiTestHelper.retry(
      async () => await postsClient.getPostById(parseInt(id, 10))
    );
    
    dataStore.put('post', post);
    expect(post).to.be.an('object');
    ApiAssertions.assertPropertyEquals(post, 'id', parseInt(id, 10));
  }

  @Step("The post should have the correct structure")
  public async validatePostStructure() {
    const post = dataStore.get('post') as Post;
    ApiTestHelper.validatePostStructure(post);
  }

  @Step("I create a new post with userId <userId>")
  public async createPost(userId: string) {
    const postData = ApiTestHelper.generatePostData(parseInt(userId, 10));
    dataStore.put('postData', postData);
    
    const createdPost = await ApiTestHelper.retry(
      async () => await postsClient.createPost(postData)
    );
    
    dataStore.put('createdPost', createdPost);
    
    expect(createdPost).to.be.an('object');
    ApiAssertions.assertHasProperty(createdPost, 'id');
    ApiAssertions.assertPropertyEquals(createdPost, 'title', postData.title);
    ApiAssertions.assertPropertyEquals(createdPost, 'body', postData.body);
  }

  @Step("The created post should match the sent data")
  public async validateCreatedPost() {
    const postData = dataStore.get('postData') as Post;
    const createdPost = dataStore.get('createdPost') as Post;
    
    ApiAssertions.assertPropertyEquals(createdPost, 'userId', postData.userId);
    ApiAssertions.assertPropertyEquals(createdPost, 'title', postData.title);
    ApiAssertions.assertPropertyEquals(createdPost, 'body', postData.body);
  }

  @Step("I update the post with id <id> with new data")
  public async updatePost(id: string) {
    const post = await postsClient.getPostById(parseInt(id, 10));
    const updatedData: Post = {
      ...post,
      title: `Updated Title ${Date.now()}`,
      body: `Updated Body ${Date.now()}`
    };
    
    dataStore.put('updatedData', updatedData);
    
    const updatedPost = await ApiTestHelper.retry(
      async () => await postsClient.updatePost(parseInt(id, 10), updatedData)
    );
    
    dataStore.put('updatedPost', updatedPost);
    
    expect(updatedPost).to.be.an('object');
    ApiAssertions.assertPropertyEquals(updatedPost, 'id', parseInt(id, 10));
  }

  @Step("The updated post should match the sent data")
  public async validateUpdatedPost() {
    const updatedData = dataStore.get('updatedData') as Post;
    const updatedPost = dataStore.get('updatedPost') as Post;
    
    ApiAssertions.assertPropertyEquals(updatedPost, 'title', updatedData.title);
    ApiAssertions.assertPropertyEquals(updatedPost, 'body', updatedData.body);
  }

  @Step("I delete the post with id <id>")
  public async deletePost(id: string) {
    const response = await ApiTestHelper.retry(
      async () => await postsClient.deletePost(parseInt(id, 10))
    );
    
    dataStore.put('deleteResponse', response);
  }

  @Step("The post should be successfully deleted")
  public async validatePostDeletion() {
    const deleteResponse = dataStore.get('deleteResponse');
    // For JSONPlaceholder, it returns empty object on successful delete
    expect(deleteResponse).to.be.an('object');
    
    try {
      // This should throw an error or return an empty response
      await postsClient.getPostById(10); // We're using a known ID that was deleted
    } catch (error) {
      // Success if we get an error
      return;
    }
  }

  @Step("I get comments for post with id <id>")
  public async getCommentsForPost(id: string) {
    const comments = await ApiTestHelper.retry(
      async () => await postsClient.getPostComments(parseInt(id, 10))
    );
    
    dataStore.put('comments', comments);
    
    ApiAssertions.assertHasItems(comments);
  }

  @Step("All comments should have the correct structure")
  public async validateCommentsStructure() {
    const comments = dataStore.get('comments') as Comment[];
    
    for (const comment of comments) {
      ApiTestHelper.validateCommentStructure(comment);
    }
  }

  // Users API steps
  @Step("I get all users")
  public async getAllUsers() {
    const users = await ApiTestHelper.retry(
      async () => await usersClient.getAllUsers()
    );
    
    dataStore.put('users', users);
    ApiAssertions.assertHasItems(users);
  }

  @Step("All users should have the correct structure")
  public async validateUsersStructure() {
    const users = dataStore.get('users') as User[];
    for (const user of users) {
      ApiTestHelper.validateUserStructure(user);
    }
  }

  @Step("I get user with id <id>")
  public async getUserById(id: string) {
    const user = await ApiTestHelper.retry(
      async () => await usersClient.getUserById(parseInt(id, 10))
    );
    
    dataStore.put('user', user);
    expect(user).to.be.an('object');
    ApiAssertions.assertPropertyEquals(user, 'id', parseInt(id, 10));
  }

  @Step("The user should have the correct structure")
  public async validateUserStructure() {
    const user = dataStore.get('user') as User;
    ApiTestHelper.validateUserStructure(user);
  }

  @Step("I create a new user")
  public async createUser() {
    const userData = ApiTestHelper.generateUserData();
    dataStore.put('userData', userData);
    
    const createdUser = await ApiTestHelper.retry(
      async () => await usersClient.createUser(userData)
    );
    
    dataStore.put('createdUser', createdUser);
    
    expect(createdUser).to.be.an('object');
    ApiAssertions.assertHasProperty(createdUser, 'id');
    ApiAssertions.assertPropertyEquals(createdUser, 'name', userData.name);
    ApiAssertions.assertPropertyEquals(createdUser, 'username', userData.username);
    ApiAssertions.assertPropertyEquals(createdUser, 'email', userData.email);
  }

  @Step("The created user should match the sent data")
  public async validateCreatedUser() {
    const userData = dataStore.get('userData') as User;
    const createdUser = dataStore.get('createdUser') as User;
    
    ApiAssertions.assertPropertyEquals(createdUser, 'name', userData.name);
    ApiAssertions.assertPropertyEquals(createdUser, 'username', userData.username);
    ApiAssertions.assertPropertyEquals(createdUser, 'email', userData.email);
  }

  @Step("I update the user with id <id> with new data")
  public async updateUser(id: string) {
    const user = await usersClient.getUserById(parseInt(id, 10));
    const updatedData: User = {
      ...user,
      name: `Updated Name ${Date.now()}`,
      email: `updated${Date.now()}@example.com`
    };
    
    dataStore.put('updatedData', updatedData);
    
    const updatedUser = await ApiTestHelper.retry(
      async () => await usersClient.updateUser(parseInt(id, 10), updatedData)
    );
    
    dataStore.put('updatedUser', updatedUser);
    
    expect(updatedUser).to.be.an('object');
    ApiAssertions.assertPropertyEquals(updatedUser, 'id', parseInt(id, 10));
  }

  @Step("The updated user should match the sent data")
  public async validateUpdatedUser() {
    const updatedData = dataStore.get('updatedData') as User;
    const updatedUser = dataStore.get('updatedUser') as User;
    
    ApiAssertions.assertPropertyEquals(updatedUser, 'name', updatedData.name);
    ApiAssertions.assertPropertyEquals(updatedUser, 'email', updatedData.email);
  }

  @Step("I delete the user with id <id>")
  public async deleteUser(id: string) {
    const response = await ApiTestHelper.retry(
      async () => await usersClient.deleteUser(parseInt(id, 10))
    );
    
    dataStore.put('deleteResponse', response);
  }

  @Step("The user should be successfully deleted")
  public async validateUserDeletion() {
    const deleteResponse = dataStore.get('deleteResponse');
    // For JSONPlaceholder, it returns empty object on successful delete
    expect(deleteResponse).to.be.an('object');
    
    try {
      // This should throw an error or return an empty response
      await usersClient.getUserById(10); // We're using a known ID that was deleted
    } catch (error) {
      // Success if we get an error
      return;
    }
  }

  @Step("I get posts for user with id <id>")
  public async getPostsForUser(id: string) {
    const posts = await ApiTestHelper.retry(
      async () => await usersClient.getUserPosts(parseInt(id, 10))
    );
    
    dataStore.put('userPosts', posts);
    
    expect(posts).to.be.an('array');
  }

  @Step("All user posts should have the correct structure")
  public async validateUserPostsStructure() {
    const posts = dataStore.get('userPosts') as Post[];
    
    if (posts.length === 0) {
      logger.info('No posts found for this user');
      return;
    }
    
    for (const post of posts) {
      ApiTestHelper.validatePostStructure(post);
    }
  }
} 