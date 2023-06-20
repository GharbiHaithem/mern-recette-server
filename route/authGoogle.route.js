const router = require('express').Router()
const passport = require('passport')
router.get("/auth/login/success",(req,res)=>{
    console.log(req)
    if(req.user){
        res.status(200).json({
            error:false,
            message:"successfully loged in",
            user:req.user
        })
    }else{
        res.status(403).json({error:true,message:"not Authorized"})
    }
})
router.get("/auth/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"login faillure"
    })
})
router.get("/auth/google",passport.authenticate("google",["profile","email"]))
router.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:`${process.env.BASE_URL_FRONT}/myrecette`,
    failureRedirect:"/login/failed"
}))
router.get("/auth/logout",async(req,res)=>{
    req.logout(function(err) {
        if (err) {
       
          throw new Error(err);
        }
        // Effectuer d'autres actions après la déconnexion réussie
        // Rediriger l'utilisateur vers une autre page, etc.
        res.redirect(process.env.BASE_URL_FRONT)
      });
  
})
router.get('/auth/profile',async(req,res)=>{
   if( (req.user))   
  {
    const profilPicUrl =await  req?.user?.photos[0]?.value
    res.json({profilPicUrl})
  }
   
})

module.exports = router