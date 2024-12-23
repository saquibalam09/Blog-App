import React, { useEffect, useState } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Homelayout from "../Layout/Homelayout";
import { FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

export default function Post() {
  const [post, setPost] = useState(null);
  const [isLiking, setIsLiking] = useState(false); // State for like animation
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false); // State for comments visibility
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [comments, setComments] = useState([]); // State for comments
  const [likes, setLikes] = useState(0);
  const [hasLiked, sethasLiked] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          const parsedComments = post.comments.map((comment) =>
            JSON.parse(comment)
          );
          setComments(parsedComments);
          const likesObj = JSON.parse(post.likes);

          // Count the number of users who liked the post (count the keys in the likes object)
          const likesCount = Object.keys(likesObj).length;
          setLikes(likesCount);
          // Initialize comments
          // Parse the likes object from stringified data
          console.log(post.likes);

          const like = post.likes ? JSON.parse(post.likes) : {};
          console.log(like);

          // Check if the current user has liked the post
          sethasLiked(Boolean(like ? likes[userId] : false));
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  // console.log(post.likes);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const handleLike = async (postId, userId) => {
    try {
      setIsLiking(true); // Start the animation

      const updatedPost = await appwriteService.addLikes({
        postId,
        userId,
      });
      // Parse the likes object (assuming it's stored as a string in the database)
      const likesObj = JSON.parse(updatedPost.likes);

      // Count the number of users who liked the post (count the keys in the likes object)
      const likesCount = Object.keys(likesObj).length;
      setLikes(likesCount);

      // Update the state with the count of likes
      setPost((prev) => ({
        ...prev,
        likes: updatedPost.likes, // Store the likes count in the state
      }));

      setTimeout(() => setIsLiking(false), 500); // Stop animation after 300ms
      return updatedPost;
    } catch (error) {
      console.error("Error incrementing likes:", error);
      throw error;
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    //     The line if (!newComment.trim()) return; ensures that the comment input is not empty or only whitespace before proceeding with the logic to add a comment. Here's why it's important:

    // 1. Preventing Empty Comments
    // Scenario: A user might accidentally or intentionally submit a comment that only contains spaces or no characters at all.
    // Issue: This would result in a meaningless or empty entry in the comments array, which is undesirable in most applications.
    // Solution: trim() removes any whitespace from the beginning and end of the input. If the result is an empty string (""), the condition !newComment.trim() evaluates to true, and the function exits early with return.
    try {
      // console.log(userData);

      const comnt = [
        JSON.stringify({
          content: newComment,
          username: userData.name,
          createdAt: new Date().toISOString(),
        }),
      ];

      const updatedPost = await appwriteService.addComments({
        documentId: post.$id, // Post ID to update
        newComnt: comnt,
      });
      // const res = await appwriteService.addPeopleToDocument({
      //   documentId: post.$id,
      // });
      // console.log(res);
      // const addedComments = JSON.parse(updatedPost?.comments);
      const parsedComments = updatedPost.comments.map((comment) =>
        JSON.parse(comment)
      );
      setComments(parsedComments);
      // Update comments in state
      setNewComment(""); // Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return post ? (
    <Homelayout>
      <div className="py-12 bg-gray-50">
        <Container>
          {/* Post Container */}
          <div className="max-w-4xl mx-auto shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white relative">
            {/* Image Section */}
            <div className="relative">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-96 object-cover"
              />

              {/* Like Button */}
              <div className="absolute bottom-4 right-4">
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsCommentsVisible(!isCommentsVisible)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-300"
                  >
                    {!isCommentsVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleLike(post.$id)}
                    className={`flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                      isLiking ? "animate-pulse" : ""
                    }`}
                  >
                    {hasLiked ? (
                      <AiFillLike /> // Render filled like icon if the user has liked
                    ) : (
                      <AiOutlineLike /> // Render outline like icon if the user hasn't liked
                    )}
                    <span>{likes || 0}</span>
                  </button>
                </div>
              </div>

              {/* Author Buttons */}
              {isAuthor && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      bgColor="bg-green-600"
                      className="hover:bg-green-700 transition duration-300 px-4 py-2 rounded-lg shadow-md"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    bgColor="bg-red-600"
                    onClick={deletePost}
                    className="hover:bg-red-700 transition duration-300 px-4 py-2 rounded-lg shadow-md"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
                {post.title}
              </h1>
              <p className="text-gray-500 text-lg mb-6">{post.excerpt}</p>
              <div className="prose prose-lg text-gray-700">
                <p>{parse(post.content)}</p>
              </div>

              {/* Comments Section */}
              {isCommentsVisible && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                  <div className="space-y-4">
                    <div className="space-y-6">
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-white shadow-md p-6 rounded-lg flex items-start space-x-4 border border-gray-200"
                        >
                          {/* User Avatar */}
                          <img
                            src={
                              comment.avatar ||
                              "https://i.pravatar.cc/150?img=43"
                            }
                            alt={`${comment.username || "User"}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          {/* Comment Content */}
                          <div className="flex-1">
                            {/* Username and Timestamp */}
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-base font-semibold text-gray-800">
                                {comment.username || "Anonymous"}
                              </p>
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  { addSuffix: true }
                                )}
                              </span>
                            </div>

                            {/* Comment Text */}
                            <p className="text-sm text-gray-600 text-left">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                      className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2"
                    />
                    <button
                      onClick={addComment}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-r-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Homelayout>
  ) : null;
}
