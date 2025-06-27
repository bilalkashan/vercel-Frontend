import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/alltasks",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      link: "/completeTasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <MdIncompleteCircle />,
      link: "/incompleteTasks",
    },

    {
      title: "Shared Tasks",
      icon: <FaShareAlt />,
      link: "/sharedTasks",
    },
  ];

  const [Data, setData] = useState();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/profile", {
          headers,
        });
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

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Capital A
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/all-tasks",
          { headers }
        );
        setData(response.data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {Data && (
        <div className="cursor-pointer">
          <h2 className="text-xl text-[#f4f6f9] font-semibold mb-1">
            {user.name}
          </h2>
          <h4 className="mb-2 text-[#f4f6f9]">{user.email}</h4>
          <hr className="text-[#f4f6f9]" />
        </div>
      )}

      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex gap-3 text-[#f4f6f9] items-center hover:bg-[#f4f6f9] hover:text-gray-700 rounded transition-all duration-300 p-2"
          >
            {items.icon}
            {items.title}
          </Link>
        ))}
      </div>

      <div className="">
        <button
          className="bg-[#f4f6f9] text-[#003366] font-semibold w-full p-2 rounded shadow-lg cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
