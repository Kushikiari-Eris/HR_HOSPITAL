import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom';

const UserPanel = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-col w-full">
        <Navbar/>
        <div className='p-4 bg-gray-50 h-auto'>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default UserPanel