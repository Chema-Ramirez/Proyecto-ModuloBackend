const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
},
    {
        timestamps: true
})

const hashPassword = async (password) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error('An error occurred while generating the password hash')
    }
}

userSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) return next()
        try{
    this.password = await hashPassword(this.password);
    next()
    }
    catch (error){
        next(error)
    }
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate()
    console.log(update)
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10)
            update.password = await bcrypt.hash(update.password, salt)
        } catch (error) {
            return next(error)
        }
    }
    next()
})

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)


module.exports = User