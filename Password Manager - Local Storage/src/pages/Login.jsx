import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        enrollmentNo: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { enrollmentNo, password } = loginInfo;
        if (!enrollmentNo || !password) {
            return handleError('Enrollment number and Password are required')
        }
        try {
            const url = `https://makers-25.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, enrollmentNo, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('UserName', name);
                localStorage.setItem('UserEnrollmentNumber', enrollmentNo);
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="enrollmentNo" className="block text-sm font-medium text-gray-700">
          Enrollment Number
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="enrollmentNo"
          placeholder="Enter your Enrollment number..."
          value={loginInfo.enrollmentNo}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter your Password..."
          value={loginInfo.password}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
      >
        Login
      </button>
      <span className="block text-sm text-center text-gray-600 mt-4">
        Doesn't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition">
          Signup
        </Link>
      </span>
    </form>
    <ToastContainer />
  </div>
</div>

    )
}

export default Login
