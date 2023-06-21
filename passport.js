

const { generateToken } = require('./config/jwtToken');
const User = require('./model/user.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
// passport.serializeUser(function (user, done) {
//     done(null, user.id)
// })
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user)
//     })
// })
passport.use(new GoogleStrategy({
    clientID: "483148789252-3u00lc95p6ct96nh1hedoc2l0d392aja.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `http://localhost:5000/api/auth/google/callback`,
    scope: ["profile", "email"],
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"


},
    async (accessToken, refreshToken, profile, callback)=> {  
   
        const newUser = {
            googleId:profile.id,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
            pic:profile.photos[0].value,
            email:profile.emails,
            token: generateToken(profile.id)
        }
        try{
             let user =await User.findOne({googleId : profile.id})
            
             if(user){
                console.log(user)
                 callback(null,user)
                }
         else{
            console.log(user)
            user = await User.create(newUser)
            callback(null,user)
         }
             
        }catch(err){
            console.log(err)
        }
    
          
       
    }))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

