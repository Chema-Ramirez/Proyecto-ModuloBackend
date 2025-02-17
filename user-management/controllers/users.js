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
        res.status(500).json({ message: 'Error' });
    }
}


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: req.body.name,
                email: req.body.email,
            },
            { new: true } 
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User update failed' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error during user update:", error)
        res.status(500).json({ message: 'Error updating user' })
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
        res.status(500).json({message: 'Error'})
    }
}


module.exports = { getUserById, getAllUsers, updateUser, deleteUser }

