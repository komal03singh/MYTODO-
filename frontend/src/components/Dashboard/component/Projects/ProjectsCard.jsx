import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectsCard(props) {

  const navigate = useNavigate()

  return (
    <div>
      <div onClick ={()=>navigate(`/Project/${props.id}`)} className='p-4 px-6 w-full h-3/5 rounded-2xl bg-[#A5AADA] cursor-pointer'>
        <h1 className='text-xl text-black font-medium mb-4'>{props.title}</h1>
        <div className='flex flex-col gap-2'>
          <p>{props.description}</p>
          <p>Started At : {props.startedAt}</p>
          <p>Due By : {props.endAt}</p>
        </div>
        <button onClick ={()=>navigate(`/Project/${props.id}`)} className='bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-4'>Open Project</button>
      </div>
    </div>
  )
}

export default ProjectsCard
