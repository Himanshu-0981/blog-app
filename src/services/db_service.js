import { Client, ID, Databases, Storage, Query } from "appwrite";

import { env_config } from "../config/env_config";

// DATABASE SERVICE CLASS

export class Service {
  client = new Client();
  databases;
  bucket;

  // constructor method
  constructor() {
    this.client
      .setEndpoint(env_config.appwriteUrl)
      .setProject(env_config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create post
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        env_config.appwriteDatabaseID,
        env_config.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, userID }
      );
    } catch (err) {
      throw new Error("error while creating post :: ", err);
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        env_config.appwriteDatabaseID,
        env_config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      throw new Error("error while updating post :: ", err);
    }
  }

  // delete post
  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        env_config.appwriteDatabaseID,
        env_config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (err) {
      console.log("error while deleting post :: ", err);
      return false;
    }
  }

  // getting single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        env_config.appwriteDatabaseID,
        env_config.appwriteCollectionID,
        slug
      );
    } catch (err) {
      console.log("error while getting post :: ", err);
      return false;
    }
  }

  // getting all posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        env_config.appwriteDatabaseID,
        env_config.appwriteCollectionID,
        queries
      );
    } catch (err) {
      console.log("error while fetching all posts :: ", err);
    }
  }

  // file upload service
  async fileUpload(file) {
    const id = ID.unique();
    try {
      return await this.bucket.createFile(
        env_config.appwriteBucketID,
        id, // this id helps us to identify file
        file
      );
    } catch (err) {
      console.log("error while uploading file :: ", err);
      return false;
    }
  }

  // delete file
  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile(env_config.appwriteBucketID, fileID);
    } catch (err) {
      console.log("error while deleting file :: ", err);
      return false;
    }
  }

  // file preview
  async filePreview(fileID) {
    try {
      return await this.bucket.getFilePreview(
        env_config.appwriteBucketID,
        fileID
      );
    } catch (err) {
      console.log("error while getting file preview :: ", err);
      return false;
    }
  }
}

const service = new Service();
export default service;
