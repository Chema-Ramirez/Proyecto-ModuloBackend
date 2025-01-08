const User = require('../models/users')


const getUserById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado en la base de datos'})
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido obtener usuario'})
    }
}



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error: no se han podido obtener los usuarios' });
    }
}



const updateUser = async(req,res) =>{
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, {...req.body}, {new:true})
        if(!userUpdate){
            return res.status(404).json({message:'Usuario no encontrado en la base de datos'})
        }
        res.status(200).json({userUpdate, message:'El usuario ha sido actualizado correctamente'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido actualizar usuario'})
    }
}



const deleteUser = async(req,res)=>{
    try {
        userDelete = await User.findByIdAndDelete(req.params.id)
        if(!userDelete){
            return res.status(404).json({message: 'Usuario no encontrado en la base de datos'})
        }
        res.status(200).json({message: 'El usuario indicado ha sido eliminado con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error: no se ha podido eliminar usuario'})
    }
}



module.exports = { getUserById, getAllUsers, updateUser, deleteUser }

