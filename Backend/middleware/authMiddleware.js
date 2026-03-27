import jwt from "jsonwebtoken";
import User from "../modals/registerSchema.js";
const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decodedToken.id);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(!user.active){
            return res.status(401).json({message:"Your account has been deactivated by the admin"});
        }
        req.user=user;
        next();
    }catch(error){
        res.status(500).json({message:"Error authenticating user",error});
    }
}

export default authMiddleware;