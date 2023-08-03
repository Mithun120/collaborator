import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import Project from './screens/Project'
import Domain from './screens/Domain'
import Blog from './screens/Blog'
import Client from './screens/Client'
import Contact from './screens/Contact'
// import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const isAuthenticated=localStorage.getItem("accessToken")?true:false;
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={isAuthenticated?<Home/>:<Login/>}/>
      <Route path="/project" element={<Project/>}/>
      <Route path="/domain" element={<Domain/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/client" element={<Client/>}/>
      {/* <PrivateRoute path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />}/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App