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
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Capital A
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/incomplete-task",
        {
          headers,
        }
      );
      console.log("Incomplete tasks fetched:", response.data);
      setData(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch incomplete tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="w-full flex text-4xl font-semibold px-3 py-3 mb-3">
        In Complete Task List
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

export default IncompleteTasks;
