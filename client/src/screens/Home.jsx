import React from 'react'
import Clients from '../components/clients'
import { NavLink } from 'react-router-dom'
import Vision from '../components/Vision'
import Agile from '../components/Agile'
const Home = () => {
  return (
    <div>Home
      <Clients/>
      <Vision/>
      <Agile/>
      <NavLink to="/project">View Our Projects</NavLink>
    </div>
  )
}

export default Home