import React from "react";
import { Signup as Signupcommponents } from "../components";
import Homelayout from "../Layout/Homelayout";

function SignUp() {
  return (
    <Homelayout>
      <div className="py-8">
        <Signupcommponents />
      </div>
    </Homelayout>
  );
}

export default SignUp;
