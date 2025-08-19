import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/users.model.js";

export const createProject = asyncHandler(async(req,res)=>{
    const{title,description,startedAt,endAt} = req.body

    if(!title || !description || !startedAt || !endAt){
        throw new ApiError(400,"All fields are required")
    }

    const newProject = await Project.create({
        title,
        description,
        admin : req.user._id,
        startedAt,
        endAt


    })

    if(!newProject){
        throw new ApiError(400,"Unable to create project")
    }

    return res
    .status(201)
    .json(new ApiResponse(200,"Project created successfully",newProject))

})

export const getAllProjects = asyncHandler(async(req,res)=>{
    const userId = req.user._id

    if(!userId){
        console.log("User not found")
    }

    const projects = await Project.find({
        admin : userId
    })

    if(!projects){
        throw new ApiError(400,"Unable to find projects")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Projects fetched Successfully!",projects))
})

export const getSingleProject = asyncHandler(async(req,res)=>{
    const projectId = req.params.id

    if(!projectId){
        throw new ApiError(400,"Project not found")
    }

    const project = await Project.findById(projectId)

    if(!project){
        throw new ApiError(400,"Unable to find project")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Project fetched Successfully!",project))
})

export const addCollaborator = asyncHandler(async(req,res)=>{
    console.log("req.user in addCollaborator:", req.user);
    const {userId, projectId} = req.body

    if(!userId){
        throw new ApiError(400,"User Id can not be empty")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(400,"User not found")
    }

    const project = await Project.findById(projectId)

    if(!project){
        throw new ApiError(400,"Project not found")
    }

    const newCollaborator = await Project.findOneAndUpdate({
        _id: projectId
    },
    {
        $addToSet : {
            members : userId
        }
    },
    {
        new : true
    })

    if(!newCollaborator){
        throw new ApiError(400,"Unable to add collaborator")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Collaborator added Successfully!",newCollaborator))
    
})

export const addTodo = asyncHandler(async(req,res)=>{
    console.log("todo created")
})

export const editTodo = asyncHandler(async(req,res)=>{
    console.log("edited")
})

export const deleteTodo = asyncHandler(async(req,res)=>{

})

export const getAllTodos = asyncHandler(async(req,res)=>{
    
})

export const removeCollaborator = asyncHandler(async(req,res)=>{

})

export const deleteGroupProject = asyncHandler(async(req,res)=>{

})