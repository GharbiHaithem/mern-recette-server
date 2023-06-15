

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
    function (accessToken, refreshToken, profile, callback) {

        const profilPicUrl = profile.photos[0].value
       callback(null,profile)

        // User.findOne({ googleId: profile.id }), async function (err, user) {

        //     console.log(user)
        //     if (user) {
        //         const updateUser = {
        //             fullname: profile.displayName,
        //             email: profile.emails[0].value,
        //             pic: profile.photos[0].value,
        //             secret: accessToken
        //         }
        //         await User.findOneAndUpdate({
        //             _id: user.id
        //         },
        //             { $set: updateUser },
        //             { new: true }

        //         ).then((result) => {
        //             console.log(result)
        //             return cb(err, result)

        //         })
        //     } else {
        //         const newUser = new User({
        //             googleId: profile.id,
        //             username: profile.displayName,
        //             email: profile.emails[0].value,
        //             pic: profile.photos[0].value,
        //             secret: accessToken
        //         })
        //         await newUser.save().then((result) => {
        //             console.log(result)
        //             return cb(err, result)

        //         })
        //     }
        // }
    }))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

