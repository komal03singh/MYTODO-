import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Todo} from "../models/todo.model.js"

export const addTodo = asyncHandler(async(req,res) =>{

    const {todo , isCompleted} = req.body

    if(!todo){
        throw new ApiError(400,"Todo cannot be empty")
    }

    const newTodo = await Todo.create({
        todo,
        isCompleted : false,
        createdBy : req.user._id
    })

    if(!newTodo){
        throw new ApiError(400,"Unable to creating todo")
    }

    return res
    .status(200)
    .json(new ApiResponse(201,newTodo,"Todo created successfully"))


})

export const getTodos = asyncHandler(async(req,res)=>{

    const userId = req.user._id
    
    const getTodo = await Todo.find({createdBy:userId})
     
    if(!getTodo){
        throw new ApiError(404,"There are no Todos")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Todos fetched successfully",getTodo))

})


export const updateTodo = asyncHandler(async(req,res)=>{

    const todoId = req.params.id

    if(!todoId){
        throw new ApiError(400,"Todo don't exist")
    }

    const updateTodo = await Todo.findByIdAndUpdate(todoId,req.body,{
        new:true
    })

    if(!updateTodo){
        throw new ApiError(400,"Unable to update Todo")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Todo updated Successfully",updateTodo))
})

export const deleteTodo = asyncHandler(async(req,res)=>{

    const todoId = req.params.id

    const deleteTodo = await Todo.findByIdAndDelete(todoId)

    if(!deleteTodo){
        throw new ApiError(400,"Error in deleting Todo")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Todo deleted Successfully",deleteTodo))
})