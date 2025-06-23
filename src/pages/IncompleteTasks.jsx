import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const IncompleteTasks = () => {
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
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/incomplete-task", {
        headers,
      });
      console.log("Incomplete tasks fetched:", response.data);
      setData(response.data.tasks); // ✅ correct key
    } catch (err) {
      console.error("Failed to fetch incomplete tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
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

export default IncompleteTasks;
