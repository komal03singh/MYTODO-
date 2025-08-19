import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js' 
import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/users.model.js'

export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.jwt
    if(!token){
        throw new ApiError(401,"token not found")
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.userId).select("-password")

    if(!user){
        throw new ApiError(401,"User not found")
    }

    req.user = user
    console.log(user)
    next()
    
})