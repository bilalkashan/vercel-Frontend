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
      toast.warning(
        "Name must be >3 letters, not start with number, and contain only letters"
      );
      return;
    }

    if (!isValidUsername(username)) {
      toast.warning("invalid username");
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
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        Data
      );
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
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full bg-[#f4f6f9]">
      <div className="w-2/6 bg-white shadow-lg p-4 rounded">
        <ToastContainer position="top-center" autoClose={2000} />
        <h1 className="text-[#003366] text-3xl font-bold mb-4 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={Data.name}
          onChange={handleChange}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={Data.username}
          onChange={handleChange}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={Data.email}
          onChange={handleChange}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={Data.password}
          onChange={handleChange}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-4 shadow-md"
        />

        <div className="w-full flex flex-col gap-2 items-center">
          <button
            className="px-4 py-2 bg-[#003366] font-semibold rounded text-[#f4f6f9] text-xl shadow-lg cursor-pointer w-[10vw]"
            onClick={handleSubmit}
          >
            Signup
          </button>
          <Link to="/login" className="text-[#003366] font-semibold text-md hover:text-black">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
