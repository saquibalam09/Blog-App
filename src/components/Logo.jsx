import React from "react";
import logo from "../assets/logo.jpeg";
function Logo({ width = "100px" }) {
  return (
    <div>
      <img className="rounded-lg" src={logo} alt="" width={width} />
    </div>
  );
}

export default Logo;
