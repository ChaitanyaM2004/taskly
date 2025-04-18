import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper functions for success and error notifications
const handleSuccess = (msg) => toast.success(msg);
const handleError = (msg) => toast.error(msg);

export default function Login() {
    const [logininfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...logininfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logininfo;

        if (!email || !password) {
            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:5555/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logininfo),
            });

            const result = await response.json();
            console.log(result);

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Store JWT Token in localStorage
            localStorage.setItem("token", result.jwtToken);
            localStorage.setItem("email", email);
            console.log("Token Stored in localStorage:", localStorage.getItem("token"));
 // Debugging

            handleSuccess("Login successful!");

            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            console.error("Login Error:", error.message);
            handleError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form className="bg-white p-8 rounded-2xl shadow-lg w-96 border-2 border-blue-400" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Email Input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    value={logininfo.email}
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Password Input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={logininfo.password}
                    className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Login Button */}
                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition">
                    LOGIN
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold">Sign Up</Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
}
