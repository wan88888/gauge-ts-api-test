# Posts API Tests

This specification covers tests for the Posts API endpoints from JSONPlaceholder.

## Get all posts

* I get all posts
* All posts should have the correct structure

## Get a specific post

* I get post with id "1"
* The post should have the correct structure

## Create a new post

* I create a new post with userId "1"
* The created post should match the sent data

## Update a post

* I update the post with id "1" with new data
* The updated post should match the sent data

## Delete a post

* I delete the post with id "10"
* The post should be successfully deleted

## Get comments for a post

* I get comments for post with id "1"
* All comments should have the correct structure 