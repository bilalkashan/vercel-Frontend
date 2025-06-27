import React, { useState } from "react";
import { FaRegHeart, FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = ({ home, setAddToDo, data, refreshTasks, setUpdatedData }) => {
  const [shareTaskId, setShareTaskId] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const [shareToDo, setShareToDo] = useState(false);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/auth/update-complete-tasks/${id}`,
        {},
        { headers }
      );
      toast.success("Task status updated");
      refreshTasks();
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  const handleShare = async () => {
    if (!shareEmail) {
      toast.error("Please enter an email");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8080/auth/share-task/${shareTaskId}`,
        { shareWithEmail: shareEmail },
        { headers }
      );
      toast.success("Task shared successfully!");
      setShareEmail("");
      setShareToDo(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to share task");
    }
  };

  const handleImportant = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/auth/update-imp-tasks/${id}`,
        {},
        { headers }
      );
      toast.success("Task marked as important");
      refreshTasks();
    } catch (error) {
      toast.error("Failed to mark task as important");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/auth/delete-task/${id}`, {
        headers,
      });
      toast.success("Task deleted successfully");
      refreshTasks();
    } catch (err) {
      toast.error("Failed to delete task");
      console.error(err);
    }
  };

  const handleUpdate = (id, title, description, dueDate, tags) => {
    setAddToDo("fixed");
    setUpdatedData({ id, title, description, dueDate, tags });
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data &&
          data.map((items) => (
            <div
              key={items._id}
              className="flex flex-col justify-between bg-[#f4f6f9] rounded p-4 hover:scale-[1.02] shadow-md transition-transform duration-300 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-xl">{items.title}</h3>
                <p className="my-2 text-gray-700 break-words">{items.description}</p>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <strong>Tags:</strong> {items.tags}
                  </p>
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(items.dueDate).toLocaleDateString()}
                  </p>

                  {home === "false" && items.userId && (
                    <p>
                      <strong>Shared By:</strong> {items.userId.name}
                    </p>
                  )}

                  {home === "true" && items.sharedWith?.length > 0 && (
                    <div className="mt-2">
                      <strong>Shared With:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-600 max-h-24 overflow-auto">
                        {items.sharedWith.map((user) => (
                          <li key={user._id}>{user.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  className={`${
                    items.complete === false ? "bg-red-400" : "bg-green-700"
                  } text-white p-2 rounded flex-1 font-semibold hover:shadow-md transition`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete ? "Completed" : "In Complete"}
                </button>

                <div className="flex items-center justify-around flex-1 gap-4 text-2xl text-gray-700">
                  <button onClick={() => handleImportant(items._id)}>
                    {items.important ? (
                      <FaHeart className="text-red-600" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>

                  {home !== "false" && (
                    <button
                      onClick={() =>
                        handleUpdate(
                          items._id,
                          items.title,
                          items.description,
                          items.dueDate,
                          items.tags
                        )
                      }
                    >
                      <FaEdit />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShareTaskId(items._id);
                      setShareToDo(true);
                    }}
                    className="hover:text-[#003366]"
                  >
                    <FaShareAlt />
                  </button>

                  <button
                    onClick={() => handleDelete(items._id)}
                    className="hover:text-[#003366]"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {home === "true" && (
          <button
            className="shadow-md flex flex-col bg-[#f4f6f9] justify-center items-center rounded p-4 hover:scale-[1.02] cursor-pointer transition-transform duration-300"
            onClick={() => setAddToDo("fixed")}
          >
            <IoAddCircleSharp className="text-5xl" />
            <h2 className="text-2xl">Add Task</h2>
          </button>
        )}
      </div>

      {shareToDo && (
        <>
          <div className="fixed inset-0 bg-gray-800 opacity-80 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md bg-[#f4f6f9] p-6 rounded shadow-lg">
              <h1 className="text-[#003366] text-3xl font-semibold text-center mb-5">
                Share Task
              </h1>

              <input
                type="email"
                placeholder="Enter user email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full mb-4"
              />

              <div className="flex gap-3">
                <button
                  className="flex-1 px-5 py-2 bg-[#003366] text-white text-xl rounded shadow-md hover:bg-[#002244] transition"
                  onClick={handleShare}
                >
                  Share
                </button>

                <button
                  className="flex-1 px-5 py-2 bg-gray-500 text-white text-xl rounded shadow-md hover:bg-gray-600 transition"
                  onClick={() => {
                    setShareToDo(false);
                    setShareEmail("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cards;
