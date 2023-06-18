const multer =  require('multer') 
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
// cb(null,path.join(__dirname,'../public/images'))
cb(null, path.join('/opt/render/project/src/server/public/images'));    
},
    filename:function(req,file,cb){
const suffixUnique = Date.now() + "-" + Math.round(Math.random())* 1e9;
cb(null,file.fieldname+ "-" + suffixUnique + ".jpg") 
    }
})
const multerFilter=(req,file,cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null,true)
}else{
    cb({
        message:"unsupported file format"
    })
}
}

const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
   
})
const productImgResize = async(req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path)
            .toFormat('jpg').toFormat('avif').toFormat('gif')
            .resize(300,300)
            .toFile(`${process.env.STATIC_DIR}/${file.filename}`)
            fs.unlinkSync(`${process.env.STATIC_DIR}/${file.filename}`)
        })
    )
    next()
}
const blogImgResize = async(req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path)
            .toFormat('jpg')
            .resize(300,300)
            .toFile(`public/images/blogs/${file.filename}`)
            fs.unlinkSync(`public/images/blogs/${file.filename}`)
        })
    )
    next()
}
module.exports = {uploadPhoto,productImgResize,blogImgResize}