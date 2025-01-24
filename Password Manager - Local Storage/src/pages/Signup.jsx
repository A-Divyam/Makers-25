import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    enrollmentNo: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, enrollmentNo, email, password } = signupInfo;
    if (!name || !enrollmentNo || !email || !password) {
      return handleError(
        "name, enrollment number, email and password are required"
      );
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        console.log(error);
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Signup</h1>
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="enrollmentNo"
            className="block text-sm font-medium text-gray-700"
          >
            Enrollment Number
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="enrollmentNo"
            autoFocus
            placeholder="Enter your enrollment number..."
            value={signupInfo.enrollmentNo}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Signup
        </button>
        <span className="block text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
