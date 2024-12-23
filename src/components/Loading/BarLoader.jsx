import React from "react";

const BarLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64 h-2 bg-gray-300 relative overflow-hidden">
        <div className="absolute h-2 bg-blue-500 animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default BarLoader;
