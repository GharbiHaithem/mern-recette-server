const User = require('../model/user.model')
const {generateToken, generateRefreshToken} =require('../config/jwtToken')
const userCtrl = {
    createUserWithPasspost: async (req, res) => {
        const { googleId ,email,firstname,lastname,pic} = req.body
       
        console.log(req.body.googleId,req.body.email,req.body.firstname,req.body.lastname,req.body.pic)
        const refreshToken = generateRefreshToken(req.body.googleId)
        const newUser = {
            googleId:req.body.googleId,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            pic:req.body.pic,
            email:req.body.email,
            token: generateToken(req.body.googleId)
        }
        try{
             let user =await User.findOne({googleId : req.body.googleId})
             if(user){
                 res.json(user)
                }
         else{

            user = await User.create(newUser)
            res.json(user)
         }
             
        }catch(err){
            console.log(err)
        }
            },
            createUser: async (req, res) => {
                const { email } = req.body
                const findUser = await User.findOne({ email })
                try{
                    if (!findUser) {
                        //create new user
                        const newUser = await User.create({
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            mobile:req.body.mobile,
                            email:req.body.email,
                            password:req.body.password,
                            pic:req.body.pic
                           
                        })
            
                        return res.status(200).json(newUser)
                    }else{
                       return res.status(500).json({
                            msg: 'User Already Exist',
                            success: false
                        })
                    }
                   
                }
               catch(err){
                res.json({msg:err.message})
               }
                   
                
        
            },
    login: async (req, res) => {
        const { email, password } = req.body

        const findUser = await User.findOne({ email })
        if (findUser && (await findUser.IsPasswordMatched(password))) {
            const refreshToken = generateRefreshToken(findUser?._id)
            const updateUser = await User.findByIdAndUpdate(findUser._id, {
                refreshToken: refreshToken
            }, {
                new: true,
                upsert: true
            })
          
            res.json({
                _id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                mobile: findUser.mobile,
                pic:findUser.pic,
                token: generateToken(findUser._id)
            })
        } else {
            res.status(500).json({ message: 'invalid credentials' })
        }
    },
    addToWishList : async(req,res)=>{
        const {_id} = req.user
        const {recetteId} = req.body
        try {
            console.log(req.user)
            const user = await User.findById(_id)
            console.log(user)
            const alreadyExist = user.whishlist.find((id)=>id.toString()===recetteId)
            if(alreadyExist){
                const updateUser = await User.findByIdAndUpdate(user._id,{
                    $pull:{whishlist:recetteId}
                },{new:true})
                res.json(updateUser)
            }else{
                const addTowishList = await User.findByIdAndUpdate(user._id,{
                    $push:{whishlist:recetteId}
                },{new:true})
                res.json(addTowishList)
            }
           
        } catch (error) {
            
        }

    },
    getWishList: async (req, res) => {
        const { _id } = req.user
        try {
            const wishList = await User.findById(_id)
                .populate("whishlist")
            res.json(wishList)
        } catch (error) {
            res.json({ message: error.message })
        }
    },

}
module.exports = userCtrl;