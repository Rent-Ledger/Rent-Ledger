
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../modals/registerSchema.js";
const salt=10;

const authController={
 register:async(req,res)=>{
    try{
        const {name,email,password,role,phone}=req.body;
        if(!name || !password || !email || !phone){
            return res.status(400).json({message:"All fields are required"});
        }
        if(phone.length<10 || phone.length>10){
            return res.status(400).json({message:"Phone number must be 10 digits"});
        }
        if(await User.findOne({email:email})){
            return res.status(400).json({message:"User already exists"});
        }
        if(password.length<6 || password.length>10){
            return res.status(400).json({message:"Password must be between 6 and 10 characters"});
        }
        const hashPassword=await bcrypt.hash(password,salt);
        const user=new User({name,email,password:hashPassword,role,phone});
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({message:"User created successfully",data:user,token});
    }catch(error){
        res.status(500).json({message:"Error creating user",msg:error.message});
    }
},

login:async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }
        if(!user.active){
            return res.status(400).json({message:"Your account has been deactivated by the admin"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"User logged in successfully",user,token});
    }catch(error){
        res.status(500).json({message:"Error logging in user",error});
    }
},
resetPassword:async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        if(!user.active){
            return res.status(400).json({message:"Your account has been deactivated by the admin"});
        }
        const hashPassword=await bcrypt.hash(password,salt);
        user.password=hashPassword;
        await user.save();
        res.status(200).json({message:"Password reset successfully",user});
    }catch(error){
        res.status(500).json({message:"Error resetting password",error});
    }
},
forgetPassword:async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(!user.active){
            return res.status(400).json({message:"Your account has been deactivated by the admin"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"Forget password link sent successfully",token});
    }catch(error){
        res.status(500).json({message:"Error forgetting password",error});
    }
},

getData:async(req,res)=>{
    try{
        const user=await User.find();
        res.status(200).json({message:"User data fetched successfully",user});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching user data",error:err.message});
    }
},
deactivationAccount:async(req,res)=>{
    try{
        const {id}=req.params;
        const{reason}=req.body;
        if(!reason){
            return res.status(400).json({message:"Reason is required"});
        }
        const user=await User.findById({_id:id});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        user.active=false;
        user.reason=reason;
        await user.save();
        res.status(200).json({message:"Account deactivated successfully",user});
    }catch(error){
        res.status(500).json({message:"Error deactivating account",error});
    }
}
}

export default authController;