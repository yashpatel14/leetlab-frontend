import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full'>
        <Navbar/>
        <Outlet />
    </div>
  )
}

export default Layout