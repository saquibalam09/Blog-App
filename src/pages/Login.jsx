import React from "react";
import { Login as LoginComponent } from "../components";
import Homelayout from "../Layout/Homelayout";

function Login() {
  return (
    <Homelayout>
      <div className="py-8">
        <LoginComponent />
      </div>
    </Homelayout>
  );
}

export default Login;
