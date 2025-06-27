import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import AddToDo from "../components/Home/addToDo";
import axios from "axios";

const AllTasks = () => {
  const [addToDo, setAddToDo] = useState("hidden");
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    tags: "",
  });
  const [Data, setData] = useState();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/all-tasks", {
        headers,
      });
      setData(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#003366]">All Tasks</h1>
        <button onClick={() => setAddToDo("fixed")} title="Add Task">
          <IoAddCircleSharp className="text-4xl text-[#003366] hover:text-[#001a33]" />
        </button>
      </div>

      {Data && (
        <Cards
          home="true"
          setAddToDo={setAddToDo}
          data={Data}
          refreshTasks={fetchTasks}
          setUpdatedData={setUpdatedData}
        />
      )}

      <AddToDo
        addToDo={addToDo}
        setAddToDo={setAddToDo}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        refreshTasks={fetchTasks}
      />
    </div>
  );
};

export default AllTasks;
