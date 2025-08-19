import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { deleteTodo, editTodo, fetchTodos } from '../../../features/todoThunks.js'
import { MdDelete } from "react-icons/md";


function Todos() {

  const todos = useSelector((state) => state.todo.todos)
  const dispatch = useDispatch()
  const [editId,setEditId] = useState(null)
  const [editContent,setEditContent] = useState('')

  useEffect(() => {
    dispatch(fetchTodos())
  },[dispatch])

  const handleUpdate = () => {
    dispatch(editTodo({id:editId, content:editContent}))
    setEditId(null)
    setEditContent('')
  }

  const handleEdit = (todo) => {
    setEditId(todo._id)
    setEditContent(todo.content)

  }

  return (
    <div className='flex flex-col items-center h-4/5 w-full'>
      <h1 className='text-xl lg:text-3xl mt-4 text-black font-bold'>Your Todos</h1>
      <ul className='lg:my-3 rounded-lg bg-[#bbd0ff]/60 w-10/12 h-4/5 lg:h-[68vh] overflow-y-scroll p-2'>
        {
        todos.length === 0? (
          <h1 className='text-sm lg:text-base text-rose-400 font-medium bg-white/60 backdrop:blur-2xl rounded-2xl p-3 text-center mt-4 mx-4'>No todos yet</h1>
        ) : (
          todos.map((todo) => (
            <li className='flex justify-between my-3 mx-2 gap-2 rounded-2xl bg-white/60 backdrop:blur-2xl p-2' key={todo._id} >
              <div className='flex items-center w-full'>
                  <input type="checkbox" id={todo._id} className = "peer relative h-5 w-5 shrink-0 appearance-none rounded-full p-2 mx-3 bg-white after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-[#919ad6] focus:outline-none"/>
                    {editId === todo._id ? (
                    <input className='bg-white/90 text-black rounded-2xl py-1.5 px-2 w-full outline-none' type="text" value={editContent} onChange={(e)=>setEditContent(e.target.value)} />
                ):
                (<label htmlFor={todo._id} className='peer-checked:text-gray-700 peer-checked:line-through' >{todo.todo}</label>)
                }
                </div>
                <div className='flex gap-2 items-center'> 
                  <div>
                    {
                      editId === todo._id?
                      (
                        <button className='bg-black text-white rounded-2xl py-1.5 px-4 text-sm hover:cursor-pointer' onClick={handleUpdate}>Save</button>
                      ):(
                        <button className='bg-black text-white rounded-2xl text-sm py-1.5 px-4 hover:cursor-pointer' onClick={()=>handleEdit(todo)}>Edit</button>
                      )
                    }
                  </div>
                  <button className=' text-rose-400 h-8 w-8 rounded-full text-2xl font-black mx-2 hover:cursor-pointer' onClick={()=>dispatch(deleteTodo(todo._id))}><MdDelete /></button>
                </div>
            </li>
          )   
        ))}
      </ul>
    </div>
  )
} 

export default Todos
