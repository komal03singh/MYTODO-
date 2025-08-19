import express from 'express'
import {register,login,logout} from '../controllers/user.controller.js'

const route = express.Router()

route.post('/register',register)
route.post('/login',login)
route.get('/logout',logout)

export default route;