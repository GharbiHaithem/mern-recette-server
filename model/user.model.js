const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const UserSchema =new mongoose.Schema({
  fullname:String,
  email:String,
  password:String,
  pic:{
    type:String,
    default:"https://img.freepik.com/vecteurs-libre/homme-mafieux-mysterieux-fumant-cigarette_52683-34828.jpg?w=740&t=st=1686811757~exp=1686812357~hmac=de0f4eab1e911fa0414b967647747ad4e80d8c80ba7d6a3f792417914724ce94"
  },
  token:String,
  whishlist:[
    {type:mongoose.Schema.Types.ObjectId,ref:'Recette'}
  ],
  valid :{
    type:Boolean,
    default:true
  },
  
})
UserSchema.pre('save',async function(next){
    if(!this.isModified("password")){next()}
const salt = bcrypt.genSaltSync(10)
this.password = await bcrypt.hash(this.password,salt)
})
// UserSchema.methods.IsPasswordMatched = async function(entryPassword){
//     return await bcrypt.compare(entryPassword,this.password)
// }
// UserSchema.methods.createPasswordResetToken= async function(){
// const resetToken = crypto.randomBytes(32).toString("hex")
// this.passwordResetToken=crypto.createHash("sha256")
// .update(resetToken)
// .digest("hex") 
// this.passwordResetExpires=Date.now() + 30 * 60 * 1000 // 10 minutes
// return resetToken
// }
module.exports = mongoose.model('User', UserSchema)