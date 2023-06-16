const jwt =require('jsonwebtoken')
const User = require('../model/user.model')
const authMiddleware = async(req,res,next)=>
{
    let token
    if(req?.headers?.authorization?.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
    console.log({token:token})
    try{
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET)
           console.log(decode.id)
           const user = await User.findById(decode.id)
           console.log(user)
         console.log({request_user:user})
           req.user=user
   
           next()
        }
     
    }catch(error){
      res.json({message:'Token not valid or expired login to connect'})
    } 
    }
    else{
    res.json({message:'There is no token attached to header'})
    }
} 
module.exports = {authMiddleware }