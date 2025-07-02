import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { userModel } from "../model/userSchema.js"


// singup 
export const singUp = async(req,res)=>{
    try {
        const {userName,email,password,conformPassword,countryName,fcmId} = req.body
         const user = await userModel.findOne({email})

         // for checking user already avlaible or not 
      if(user){
      return  res.status(409).json({massage:"user already exist,You can login",success:false})
      }

// for checking password and confrom password same or not 
     if (password !== conformPassword) {
        return res.status(400).json({
        message: "Password and confirm password do not match",
        result: false,
        });
         }

      // hashing password 
        const passwordHashed = await bcrypt.hash(password,10)

        // for create unique digit
          let uniqueName;
    let isUnique = false;

    while (!isUnique) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4 digit
      uniqueName = `${userName.trim()} ${randomNumber}`;

      const existingUnique = await userModel.findOne({ uniqueName });
      if (!existingUnique) {
        isUnique = true; // found a unique name
      }}
// creat user 
    const newUser = await userModel.create({
      userName,
      uniqueName,
      email,
      password: passwordHashed,
      countryName,
      fcmId,
    });
      
    return res.status(201).json({
       result:true,
       message: "User signed up successfully",
       data: newUser });  
    
} catch (error) {
    return res.status(400).json({result:false,message: "userName email password ,conformPassword,fcmId,countryName  is required.",error:error.message})

    }
}


// login user
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
         const user = await  userModel.findOne({email})

         // for checking user already avlaible or not 
      if(!user){
      return  res.status(400).json({message:"You are not registered.",result:false})
      }
      const isPasswordCorrect  = bcrypt.compare(password,user.password)
      if (!isPasswordCorrect) {
         return res.status(400).json({result:false, message: "Invalid password" });
        }

         const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
        result : true,
        message : "User login successful",
        data : user,
        token : token
    }) 
}catch(error){
  
 res.status(500).json({ message: "Email and password are required.", error: error.message });   
}

}



        


