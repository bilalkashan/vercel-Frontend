import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToDo = ({
  addToDo,
  setAddToDo,
  updatedData,
  setUpdatedData,
  refreshTasks,
}) => {
  const [Data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    tags: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Capital A
  };

  useEffect(() => {
    if (updatedData?.id) {
      setData({
        title: updatedData.title,
        description: updatedData.description,
        dueDate: updatedData.dueDate,
        tags: updatedData.tags,
      });
    } else {
      setData({ title: "", description: "", dueDate: "", tags: "" });
    }
  }, [updatedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      Data.title === "" ||
      Data.description === "" ||
      Data.dueDate === "" ||
      Data.tags === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/add-todo`, Data, {
        headers,
      });
      refreshTasks();
      setData({ title: "", description: "", dueDate: "", tags: "" });
      setAddToDo("hidden");
      toast.success("Task added successfully!");
    } catch (err) {
      console.error("Error submitting task:", err);
      toast.error("Failed to add task.");
    }
  };

  const updateTask = async () => {
    if (
      Data.title === "" ||
      Data.description === "" ||
      Data.dueDate === "" ||
      Data.tags === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (updatedData?.id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/auth/update-tasks/${updatedData.id}`,
          Data,
          { headers }
        );
      }

      refreshTasks();
      setUpdatedData({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        tags: "",
      });
      setData({ title: "", description: "", dueDate: "", tags: "" });
      setAddToDo("hidden");
      toast.success("Task updated successfully!");
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div
        className={`${addToDo} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${addToDo} fixed top-0 left-0 flex items-center justify-center h-screen w-full shadow-md`}
      >
        <div className="w-2/6 bg-[#f4f6f9] p-4 rounded">
          <h1 className="text-[#003366] text-3xl font-semibold text-center mb-5">
            {updatedData.id === "" ? "Add New To-Do" : "Update To-Do"}
          </h1>

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={Data.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-3"
          />

          <textarea
            cols="30"
            rows="3"
            name="description"
            placeholder="Description.."
            value={Data.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-3"
          ></textarea>

          <input
            type="date"
            name="dueDate"
            value={Data.dueDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-3"
          />

          <input
            type="text"
            placeholder="Tags"
            name="tags"
            value={Data.tags}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full mb-4"
          />

          <div className="flex gap-3">
            <button
              className="flex-1 px-5 py-2 bg-[#003366] rounded text-[#f4f6f9] text-xl shadow-md cursor-pointer"
              onClick={updatedData.id === "" ? handleSubmit : updateTask}
            >
              {updatedData.id === "" ? "Add" : "Update"}
            </button>

            <button
              className="flex-1 px-5 py-2 bg-gray-500 rounded text-white text-xl shadow-md cursor-pointer"
              onClick={() => {
                setAddToDo("hidden");
                setData({ title: "", description: "", dueDate: "", tags: "" });
                setUpdatedData({
                  id: "",
                  title: "",
                  description: "",
                  dueDate: "",
                  tags: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToDo;
