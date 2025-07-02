import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    "userName" : {type:String,required:true},
    "uniqueName" : {type:String},
    "email" :  {type:String,required:true,unique:true},
    "password" : {type:String,required:true},
    "countryName" : {type:String,required:true},
    "fcmId" : {type:String,required:true},
     "isAdmin": { type: Boolean, default: false },
      "role": { type: String, default: "user" },
},
{
    timestamps: true,
  }
)

export const userModel = mongoose.model("user",userSchema)