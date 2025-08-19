import React, { useEffect, useState} from 'react'
import streak from '../../../../asset/fire.png'
import streakBnW from '../../../../asset/fire-bw.png'

function DateStripe() {

    const[currentTime,setCurrentTime] = useState('')
    const [currentDate,setCurrentDate] =useState('')
    const [datestripe,setDatestripe] = useState([])

    useEffect(() => {
        const today = new Date()
        const month = today.getMonth()
        const year = today.getFullYear()

        const daysInMonth = new Date(year,month+1,0).getDate()
        const currentDate = today.getDate()

        const monthDates = Array.from({length:daysInMonth},(_,i)=>({
            day: new Date(year,month,i+1).toLocaleDateString('en-IN',{
                weekday:'short'
            }),
            date:i+1,
            isToday:i+1 === currentDate,
        }))
        setDatestripe(monthDates)
    },[])

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

  return (
    <div>
        <div className='flex p-1 border-b-1 overflow-x-scroll'>
                {datestripe.map((e,i)=>(
                    <div key={i} className='flex flex-col items-center h-21 lg:h-24'>
                        <span className='text-rose-400 lg:px-7 py-1 px-4 border-b-1 border-black text-sm lg:text-base lg:font-medium'>{e.day}</span>
                        <div className='px-2 py-2 lg:px-4 lg:py-2 font-light text-sm lg:text-base'>
                            {
                                e.isToday?
                                <span className='border-1 bg-[#919ad6]/80 text-white font-semibold px-2.5 py-1 lg:px-2.5 lg:py-1 rounded-full '>{e.date}</span>:
                                <span>{e.date}</span>
                            }
                        </div>
                        <div>
                            <img className='h-5 w-5' src={streakBnW} alt="fire" />
                        </div>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default DateStripe
