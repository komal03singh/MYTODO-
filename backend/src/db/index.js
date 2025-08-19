import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Successfully connected to DB : HOST NAME ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log('Error connecting to DB ', error)
        
    }
}

export default connectDB;