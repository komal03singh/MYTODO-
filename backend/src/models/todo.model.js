import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true
    },

    isCompleted:{
        type: Boolean,
        default:false
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

export const Todo = mongoose.model("Todo",TodoSchema)