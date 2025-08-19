import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastAlert } from "../components/toastAlert/toastAlert.js"

export const addTodo = createAsyncThunk('todos/addTodos', async (todo,{ rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:4000/todo/addTodo',
            {
                todo,
                isCompleted:false
            },
            {
                withCredentials:true
            }
        )
        console.log(response.data)
        return response.data.data
    } catch (error) {
        toastAlert(error.response.data.message, "error")
        console.log("error in adding todo", error)

        return rejectWithValue(
        error.response?.data?.message || "Failed to add todo"
      )
    }
})

export const editTodo = createAsyncThunk('todos/editTodos', async({id,content}) => {
    try {
        const response = await axios.put(`http://localhost:4000/todo/updateTodo/${id}`,
            {
                todo : content
            },
            {
                withCredentials:true
            }
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("error in editing todo", error)
    }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodos', async(id) => {
   try {
    const response = await axios.delete(`http://localhost:4000/todo/deleteTodo/${id}`,
        {
            withCredentials:true
        }
    )
    console.log(response.data)
    return response.data
   } catch (error) {
    alert(error.response.data.message)
    console.log("error in deleting todo", error)
   }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async(_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:4000/todo/getTodos',
            {
                withCredentials:true
            }
        )
        console.log(response.data)
        return response.data.message
    } catch (error) {
        console.log("error in fetching todo", error)
        return rejectWithValue(
        error.response?.data?.message || "Failed to fetch todos"
        )
    }
})