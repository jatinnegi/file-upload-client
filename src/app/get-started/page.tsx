"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initUser } from "@/redux/actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import GradientBox from "@/components/GradientBox";
import Navbar from "@/components/Navbar";

import axios from "axios";

interface FormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const GetStarted = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) router.push("/workspace");
    else setIsLoading(false);
  }, []);

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const [formErrors, setFormErrors] = useState<FormProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notFound, setNotFound] = useState<boolean>(false);

  const [auth, setAuth] = useState<"signup" | "signin">("signup");

  const onSubmit = async (body: FormProps) => {
    // Reset errors
    setFormErrors({ email: "", password: "", confirmPassword: "" });
    setNotFound(false);

    const uri =
      auth === "signup"
        ? "https://api.chat-1337.com/auth/sign-up"
        : "https://api.chat-1337.com/auth/sign-in";
    const formBody =
      auth === "signup" ? body : { email: body.email, password: body.password };

    try {
      const {
        data: {
          data: { accessToken },
        },
      } = await axios.post(uri, formBody);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        dispatch(initUser({ email: body.email, accessToken, isAuth: true }));
        router.push("/workspace");
      }
    } catch (err: any) {
      const { error, status } = err.response.data;

      if (typeof error === "object") {
        const updatedFormErrors: FormProps = {
          email: "",
          password: "",
          confirmPassword: "",
        };

        Object.keys(error).forEach((key: string) => {
          updatedFormErrors[key as keyof FormProps] = error[key];
        });

        setFormErrors(updatedFormErrors);
      } else if (status === 409)
        setFormErrors({ ...formErrors, email: "Email is already taken" });
      else if (status === 404) setNotFound(true);
      else console.log(err.response);
    }
  };

  useEffect(() => {
    setFormErrors({ email: "", password: "", confirmPassword: "" });
    reset({ email: "", password: "", confirmPassword: "" });
    setNotFound(false);
  }, [auth]);

  if (isLoading) return <div className="w-full h-full bg-[#1D1D21]" />;

  return (
    <GradientBox>
      <Navbar />
      <div className="w-11/12 max-w-sm mx-auto pt-20 pb-14">
        <p className="text-center text-lg">Get Started</p>
        {notFound && (
          <p className="bg-red-500 w-full py-4 px-2 text-xs tracking-wider rounded-md my-4">
            Invalid email or password
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full my-4">
          <div className="w-full mb-3">
            <input
              type="text"
              placeholder="Email"
              className={`w-full bg-[#333] py-3 px-2 rounded-sm text-xs outline-none
                ${
                  formErrors.email ? "border-2 border-red-500" : "border-none"
                }`}
              autoComplete="off"
              {...register("email")}
            />
            <p
              className={`${
                formErrors.email
                  ? "opacity-1 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } text-xs text-red-500 font-bold mt-1`}
            >
              {formErrors.email}
            </p>
          </div>
          <div className="w-full mb-3">
            <input
              type="password"
              placeholder="Password"
              className={`w-full bg-[#333] py-3 px-2 rounded-sm text-xs outline-none
              ${
                formErrors.password ? "border-2 border-red-500" : "border-none"
              }`}
              {...register("password")}
            />

            <p
              className={`${
                formErrors.password
                  ? "opacity-1 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } text-xs text-red-500 font-bold mt-1`}
            >
              {formErrors.password}
            </p>
          </div>
          {auth === "signup" && (
            <div className="w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`w-full bg-[#333] py-3 px-2 rounded-sm text-xs outline-none
                  ${
                    formErrors.confirmPassword
                      ? "border-2 border-red-500"
                      : "border-none"
                  }`}
                {...register("confirmPassword")}
              />
              <p
                className={`${
                  formErrors.confirmPassword
                    ? "opacity-1 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } text-xs text-red-500 font-bold mt-1`}
              >
                {formErrors.confirmPassword}
              </p>
            </div>
          )}
          <button
            type="submit"
            className="bg-orange-600 outline-none w-full
            text-xs font-medium py-3 rounded-sm mt-6"
          >
            {auth === "signup" ? "Sign Up" : "Sign In"}
          </button>
          <button
            type="button"
            className="mt-4 outline-none border-none bg-none text-xs text-left w-full"
            onClick={() => {
              if (auth === "signup") setAuth("signin");
              else setAuth("signup");
            }}
          >
            {auth === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </button>
        </form>
      </div>
    </GradientBox>
  );
};

export default GetStarted;
