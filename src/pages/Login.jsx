import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history("/");
    }
  }, [isLoggedIn, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    const { username, password } = Data;

    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        Data
      );
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      setData({ username: "", password: "" });

      toast.success("Login successful..", {
        autoClose: 1500,
        onClose: () => history("/"),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9] px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg p-6 md:p-8 rounded-lg">
        <h1 className="text-[#003366] text-2xl md:text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={Data.username}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={Data.password}
            className="px-4 py-2 rounded w-full bg-[#f4f6f9] shadow-md focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            className="px-6 py-2 bg-[#003366] text-white font-semibold text-lg rounded shadow-md hover:bg-[#002244] transition w-full"
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-[#003366] font-semibold text-sm hover:text-black"
          >
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

