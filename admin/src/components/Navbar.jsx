import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='fixed'>
        <NavLink to="/project">Project</NavLink>
        <NavLink to="/domain">Domain</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/client">Client</NavLink>
        <Logout/>
    </div>
  )
}

export default Navbar  