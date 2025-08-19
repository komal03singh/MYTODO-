import express from 'express'
import {addTodo, getTodos, updateTodo, deleteTodo} from '../controllers/todo.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const route = express.Router()

route.post('/addTodo', isAuthenticated, addTodo)
route.get('/getTodos', isAuthenticated, getTodos)
route.put('/updateTodo/:id',  isAuthenticated, updateTodo)
route.delete('/deleteTodo/:id', isAuthenticated, deleteTodo)


export default route