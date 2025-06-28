import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden gap-3 bg-gray-100 m-1">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 overflow-y-auto p-4 md:p-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;