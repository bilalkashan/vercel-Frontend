import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState([]);
  const [addToDo, setAddToDo] = useState("hidden");
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    tags: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/important-task`,
        {
          headers,
        }
      );
      setData(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch important tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full overflow-auto">
      <h1 className="text-2xl px-4 py-2 font-semibold text-[#003366] mb-4">
        Important Task List
      </h1>
      <Cards
        home={"false"}
        data={Data}
        refreshTasks={fetchTasks}
        setAddToDo={setAddToDo}
        setUpdatedData={setUpdatedData}
      />
    </div>
  );
};

export default ImportantTasks;
