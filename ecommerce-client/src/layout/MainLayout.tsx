import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='flex gap-2 '>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout