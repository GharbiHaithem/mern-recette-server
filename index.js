const express = require('express')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv').config()
const fs = require('fs');
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
const https = require('https');
const path = require('path')
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
const directory = 'public/images/products';
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}
app.use(passport.initialize())

app.use(passport.session())
app.use(cors({
    origin:process.env.BASE_URL_FRONT,
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
const keyPath = path.resolve(__dirname, './certificate/key.pem');
const certPath = path.resolve(__dirname, './certificate/cert.pem');
console.log(keyPath)
console.log(certPath)
const options = {

    key: fs.readFileSync(keyPath),
   
    cert: fs.readFileSync(certPath)
   
   };
   if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    // Les fichiers existent, vérifiez leur contenu
    const keyContent = fs.readFileSync(keyPath, 'utf8');
    const certContent = fs.readFileSync(certPath, 'utf8');
  
    // Vérifiez si les contenus des fichiers sont valides
  
    // Vous pouvez utiliser des bibliothèques telles que `openssl` ou `crypto` pour valider les certificats.
  } else {
    console.log('Les fichiers de certificat SSL n\'existent pas');
  }
const server = https.createServer(options,app)   
server.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 