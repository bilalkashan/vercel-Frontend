import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import CompleteTasks from "./pages/CompleteTasks";
import ImportantTasks from "./pages/ImportantTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SharedTasks from "./pages/SharedTasks";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/login");
    }

    if (isLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#f4f6f9] h-screen p-4 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="incompleteTasks" element={<IncompleteTasks />} />
          <Route path="alltasks" element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completeTasks" element={<CompleteTasks />} />
          <Route path="/sharedTasks" element={<SharedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
};

export default App;