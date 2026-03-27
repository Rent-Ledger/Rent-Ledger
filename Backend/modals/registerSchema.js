import mongoose from "mongoose";
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 10,
  },
  phone:{
    type:Number,
    required:true,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "tenant", "owner", "applicant", "manager"],
    default: "applicant",
  },
  active:{
    type:Boolean,
    default:true,
  },
  reason:{
    type:String,
    default:"",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", registerSchema);
export default User;