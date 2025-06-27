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
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full bg-[#f4f6f9]">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-2/6 bg-white shadow-lg p-4 rounded">
        <h1 className="text-[#003366] text-3xl font-bold mb-4 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={Data.username}
          className="px-3 py-3 rounded w-full bg-[#f4f6f9] mb-4 shadow-md"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={Data.password}
          className="px-3 py-3 rounded w-full bg-[#f4f6f9] mb-4 shadow-md"
        />

        <div className="w-full flex flex-col gap-2 items-center">
          <button
            className="px-4 py-2 bg-[#003366] font-semibold rounded text-[#f4f6f9] text-xl shadow-lg cursor-pointer w-[10vw]"
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link to="/signup" className="text-[#003366] font-semibold  text-md hover:text-black">
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
