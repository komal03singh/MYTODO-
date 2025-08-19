import { Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Register from "./components/Register/Register.jsx"
import Projects from "./components/Dashboard/component/Projects/Projects.jsx"
import Project from "./components/Dashboard/component/Project/Project.jsx"



function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      <Route path="/Project/:id" element={<Project/>}/>
    </Routes>
  )
}

export default App

 