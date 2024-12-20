import React, { useState, useRef, useEffect } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import Font Awesome icons
import "./AuthForm.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const formContainerRef = useRef(null);

  useEffect(() => {
    const formContainer = formContainerRef.current;
    formContainer.classList.add("animate");

    setTimeout(() => {
      formContainer.classList.remove("animate");
    }, 1000); // Duration of animation
  }, [isLogin]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div
        className="h-auto shadow-lg rounded-lg w-full sm:w-96 md:w-1/3 lg:w-1/4 p-8 bg-white"
        ref={formContainerRef}
      >
        <div className="flex justify-center items-center font-bold text-2xl text-gray-700 mb-10">
          <button
            className={`px-10 py-3 rounded-2xl transition-all duration-300 ${
              isLogin
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            <FaSignInAlt size={24} /> {/* Sign In Icon */}
          </button>
          <button
            className={`px-10 py-3 rounded-2xl transition-all duration-300 ${
              !isLogin
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            <FaUserPlus size={24} /> {/* Sign Up Icon */}
          </button>
        </div>

        {isLogin ? (
          <div className="grid space-y-4">
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="text"
              placeholder="Username"
            />
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="password"
              placeholder="Password"
            />
            <a className="text-rose-600 text-sm text-center block" href="#">
              Forget your Password? Click here!
            </a>
            <button className="bg-cyan-500 text-white rounded-xl h-12 text-xl font-semibold hover:bg-cyan-400">
              Sign In
            </button>
            <p className="text-center text-lg m-2">Or</p>
            <button className="border-2 flex items-center justify-center rounded-2xl py-2 w-full hover:bg-cyan-300">
              <img
                className="ml-3 w-6"
                src="google-color.svg"
                alt="Google logo"
              />
              <p className="ml-4">Login with Google</p>
            </button>
            <p className="text-rose-600 text-sm text-center mt-4">
              You don't have an account?{" "}
              <a
                href="#"
                className="cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up Now
              </a>
            </p>
          </div>
        ) : (
          <div className="grid space-y-4">
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="text"
              placeholder="Username"
            />
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="email"
              placeholder="Email"
            />
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="password"
              placeholder="Password"
            />
            <input
              className="border-2 h-12 pl-4 rounded-xl text-lg"
              type="password"
              placeholder="Confirm Password"
            />
            <button className="bg-cyan-500 text-white rounded-xl h-12 text-xl font-semibold hover:bg-cyan-400">
              Sign Up
            </button>
            <p className="text-rose-600 text-sm text-center">
              You already have an account?{" "}
              <a
                href="#"
                className="cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Sign In Now
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
