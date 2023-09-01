"use client";
import { FC, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface SignupProps {
  isSignupFormOpen: boolean;
  toggleForm: () => void;
}

const Signup: FC<SignupProps> = (props) => {
  const { isSignupFormOpen, toggleForm } = props;

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signUpHandler = async () => {
    if (!emailRef.current || !passwordRef.current) return;

    setIsFormSubmitted(true);

    try {
      const response = await axios.post("/api/sign-up", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      setIsFormSubmitted(false);

      if (response.data)
        toast.success(`${response.statusText}. Please sign in`);
    } catch (error) {
      toast.error(`Something went wrong`);
      setIsFormSubmitted(false);
      console.log("Error", error);
    }
    toggleForm();
  };

  return isSignupFormOpen ? (
    <div className={classNames.container}>
      <div className={classNames.card}>
        <h2 className={classNames.heading}> Sign up</h2>
        <form>
          <div className={classNames.formControl}>
            <label htmlFor="email" className={classNames.label}>
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              className={classNames.input}
              id="email"
              placeholder="Enter your email"
            ></input>
          </div>
          <div className={classNames.formControl}>
            <label htmlFor="password" className={classNames.label}>
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              className={classNames.input}
              id="password"
              placeholder="Enter your password"
            ></input>
          </div>
          <div className={classNames.btnContainer}>
            <span className={classNames.cancel} onClick={() => toggleForm()}>
              Cancel
            </span>
            <button
              disabled={isFormSubmitted}
              onClick={signUpHandler}
              type="button"
              className={classNames.confirm}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Signup;

const classNames = {
  container:
    "fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-40",
  card: "bg-white rounded-lg p-8 shadow-lg transform translate-y-0 scale-100 transition-all duration-300",
  heading: "text-2xl mb-4",
  formControl: "mb-4",
  label: "block text-gray-700 text-sm font-bold mb-2",
  input:
    "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  btnContainer: "flex justify-between items-center",
  cancel: "text-xs text-red-600 cursor-pointer",
  confirm:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
};
