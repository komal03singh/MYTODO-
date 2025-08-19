import Addtodo from './component/Addtodo.jsx'
import Todos from './component/Todos.jsx'
import Header from './component/Header/Header.jsx'
import DateStripe from './component/DateStripe/DateStripe.jsx'
import Quote from './component/Quote/Quote.jsx'
import Reminders from './component/Reminders/Reminders.jsx'


function Dashboard() {
  return (
    <div  className='relative h-screen w-full'>
      <div className='flex flex-col gap-1 fixed top-0 h-auto w-full bg-white/20 backdrop-blur-2xl z-10'>
        <Header/>
        <DateStripe/>
      </div>
      {/*for tasks*/}
        <div className='bg-[#e0e4ff] flex flex-col justify-center absolute top-65 lg:top-50 lg:left-6 h-3/5 w-11/12 mx-4 lg:h-[590px] lg:w-[750px] rounded-2xl'>
          <Addtodo/>
          <Todos/>
        </div>

      {/*for quote*/}
        <div className=' bg-[#919ad6]/80 text-white flex flex-col justify-center absolute top-40 lg:top-50 lg:left-[61%] h-22 w-11/12 mx-4 lg:mx-0 lg:h-35 lg:w-[36%] rounded-2xl lg:shadow-2xl'>
          <Quote/>
        </div>

      {/*for reminders*/}
        <div className='hidden lg:flex bg-[#e0e4ff] absolute top-160 lg:top-92 lg:left-[61%] lg:h-[420px] lg:w-[36%] rounded-2xl'>
          <Reminders/>
        </div>
    </div>
  )
}

export default Dashboard
