import React, { useState, useEffect } from "react";
import Comments from "./Comments";

function ParentComponent({ initialComments }) {
  const [comments, setComments] = useState([]);

  //   async function getUserById(userId) {
  //     try {
  //       const user = await user.get(userId); // Replace with your actual user fetching logic
  //       return user;
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       return null;
  //     }
  //   }

  useEffect(() => {
    async function fetchUserDetailsForComments() {
      const updatedComments = await Promise.all(
        initialComments.map(async (comment) => {
          const userDetails = await getUserById(comment.userId);
          return {
            ...comment,
            username: userDetails?.name || "Unknown User",
            avatar: userDetails?.avatar || "default-avatar-url.jpg",
          };
        })
      );
      setComments(updatedComments);
    }

    fetchUserDetailsForComments();
  }, [initialComments]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <Comments comments={comments} />
    </div>
  );
}

export default ParentComponent;
