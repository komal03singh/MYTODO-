import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/users.model.js";
import { Invites } from "../models/Invites.model.js";

export const createInvite = asyncHandler(async(req,res)=>{
    
    const {email, projectId} = req.body
    const currUserId= req.user._id

    if(!email || !projectId){
        throw new ApiError(400,"All fields are required")
    }

    const InvitedUser = await User.findOne({email})

    if(!InvitedUser){
        throw new ApiError(400,"User does not Exist")
    }

    const project = await Project.findById(projectId)
    if(project.members.some(member => member.equals(InvitedUser._id)))
    {
        throw new ApiError(400,"User is already a member of the project")
    }

    const newInvite = await Invites.create({
        project : projectId,
        invitedUser : InvitedUser._id,
        invitedBy : currUserId
    })

    if(!newInvite){
        throw new ApiError(400,"Unable to create invite")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Invite Sent",newInvite))
    
})

export const getSentInvites = asyncHandler(async(req,res)=>{

    const currUser = req.user._id

    if(!currUser){
        throw new ApiError(400,"User not found")
    }

    const sentInvites = await Invites.find({invitedBy : currUser})
    .populate("invitedUser","username email")
    .populate("project","title")

    if(!sentInvites){
        throw new ApiError(400,"Unable to find invites")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Sent Invites fetched successfully",sentInvites))
})

export const getReceivedInvites = asyncHandler(async(req,res)=>{

    const currUser = req.user._id

    if(!currUser){
        throw new ApiError(400,"User not found")
    }

    const sentInvites = await Invites.find({invitedUser : currUser})
    .populate("invitedBy","username email")
    .populate("project","title")

    if(!sentInvites){
        throw new ApiError(400,"Unable to find invites")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Received Invites fetched successfully",sentInvites))
    
})

export const updateStatus = asyncHandler(async(req,res) => {

    const inviteId = req.params.id
    const {status} = req.body

    if(!inviteId){
        throw new ApiError(400,"Invite not found")
    }

    const updatedStatus = await Invites.findByIdAndUpdate(
        inviteId,
        {status},
        {new:true}
    )

    if(!updatedStatus){
        throw new ApiError(400,"Unable to update status")
    }

    return res  
    .status(200)
    .json(new ApiResponse(200,"Status updated successfully",updatedStatus))
})

export const deleteSentInvites = asyncHandler(async(req,res) => {

    const inviteId = req.params.id

    if(!inviteId){
        throw new ApiError(400,"Invite not found")
    }

    const deletedInvite = await Invites.findByIdAndDelete(inviteId)

    if(!deletedInvite){
        throw new ApiError(400,"Unable to delete invite")
    }

    return res  
    .status(200)
    .json(new ApiResponse(200,"Invite deleted successfully"))

})