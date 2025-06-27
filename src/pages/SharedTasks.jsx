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
    <div className="px-4 py-2">
      <h1 className="w-full flex text-4xl font-semibold px-3 py-3 mb-3">
        Shared Task
      </h1>
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
