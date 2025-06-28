import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [Data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const isValidName = (name) => {
    return name.length > 3 && /^[^\d]/.test(name) && /^[A-Za-z\s]+$/.test(name);
  };

  const isValidUsername = (username) => {
    return !/\s/.test(username) && /^[^\d]/.test(username);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async () => {
    const { name, username, email, password } = Data;

    if (!name || !username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!isValidName(name)) {
      toast.warning("Name must be >3 letters, not start with number, and contain only letters");
      return;
    }

    if (!isValidUsername(username)) {
      toast.warning("Invalid username");
      return;
    }

    if (!isValidEmail(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, Data);
      toast.success(response.data.message || "Signup successful");
      setData({ name: "", username: "", email: "", password: "" });

      setTimeout(() => {
        history("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9] px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg p-6 md:p-8 rounded-lg">
        <ToastContainer position="top-center" autoClose={2000} />
        <h1 className="text-[#003366] text-2xl md:text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={Data.name}
            onChange={handleChange}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={Data.username}
            onChange={handleChange}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={Data.email}
            onChange={handleChange}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={Data.password}
            onChange={handleChange}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            className="px-6 py-2 bg-[#003366] text-white font-semibold text-lg rounded shadow-md hover:bg-[#002244] transition w-full"
            onClick={handleSubmit}
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-[#003366] font-semibold text-sm hover:text-black"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
