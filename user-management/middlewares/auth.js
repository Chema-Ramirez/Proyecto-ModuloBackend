const jwt = require('jsonwebtoken')

const authenticate = async(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Validation Token is required to access this resource'})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'Invalid Token'})
    }
}

module.exports = authenticate