import { createSlice } from "@reduxjs/toolkit"
import {addTodo,editTodo,deleteTodo,fetchTodos} from "./todoThunks"


const todoSlice = createSlice({
    name:'todo',
    initialState:{
        todos:[]
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(addTodo.fulfilled,(state,action)=> {
            state.todos.push(action.payload)
        })
        .addCase(editTodo.fulfilled,(state,action) => {
            const updatedTodo = action.payload.message
            const index = state.todos.findIndex((todo)=> todo._id === updatedTodo._id)
            state.todos[index] = updatedTodo
            console.log(state.todos[index])
        })
        .addCase(deleteTodo.fulfilled,(state,action) => {
            const deletedTodo = action.payload.message
            state.todos = state.todos.filter((todo)=> todo._id !== deletedTodo._id)
        })
        .addCase(fetchTodos.pending,(state)=> {
            state.loading = true
            state.error = null
        })
        .addCase(fetchTodos.fulfilled,(state,action) => {
            state.loading = false
            state.todos = action.payload
        })
        .addCase(fetchTodos.rejected,(state,action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default todoSlice.reducer