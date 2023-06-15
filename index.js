const express = require('express')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv').config()

const cors = require('cors')
const authRoute = require('./route/auth.route')
const recetteRoute = require('./route/recette.route')
const uploadRooute = require('./route/upload.route')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 const cookieParser = require('cookie-parser');
const categoryRoute = require('./route/category.route')
const cookiesession = require('cookie-session')
const passport = require('passport')
const GoogleStrategy = require("./passport")
const authGoogleRoute = require('./route/authGoogle.route')
const session = require('express-session')
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(session({ 
    secret:'nosecret',
    name:'aaaa',
    resave:false,
    saveUninitialized:true
 
}))


app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect(
    process.env.MONGO_URI , 
        {
            UseNewUrlParser:true,
            useUnifiedTopology:true,
          
        }
    
)
.then(()=>{

    console.log(`database connected succseffuly`)
}) 
.catch((err)=>{
    console.log(`error connexion in database ${err}`)
})
// 
app.use(passport.initialize())

app.use(passport.session())
app.use(cors({
    origin:"https://recette-beta.vercel.app",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))




app.use('/api',authGoogleRoute)
app.use('/api/user',authRoute)

app.use('/api/recette',recetteRoute)
app.use('/api',uploadRooute)
app.use('/api/category',categoryRoute)
// app.use(notFound)
// app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 