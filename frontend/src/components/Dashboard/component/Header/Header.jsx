import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { toastAlert } from '../../../toastAlert/toastAlert'

function Header() {

    const[currentTime,setCurrentTime] = useState('')
    const [currentDate,setCurrentDate] =useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const TimenDate=()=>{
            const updateDate = new Date().toLocaleString('en-IN',{
                timeZone:'Asia/Kolkata',
                day:'2-digit',
                month:'short',
                year:'numeric',
                
            })


            const updateTime = new Date().toLocaleString('en-IN',{
                timeZone:'Asia/Kolkata',
                hour:'2-digit',
                minute:'2-digit',
                hour12:true,
            })
            setCurrentTime(updateTime)
            setCurrentDate(updateDate)
        }
        TimenDate()
        const intervalId = setInterval(TimenDate,1000)

        return ()=> clearInterval(intervalId)

    },[])

    const handleLogout = async() =>{
        try {
            const response = await axios.get('http://localhost:4000/users/logout',
                {
                    withCredentials:true
                })
            console.log(response.data.data)
            toastAlert(response.data.data, "success")
            navigate('/')
        } catch (error) {
            console.error(error,"error in logging out!")
        }
    }

  return (
    <>
        <div>
            <div className='flex justify-between items-center ml-2 pt-2'>
      
                <div className='ml-2 flex items-center'>
                    <h1 className='font-extrabold text-base'>MYTODO.</h1>
                </div>

                <nav className='hidden lg:flex bg-black/80 text-white px-4 py-2 w-2/5 h-10 rounded-full'>
                    <ul className='flex gap-12 justify-center w-full'>
                        <NavLink to='/Dashboard' className={({isActive})=>`${isActive?'font-bold text-[#CBD6FA]':'text-white font-thin'}`} ><li>Home</li></NavLink>
                        <NavLink to='/Projects' className={({isActive})=>`${isActive?'font-bold text-[#CBD6FA]':'text-white font-thin'}`}><li>Collaborative Projects</li></NavLink>
                        <NavLink onClick={handleLogout} className='text-white font-thin'><li>Logout</li></NavLink>
                    </ul>
                </nav>

                <div className='flex items-baseline bg-[#919ad6]/80 p-2 lg:px-4 lg:py-2 rounded-l-lg'>
                    <div className='text-white mx-4 text-lg lg:text-xl font-thin '>
                        {currentDate}
                    </div>
                    <div className=' text-black font-bold text-xl lg:text-3xl'>
                        {currentTime}
                    </div>
                </div>

            </div>
        </div>
    </>
    
  )
}

export default Header
