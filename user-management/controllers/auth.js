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
            return res.status(400).json({message: 'This user already exists, please enter a new user'})
        }


        const newUser = await User.create({email,name,password})
        const token = generateToken(newUser)
        if(!token){
            return res.status(400).json({message: 'Error token'})
        }
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error: Unable to register user'})
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log("correcto", user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' })
        }
        
        const token = generateToken(user)
        if (!token) {
            return res.status(400).json({ message: 'Error token' })
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error: Failed to login' })
    }
}

module.exports = { createUser, loginUser }