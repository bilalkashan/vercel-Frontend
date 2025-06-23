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
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-tasks", {
        headers,
      });
      setData(response.data.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setAddToDo("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-800 hover:text-[#003366] transition-all duration-300 cursor-pointer" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setAddToDo={setAddToDo}
            data={Data.tasks}
            refreshTasks={fetchTasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <AddToDo
        addToDo={addToDo}
        setAddToDo={setAddToDo}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTasks;
