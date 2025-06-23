import axios from "axios";
import React, { useEffect, useState } from "react";

const addToDo = ({ addToDo, setAddToDo, updatedData, setUpdatedData }) => {
  const [Data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    tags: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
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
      alert("All fields are required");
      return;
    }

    try {
      if (updatedData?.id) {
        await axios.put(
          `http://localhost:8080/update-tasks/${updatedData.id}`,
          Data,
          { headers }
        );
      } else {
        await axios.post("http://localhost:8080/add-todo", Data, { headers });
      }

      setData({ title: "", description: "", dueDate: "", tags: "" });
      setAddToDo("hidden");
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  const updateTask = async () => {
    if (
      Data.title === "" ||
      Data.description === "" ||
      Data.dueDate === "" ||
      Data.tags === ""
    ) {
      alert("All fields are required");
      return;
    }

    try {
      if (updatedData?.id) {
        await axios.put(
          `http://localhost:8080/update-tasks/${updatedData.id}`,
          Data,
          { headers }
        );
      } else {
        await axios.put(`http://localhost:8080/update-tasks/${updatedData.id}`, Data, {
          headers,
        });
        setUpdatedData({
          id: "",
          title: "",
          description: "",
          dueDate: "",
          tags: "",
        });
        setData({ title: "", description: "", dueDate: "", tags: "" });
        setAddToDo("hidden");
      }
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  return (
    <>
      <div
        className={`${addToDo} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${addToDo} fixed top-0 left-0 flex items-center justify-center h-screen w-full shadow-md`}
      >
        <div className="w-2/6 bg-[#f4f6f9] p-4 rounded">
          <h1 className="text-[#003366] text-3xl w-full items-center justify-center font-semibold mb-3">
            Add New To-Do
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
            className="border px-3 py-2 rounded w-full mb-2"
          ></textarea>

          <input
            type="date"
            placeholder="Due Date"
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
            className="border px-3 py-2 rounded w-full mb-3"
            onChange={handleChange}
          />

          {updatedData.id === "" ? (
            <button
              className="px-5 py-2 bg-[#003366] rounded text-[#f4f6f9] text-xl shadow-md cursor-pointer"
              onClick={handleSubmit}
            >
              Add
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-[#003366] rounded text-[#f4f6f9] text-xl shadow-md cursor-pointer"
              onClick={updateTask}
            >
              Update
            </button>
          )}

          <button
            className="cursor-pointer px-5 py-2 bg-[#003366] rounded text-[#f4f6f9] shadow-md text-xl right-0 mx-3"
            onClick={() => {
              setAddToDo("hidden");
              setData({
                title: "",
                description: "",
                dueDate: "",
                tags: "",
              });
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
    </>
  );
};

export default addToDo;
