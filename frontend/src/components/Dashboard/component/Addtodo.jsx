import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../../features/todoThunks.js'


function Addtodo() {
    const [input,setInput]=useState('')
    const dispatch = useDispatch()

    const HandleNewTodo=(e)=>{
        e.preventDefault()
        if(!input.trim) return
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <div className='flex justify-center mt-2 lg:mt-4' >
      <form onSubmit={HandleNewTodo} className='flex justify-center gap-4 p-2 w-11/12 lg:w-10/12'>
      <input  className='bg-white/80 rounded-xl lg:rounded-2xl shadow-lg lg:py-3 py-2 px-4 w-full outline-none'
        type="text" 
        name="newtodo" 
        value={input}
        placeholder='Enter a Todo . . .'
        onChange={(e)=>{
            setInput(e.target.value)
        }}
        />
        <button type='submit' className='bg-black text-white px-6 rounded-2xl text-sm hover:cursor-pointer' >Add</button>
      </form>
    </div>
  )
}

export default Addtodo
