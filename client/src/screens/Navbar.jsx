import React from 'react'
import {NavLink} from "react-router-dom"
import vs from "../assets/vs.png"
const Navbar = () => {
  return (
    <div>
        <ul><li>
        <img src={vs} alt="Vox System" width="200" height="100" />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/project">project</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
        </li></ul>
    </div>
  )
}

export default Navbar 