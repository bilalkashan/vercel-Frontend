import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex h-[96vh] gap-4' >
        <div className='w-1/6 rounded-xl p-4 flex flex-col justify-between bg-[#003366] shadow-md'>
            <Sidebar />
        </div>
        <div className='w-5/6 bg-white rounded-xl p-4 shadow-md'>
            <Outlet />
        </div>
    </div>
  )
}

export default Home;