import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    },
    avatar :{
        type : String,
        default : "https://cdn-icons-png.flaticon.com/256/6073/6073873.png"
    },
} , {timestamps : true});

const User = mongoose.model('User' , userSchema);

export default User;