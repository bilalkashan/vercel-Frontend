import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleSubmit = async () => {
    try {
      if (
        Data.name === "" ||
        Data.username === "" ||
        Data.email === "" ||
        Data.password === ""
      ) {
        alert("All fields are required");
      } else if (Data.password.length < 8) {
        alert("Password must be at least 8 characters");
      } else {
        const response = await axios.post("http://localhost:8080/auth/signup", Data);
        alert(response.data.message);
        setData({ name: "", username: "", email: "", password: "" });
        history("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
      <div className="w-2/6 bg-[#003366] shadow-lg p-4 rounded">
        <h1 className="text-[#f4f6f9] text-3xl font-semibold mb-3">Signup</h1>

        <input type="text" name="name" placeholder="Full Name" value={Data.name} onChange={handleChange} className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md" />
        <input type="text" name="username" placeholder="Username" value={Data.username} onChange={handleChange} className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md" />
        <input type="email" name="email" placeholder="Email" value={Data.email} onChange={handleChange} className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md" />
        <input type="password" name="password" placeholder="Password" value={Data.password} onChange={handleChange} className="px-3 py-2 rounded w-full bg-[#f4f6f9] mb-3 shadow-md" />

        <div className="w-full flex items-center justify-between">
          <button className="px-4 py-2 bg-[#f4f6f9] font-semibold rounded text-[#003366] text-xl shadow-md cursor-pointer" onClick={handleSubmit}>Signup</button>
          <Link to="/login" className="text-[#f4f6f9] text-xl">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
