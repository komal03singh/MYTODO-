import express from "express"
import { createProject, getSingleProject, addCollaborator } from "../controllers/project.controller.js"
import { getAllProjects } from "../controllers/project.controller.js"
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const route = express.Router()

route.post('/createProject',isAuthenticated,createProject)
route.get('/getProjects',isAuthenticated,getAllProjects)
route.get('/getSingleProject/:id',isAuthenticated,getSingleProject)
route.put('/addCollaborator',isAuthenticated,addCollaborator)

export default route