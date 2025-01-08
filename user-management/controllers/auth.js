const { json } = require('express')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (user) => {
    return jwt.sign({id: user.id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const createUser = async (req, res) => {
    const {email,name,password} = req.body

    try{
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: 'Ya existe este usuario, introduce un nuevo usuario'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = await User.create({email,name,password:hashedPassword})
        const token = generateToken(newUser)
        if(!token){
            return res.status(400).json({message: 'Error al crear el token'})
        }
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error: no se ha podido registrar usuario'})
    }
}


module.exports = { createUser }