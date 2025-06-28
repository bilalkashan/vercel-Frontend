import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompleteTasks = () => {
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
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Capital A
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/complete-task",
        {
          headers,
        }
      );
      console.log("Complete tasks fetched:", response.data);
      setData(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch complete tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full overflow-auto">
      <h1 className="text-2xl font-semibold text-[#003366] mb-4">Completed Tasks</h1>
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

export default CompleteTasks;
