import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper functions for success and error
const handleSuccess = (msg) => toast.success(msg);
const handleError = (msg) => toast.error(msg);

export default function Signup() {
    const [Signupinfo, setSignupinfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupinfo({ ...Signupinfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = Signupinfo;

        if (!name || !email || !password) {
            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:5555/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Signupinfo),
            });

            const result = await response.json();
            console.log("Server Response:", result);

            if (!response.ok) {
                throw new Error(result.message || "Signup failed");
            }

            handleSuccess(result.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            console.error("Signup Error:", error.message);
            handleError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form className="bg-white p-8 rounded-2xl shadow-lg w-96 border-2 border-blue-400" onSubmit={handleSignup}>
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                {/* Name Input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    value={Signupinfo.name}
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Email Input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    value={Signupinfo.email}
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Password Input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={Signupinfo.password}
                    className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Sign Up Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition">
                    SIGN UP
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Have an account? <Link to="/login" className="text-blue-500 font-semibold">Log In</Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
}
