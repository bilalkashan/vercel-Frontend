import React from "react";
import { FaRegHeart, FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setAddToDo, data, refreshTasks, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`http://localhost:8080/update-complete-tasks/${id}`, {}, { headers });
      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      await axios.put(`http://localhost:8080/update-imp-tasks/${id}`, {}, { headers });
      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, description, dueDate, tags) => {
    setAddToDo("fixed");
    setUpdatedData({ id, title, description, dueDate, tags });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-task/${id}`, { headers });
      refreshTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items) => (
          <div
            key={items._id}
            className="flex flex-col justify-between bg-[#f4f6f9] rounded p-4 hover:scale-102 shadow-md hover:cursor-pointer transition-all duration-300"
          >
            <div>
              <h3 className="font-semibold text-xl">{items.title}</h3>
              <p className="my-2 text-gray-700">{items.description}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Tags:</strong> {items.tags}</p>
                <p><strong>Due Date:</strong> {new Date(items.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4 w-full flex gap-4">
              <button
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-700"
                } text-[#f4f6f9] p-2 rounded w-3/6 font-semibold hover:shadow-md`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete ? "Completed" : "In Complete"}
              </button>

              <div className="p-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
                </button>

                {home !== "false" && 
                  <button onClick={() => handleUpdate(items._id, items.title, items.description, items.dueDate, items.tags)}>
                  <FaEdit />
                </button>
                }

                <button onClick={() => handleDelete(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="shadow-md flex flex-col bg-[#f4f6f9] justify-center items-center rounded p-4 hover:scale-102 hover:cursor-pointer"
          onClick={() => setAddToDo("fixed")}
        >
          <IoAddCircleSharp className="text-5xl " />
          <h2 className="text-2xl">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
