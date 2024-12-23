import React from "react";

const FullscreenLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-blue-500">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default FullscreenLoader;
