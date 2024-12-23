import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full p-6 bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="mb-6">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-full object-cover  rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-base">
          {/* Add a brief excerpt or description here if desired */}
          This is a preview of the blog post content that encourages users to
          click and read more.
        </p>
      </div>
    </Link>
  );
}
export default PostCard;
