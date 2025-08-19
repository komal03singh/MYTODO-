import React from 'react'
import { PiMoonFill } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { motion } from "motion/react"


function Home() {
  return (
    <div>
      <div className='h-screen w-full bg-[#F4EEEB]'>

      <header className='flex justify-between items-center h-20 p-2 px-4 lg:px-6' >
        <div className='font-extrabold text-sm lg:p-2'>MYTODO.</div>
        <div className='py-2 flex gap-3 lg:gap-6 lg:pr-4 text-sm'>
          <button className='text-sm px-2 py-2 lg:px-4 lg:py-2 bg-black text-white rounded-lg hover:cursor-pointer'>Explore as Guest</button>
          <button className='px-3 py-3 bg-black text-white rounded-full hover:cursor-pointer'><span className='text-sm lg:text-base'><PiMoonFill /></span></button>
        </div>
      </header>

      <section className='flex flex-col justify-center items-center h-[80%] gap-4'>
        <h1 className='text-4xl lg:text-5xl font-semibold text-center'><motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>Write,</motion.span>
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5, delay:0.5}}> Manage</motion.span>
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5, delay:1}}> and </motion.span>
          <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8, delay:1.5, ease:"easeInOut"}} className='inline-block decoration-wavy decoration-[#b8c0ff] underline'>Collaborate</motion.span>
        </h1>
        <motion.div initial={{opacity:0, y:100}} animate={{opacity:1,y:0}} transition={{duration:1, delay:2}} className='flex flex-col font-light text-center lg:max-w-1/2 mt-4 gap-1 px-8'>
          <p className='text-base'>Power up your productivity—organize your to-dos, collaborate with friends, assign tasks, and track everyone's progress in real-time.</p>
          <p className='text-base'>Whether it is personal goals or team projects, <span className="font-extrabold text-[#9ca7f8]">MYTODO</span> keeps you and your crew in sync!</p>
        </motion.div>
        <div className='flex gap-6 justify-center items-center mt-10'>
          <Link to='/Register'><motion.button animate={{scale:1}} whileHover={{scale:1.1}} className='px-4 py-2 bg-[#b8c0ff] rounded-lg hover:cursor-pointer'>Register</motion.button></Link>
          <p className='text-lg font-light'>Or</p>
          <Link to='/Register'><motion.button animate={{scale:1}} whileHover={{scale:1.1}} className='px-4 py-2 bg-[#b8c0ff] rounded-lg hover:cursor-pointer'>Login</motion.button></Link>
        </div>
      </section>

    </div>
    </div>
  )
}

export default Home
