import { CiUser,CiMail,CiLock } from "react-icons/ci";
import { LiaUserLockSolid } from "react-icons/lia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion , AnimatePresence } from "motion/react"
import { toastAlert } from "../toastAlert/toastAlert.js"
import register from "../../asset/register.png"
import axios from "axios";


function Register() {

  const [username, setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [loginClicked, setLoginClicked] = useState(false)

  const navigateTo = useNavigate()

  const handleRegister = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post("http://localhost:4000/users/register",{
        username,
        email,
        password
      },{
        withCredentials : true,
        headers : {
          "Content-Type" : "application/json"
        }
      })
      console.log(data)
      toastAlert(data.data || "User Registered Successfully" , 'success')
      toastAlert("Login to continue" , "success")
      localStorage.setItem("jwt", data.token)
      navigateTo("/Register")
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      const messages = error.response.data.message
      if(Array.isArray(messages)){
        messages.forEach((msg) => {
          toastAlert(msg, "error")
        })
      }
      else{
        toastAlert(messages || "Something went wrong", "error")
      }
    }
  }

  const handleLogin = async(e) =>{
    e.preventDefault()
    console.log("Trying to login with:", email, password)

    try {
      const {data} = await axios.post("http://localhost:4000/users/login",{
        email,
        password
      },{
        withCredentials:true,
        headers : {
          "Content-Type" : "application/json"
        }
      })
      console.log(data)
      navigateTo("/Dashboard")
      toastAlert("Logged in Successfully!", "success")
      setEmail("")
      setPassword("")
    } catch (error) {
      const err = error.response.data.message
      if(Array.isArray(err)){
        err.forEach((msg) => {
          toastAlert(msg, "error")
        })
      }
      else{
        toastAlert(err || "Something went wrong", "error")
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen  '>
      <div className="bg-white flex flex-col md:flex-row lg:flex-row justify-center items-center h-4/5 w-4/5 md:h-3/5 md:w-[88%] lg:h-4/5 lg:w-3/5 shadow-2xl">

        <div className="flex-col lg:h-full md:w-1/2 lg:w-1/2 gap-10 md:p-6 lg:p-8">
          <div className="hidden md:flex lg:flex flex-col text-center lg:mt-15">
            <h1 className="lg:text-3xl font-bold">Hey! Welcome</h1>
            <p className="lg:text-lg font-medium pt-3">Power up your productivity with <span className="font-extrabold text-[#9fbdff]">MYTODO</span></p>
            <p className="font-light">Sign-up now to get started</p>
          </div>
          <img className="h-30 md:h-50 lg:h-50 w-auto" src={register} alt="hands" />

        </div>

      <AnimatePresence mode="wait">
        {
        !loginClicked ? (

      <motion.div 
        key="register"
        initial={{ opacity: 0, x: 200 }} 
        animate={{ x: 0 , opacity: 1 }} 
        exit={{ x: 200 , opacity: 0 }}
        transition={{ duration: 0.8 }} 
        
        className='flex flex-col items-center h-full w-full backdrop-blur-xl md:w-1/2 lg:w-1/2 rounded-t-3xl md:rounded-none md:rounded-l-3xl lg:rounded-l-3xl bg-[#bbd0ff]/60 lg:p-2' >
        <div className="flex flex-col items-center justify-center h-full w-full lg:p-2">
          <h1 className="flex gap-2 text-3xl font-bold mb-10">
            <span className="text-4xl"><LiaUserLockSolid /></span> 
            Register
          </h1>
          <form className="flex flex-col w-full gap-6" action="">
              <div className="flex gap-3 w-full items-center justify-center">
                <span className="text-2xl mb-1">
                  <CiUser />
                </span>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} className="bg-transparent border-b w-3/5 pb-1 mb-2 py-2 px-1 outline-none text-sm" type="text" placeholder="Enter Username" />
              </div>
              <div className="flex gap-3 w-full items-center justify-center">
                <span className="text-2xl mb-2"><CiMail /></span>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-transparent border-b w-3/5 pb-1 mb-2 outline-none text-sm" type="text" placeholder="Enter E-mail" />
              </div>
              <div className="flex gap-3 w-full items-center justify-center">
                <span className="text-2xl mb-2">
                  <CiLock />
                </span>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-transparent border-b w-3/5 pb-1 mb-2 outline-none text-sm" type="text" placeholder="Enter Password" />
              </div>
          </form>
          <button onClick={handleRegister} className="rounded-lg bg-[#b8c0ff] text-sm hover:cursor-pointer w-1/2 h-10 mt-10 flex justify-center items-center">Register</button>
          <p className="font-light text-sm mt-4">Already have an account? <span onClick={()=> setLoginClicked(true)} className="font-bold text-[#8593fc] hover:cursor-pointer">Login</span></p>
        </div>
      </motion.div>) : (
      <motion.div 
        key="login" 
        initial={{ opacity: 0, x: 200 }} 
        animate={{ x: 0, opacity: 1 }} 
        exit={{ x: 200 , opacity: 0 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col items-center h-full w-full backdrop-blur-xl md:w-1/2 lg:w-1/2 rounded-t-3xl md:rounded-none md:rounded-l-3xl lg:rounded-l-3xl  bg-[#bbd0ff]/60 p-2' >
        <div className="flex flex-col items-center justify-center h-full w-full lg:p-2">
          <h1 className="flex gap-2 text-3xl font-bold mb-10">
            <span className="text-4xl"><LiaUserLockSolid /></span> 
            Login
          </h1>
          <form className="flex flex-col w-full gap-6" action="">
              
              <div className="flex gap-3 w-full items-center justify-center">
                <span className="text-2xl mb-2">
                  <CiMail />
                </span>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-transparent border-b w-3/5 pb-1 mb-2 outline-none text-sm" type="text" placeholder="Enter E-mail" />
              </div>
              <div className="flex gap-3 w-full items-center justify-center">
                <span className="text-2xl mb-2">
                  <CiLock />
                </span>
                <input value={password } onChange={(e)=>setPassword(e.target.value)} className="bg-transparent border-b w-3/5 pb-1 mb-2 outline-none text-sm" type="text" placeholder="Enter Password" />
              </div>

          </form>
          <button onClick={handleLogin} className="rounded-lg bg-[#b8c0ff] text-sm hover:cursor-pointer w-1/2 h-10 mt-10 flex justify-center items-center">Login</button>
          <p className="font-light text-sm mt-4">Don't have an account? <span onClick={()=> setLoginClicked(false)} className="font-bold text-[#8593fc] hover:cursor-pointer">Sign up</span></p>
        </div>
      </motion.div>
      )
      }
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Register
