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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/all-tasks`,
        {
          headers,
        }
      );
      setData(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-2xl px-4 py-2 font-semibold text-[#003366]">All Tasks</h1>
        <button onClick={() => setAddToDo("fixed")} title="Add Task">
          <IoAddCircleSharp className="text-4xl text-[#003366] hover:text-[#001a33] cursor-pointer" />
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