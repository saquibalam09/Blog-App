import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-full px-4 md:px-6 lg:px-2 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      {children}
    </div>
  );
}
export default Container;

{
  /* <Container className="max-w-full px-4"> */
}
