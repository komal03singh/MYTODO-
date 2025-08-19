import mongoose, {Schema,model} from "mongoose"

const ProjectSchema = new Schema({
    
    admin : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    title : {
        type : String,
        trim : true
    },

    description : {
        type : String,
        trim : true
    },

    startedAt : {
        type : Date,
        default : Date.now()
    },

    endAt : {
        type : Date
    },

    members : [
        {
            userId : {
                type : Schema.Types.ObjectId,
                ref : "User",
                required : true
            }
        }
    ],

    todos : [
        {
            content : {
                type : String,
                required : true
            },

            status : {
                type : Boolean,
                default : false
            },

            assignedTo : {
                type : String
            }
        } 
    ]



},{timestamps : true})

export const Project = model("Project",ProjectSchema)