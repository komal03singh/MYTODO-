import {mongoose,Schema} from "mongoose"

const InviteSchema = new Schema({

    project : {
        type : Schema.Types.ObjectId,
        ref : "Project"
    },

    invitedUser : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    invitedBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    status : {
        type : "String",
        enum : ["Pending","Accepted","Rejected"],
        default : "Pending"
    },

})

export const Invites = mongoose.model("Invites",InviteSchema)