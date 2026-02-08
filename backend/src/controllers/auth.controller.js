import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) =>{
    const {email,fullname,password} = req.body;
    try{
        
        if(!email || !fullname || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return  res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email: email,
            fullname: fullname,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                ProfilePic: newUser.ProfilePic,
            });
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Server Error"});
    }
}

export const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message: "Invalid email or password"});
            }
            generateToken(user._id,res);
            return res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                ProfilePic: user.ProfilePic,
            });
        }
    }catch(error){
        console.log("Error in login controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = (req,res) =>{
    try{
        res.cookie("token","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.log("Error in logout controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
   
}


export const updateProfile = async (req,res) =>{
    try{
        const {ProfilePic} = req.body;
        const userId = req.user._id;
        if(!ProfilePic){
            return res.status(400).json({message: "ProfilePic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(ProfilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {ProfilePic: uploadResponse.secure_url},
            {new: true}
        );
        res.status(200).json(updatedUser);
    }catch(error){
        console.log("Error in updateProfile controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = async (req,res) =>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}