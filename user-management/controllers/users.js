const User = require('../models/users')


const getUserById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error'})
    }
}



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
}



const updateUser = async(req,res) =>{
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, {...req.body}, {new:true})
        if(!userUpdate){
            return res.status(404).json({message:'User not found'})
        }
        res.status(200).json({userUpdate, message:'User has been updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}



const deleteUser = async(req,res)=>{
    try {
        userDelete = await User.findByIdAndDelete(req.params.id)
        if(!userDelete){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({message: 'User has been successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error'})
    }
}



module.exports = { getUserById, getAllUsers, updateUser, deleteUser }

