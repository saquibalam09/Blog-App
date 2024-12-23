import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }
  // async addPeopleToDocument({ documentId }) {
  //   try {
  //     const newPeople = [
  //       { name: "Alice Brown", age: 28 },
  //       { name: "Bob Green", age: 35 },
  //     ];
  //     // Retrieve the existing document
  //     const existingDocument = await this.databases.getDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       documentId
  //     );

  //     // Append new people to the existing array or initialize if it doesn't exist
  //     const updatedPeople = [
  //       ...(existingDocument.people || []), // Fallback to an empty array if 'people' doesn't exist
  //       ...newPeople, // Add new people
  //     ];

  //     // Update the document with the updated array
  //     const updatedDocument = await this.databases.updateDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       documentId,
  //       { people: updatedPeople }
  //     );

  //     console.log("Document updated successfully:", updatedDocument);

  //     return updatedDocument; // Return the updated document
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //     throw error;
  //   }
  // }
  async addPeopleToDocument({ documentId }) {
    try {
      const newPeople = [
        JSON.stringify({ name: "Alice Brown", age: 28 }),
        JSON.stringify({ name: "Bob Green", age: 35 }),
      ];

      const existingDocument = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );

      const updatedPeople = [
        ...(existingDocument.comments || []),
        ...newPeople,
      ];

      const updatedDocument = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        { comments: updatedPeople }
      );

      console.log("Document updated successfully:", updatedDocument);
      return updatedDocument;
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  async addComments({ documentId, newComnt }) {
    try {
      // Retrieve the existing document
      // const existingPost = await this.databases.getDocument(
      //   conf.appwriteDatabaseId,
      //   conf.appwriteCollectionId,
      //   postId
      // );
      const existingDocument = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      const updatedComments = [
        ...(existingDocument.comments || []),
        ...newComnt,
      ];
      const updatedDocument = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        { comments: updatedComments }
      );
      return updatedDocument;

      // const data = {
      //   people: [
      //     { name: "John Doe", age: 30 },
      //     { name: "Jane Smith", age: 25 },
      //   ],
      // };

      // const newPeople = [
      //   { name: "John Doe", age: 30 },
      //   { name: "Jane Smith", age: 25 },
      // ];

      // Update the document
      // this.databases.updateDocument(
      //   "[DATABASE_ID]",
      //   "[COLLECTION_ID]",
      //   "[DOCUMENT_ID]",
      //   {
      //     comments: data, // Adding or replacing the array of objects
      //   }
      // );
      // const attribute = await this.databases.createJsonAttribute(
      //   conf.appwriteDatabaseId, // Replace with your database ID
      //   conf.appwriteCollectionId, // Replace with your collection ID
      //   "comments", // Attribute key for the array
      //   true // Required attribute (true/false)
      // );
      // console.log("Attribute added:", attribute);

      // Append the new comment to the existing comments array
      // const updatedComments = [
      //   ...((existingPost.comments && existingPost.comments) || []), // Fallback to an empty array if comments is null or empty
      //   content, // New comment
      // ];
      // console.log(updatedComments);

      // return await this.databases.updateDocument(
      //   conf.appwriteDatabaseId,
      //   conf.appwriteCollectionId,
      //   postId,
      //   { comments: data }
      // );
    } catch (error) {
      console.log("Appwrite service :: addComments :: error", error);
      throw error;
    }
  }

  // async addComments({ postId, content, userId, createdAt }) {
  //   try {
  //     // Retrieve the existing document
  //     const existingPost = await this.databases.getDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       postId
  //     );

  //     // Ensure existingPost.comments is an array
  //     const updatedComments = [
  //       ...(existingPost.comments || []), // Use existing comments if present
  //       { content, userId, createdAt }, // Add the new comment
  //     ];

  //     // Update the document with the new comments array
  //     return await this.databases.updateDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       postId,
  //       { comments: updatedComments } // Pass the array directly
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: addComments :: error", error);
  //     throw error;
  //   }
  // }

  async addLikes({ postId, userId }) {
    try {
      // Fetch the current post to check if the user has already liked
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );

      // Check if the user has already liked the post
      const likes = post.likes ? JSON.parse(post.likes) : {};

      if (!likes[userId]) {
        // Add the user's like (if they haven't liked the post already)
        likes[userId] = true;

        // Save the updated likes object back to the database
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          postId,
          {
            likes: JSON.stringify(likes), // Store the likes object as a string
          }
        );
      } else {
        likes[userId] = false;

        // Save the updated likes object back to the database
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          postId,
          {
            likes: JSON.stringify(likes), // Store the likes object as a string
          }
        );
        // console.log("User has already liked this post.");
      }

      // Return the post with the likes object (in both cases)
    } catch (error) {
      console.log("Appwrite service :: addLikes :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
