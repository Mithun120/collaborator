import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './screens/Home'
import About from './screens/About'
import Project from './screens/Project'
import Blog from './screens/Blog'
import Contact from './screens/Contact'
import Navbar from './screens/Navbar'
import Footer from './screens/Footer'
import Tech from './screens/Tech'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/project" element={<Project />}/>
        <Route path="/blog" element ={<Blog/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/ball" element={<Tech/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App