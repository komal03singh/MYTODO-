import {useState,useEffect} from 'react'


function Quote() {

    const [quote, setQuote] = useState('')
    const [authour, setAuthour] = useState('')

    const url='https://api.allorigins.win/raw?url=https://zenquotes.io/api/today'
    
    useEffect(()=>{
        async function todayQuote(){
        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setQuote(data[0].q)
            setAuthour(data[0].a)
        } catch (error) {
            console.log("error in fatching quote")
            
        }
    }
    todayQuote()
    },[])

  return (
    <div className='px-4 py-2 lg:px-6 flex flex-col justify-center items-center text-xs'>
      <p className='font-light lg:text-sm'><span className='font-bold'>"</span>{quote}<span className='font-bold'>"</span></p>
      <p className='font-semibold text-black text-right w-full lg:text-sm'>- {authour}</p>
    </div>
  )
}

export default Quote
