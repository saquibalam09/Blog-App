import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Button, Input, Logo } from "./index";
import Spinner from "./Loading/Spinner";
import Loading from "./Loading/Loading";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  //   console.log(register);

  const create = async (data) => {
    setError("");

    try {
      setLoading(true);
      const response = await authService.createAccount(data);
      if (response.session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);

        if (userData) dispatch(login(userData));
        navigate("/");
      }
      // console.log("Userdata->", response);
      // authService.logout().then(() => {
      //   dispatch(logout());
      //   navigate("/");
      // });

      // if (userData) {
      //   const user = await authService.getCurrentUser();
      //   console.log("User->", user);
      //   if (user) dispatch(login(user));
      //   navigate("/");
      // }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <div className="flex flex-col pb-5 items-center space-y-4">
          <h2 className="text-center text-lg font-extrabold leading-snug text-gray-900 sm:text-4xl">
            Join Us and Create an Account
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600 sm:text-xl">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              {loading ? (
                <Loading />
              ) : (
                <p className="font-semibold">Create Account</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
