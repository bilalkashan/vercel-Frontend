import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

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
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center  h-screen w-full  ">
      <div className="w-2/6 bg-[#003366] shadow-lg p-4 rounded">
        <h1 className="text-[#f4f6f9] text-3xl w-full justify-items-center font-semibold mb-3">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={Data.username}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={Data.password}
          className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md"
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="px-4 py-2 bg-[#f4f6f9] font-semibold rounded text-[#003366] text-xl shadow-md cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>

          <Link to="/signup" className="text-[#f4f6f9] text-xl">
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
