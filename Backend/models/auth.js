const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true, 
        trim: true
      },
      email:{
        type: String,
    required: false,
    unique: true,
    lowercase: true
      },
      password: {
        type: String,
        required: false
      },
      profilePicture: {
        type: String,
        default: "" 
      },
      bio: {
        type: String,
        default: ""
      },
      followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],
        following:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
        }],
      createdAt:{
        type:Date,
        default:Date.now
      }
})

module.exports= mongoose.model("User",userSchema )