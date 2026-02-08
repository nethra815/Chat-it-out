import Message from '../models/message.model.js';
import User from '../models/user.model.js';


export const getUsersForSidebar = async (req, res) => {
    
    try{
        const currentUserId = req.user._id;
        const users = await User.find({_id: {$ne:currentUserId}}).select("-password");
        res.status(200).json(users);

    }catch(error){
        console.log("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({message: "Server Error"});
    }


};

export const getMessages = async (req, res) => {
    try{
        const currentUserId = req.user._id;
        const otherUserId = req.params.id;
        const messages = await Message.find({
            $or: [
                {sender: currentUserId, receiver: otherUserId}, 
                {sender: otherUserId, receiver: currentUserId}
            ]
        })
        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({message: "Server Error"});
    }
};

export const sendMessage = async (req, res) => {
    try{
        const { text,image } = req.body;
        const receiverId = req.params;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }


        const newMessage = new Message({
            senderId: req.user._id,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        //todo: real-time via sockets

        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({message: "Server Error"});
    }
};