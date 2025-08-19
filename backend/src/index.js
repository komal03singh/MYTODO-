import express from 'express';
import connectDB from './db/index.js';
import { ApiError } from './utils/ApiError.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config({
    path : './.env'
})

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors(
    {
        origin : process.env.FRONTEND_URL,
        credentials : true,
        methods : 'GET,POST,PUT,DELETE',
        allowedHeaders : ['Content-Type','Authorization']

    })
)


//connecting database

connectDB()
.then(()=>{
    try {
        app.listen(process.env.PORT || 4001, ()=>{
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log('Error in connecting to DataBase',error)
    }
})

//connceting routes

import userRoute from './routes/users.routes.js'
import todoRoute from './routes/todo.routes.js'
import projectRoute from './routes/project.routes.js'
import inviteRoute from './routes/invites.routes.js'

app.use('/users',userRoute)
app.use('/todo',todoRoute)
app.use('/project',projectRoute)
app.use('/invites',inviteRoute)



// Global error handler
app.use((err, req, res, next) => {
  // If it's an instance of your ApiError, use its props
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // For unhandled or unknown errors, return a generic response
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
});
