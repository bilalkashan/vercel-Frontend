import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant, MdIncompleteCircle } from "react-icons/md";
import { FaCheckDouble, FaShareAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [user, setUser] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const navLinks = [
    { title: "All Tasks", icon: <CgNotes />, link: "/alltasks" },
    { title: "Important Tasks", icon: <MdLabelImportant />, link: "/importantTasks" },
    { title: "Completed Tasks", icon: <FaCheckDouble />, link: "/completeTasks" },
    { title: "Incompleted Tasks", icon: <MdIncompleteCircle />, link: "/incompleteTasks" },
    { title: "Shared Tasks", icon: <FaShareAlt />, link: "/sharedTasks" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, { headers });
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <div className="w-full md:w-64 bg-[#003366] rounded-xl p-6 min-h-screen flex flex-col justify-between shadow-md">
      {user && (
        <div className="text-white  mb-6">
          <h2 className=" text-2xl font-semibold">{user.name}</h2>
          <h4 className="text-sm">{user.email}</h4>
          <hr className="my-3 border-gray-200" />
        </div>
      )}

      <div className="flex-1">
        {navLinks.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex items-center gap-3 text-white hover:bg-white hover:text-[#003366] rounded px-3 py-2 mb-2 transition-all"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-base">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="bg-white text-[#003366] font-bold w-full py-2 rounded shadow hover:bg-[#002244] hover:text-white transition w-full cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
