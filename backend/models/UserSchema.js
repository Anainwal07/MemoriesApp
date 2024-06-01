import { Schema, model } from "mongoose";

const UserSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    picturePath: {
        type: String,
        default: "",
      },
} , {timestamps : true})


const User = model("User" , UserSchema) ; 

export default User ; 