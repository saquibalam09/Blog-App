import React from "react";

function Comments({ comments }) {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg flex space-x-4">
          {/* User Avatar */}
          <img
            src={comment.avatar}
            alt={`${comment.username || "User"}'s avatar`}
            className="w-10 h-10 rounded-full"
          />

          {/* Comment Content */}
          <div>
            {/* Username and Timestamp */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                {comment.username}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>

            {/* Comment Text */}
            <p className="mt-1 text-sm text-gray-600">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
