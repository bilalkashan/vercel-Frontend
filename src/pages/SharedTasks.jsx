// pages/SharedTasks.jsx
import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const SharedTasks = () => {
  const [sharedTasks, setSharedTasks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchSharedTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/shared-tasks",
        {
          headers,
        }
      );
      setSharedTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch shared tasks:", err);
    }
  };

  useEffect(() => {
    fetchSharedTasks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full overflow-auto">
      <h1 className="text-2xl font-semibold text-[#003366] mb-4">Shared Tasks</h1>
      <Cards
        home={"false"}
        setAddToDo={() => {}} 
        data={sharedTasks}
        refreshTasks={fetchSharedTasks}
        setUpdatedData={() => {}} 
      />
    </div>
  );
};

export default SharedTasks;
