import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/users.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {string, z} from "zod"
import bcrypt from "bcryptjs";
import { generateTokenAndSaveAsCookie } from "../jwt/auth.js";


const userValidation = z.object({
    email : z.string().email({message:"Invalid email address"}),
    username : z.string().min(3,{message:"Username should be atleast of 3 characters long"}).max(20),
    password : string().min(6,{message:"Password should be atleast 6 characters long"})

})

export const register = asyncHandler(async(req,res)=>{

    const {username, email, password} = req.body;

    if(!username || !email || !password)
    {
        throw new ApiError(400,"All fields are required")
    }


    const validation = userValidation.safeParse({username,email,password})
    if(!validation.success){
        const valError = validation.error.issues.map((err)=>(err.message))
        throw new ApiError(400,valError)
    }

    const user = await User.findOne({email})

    if(user)
    {
        throw new ApiError(400,"User already exists")
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(!newUser){
        throw new ApiError(400,"Error in create user")
    }


    const token = await generateTokenAndSaveAsCookie (newUser._id,res)


    return res
    .status(200)
    .json(new ApiResponse(200,"User Registerd Successfully",newUser,token))

})

export const login = asyncHandler(async(req,res)=>{

    const {email, password} = req.body

    if(!email || !password)
    {
        throw new ApiError(400,"All fields are required")
    }

    const loggedUser = await User.findOne({email}).select("+password")

    if(!loggedUser || !(bcrypt.compareSync(password,loggedUser.password)))
    {
        throw new ApiError(400,"Can not find email or password")
    }

    const token = await generateTokenAndSaveAsCookie(loggedUser._id,res)

    return res
    .status(200)
    .json(new ApiResponse(200,"Login Sucessfully!",loggedUser,token))
    
})


export const logout = asyncHandler(async(req,res)=>{

    res.clearCookie("jwt",{
        httpOnly: true,
        secure: false,  
        sameSite: "Lax",
        path:"/"
    })

    return res
    .status(200)
    .json(new ApiResponse(200,"User Logout Successfully!"))

})