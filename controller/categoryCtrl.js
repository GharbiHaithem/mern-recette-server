const Category  = require('../model/category.model')
const categoryCtrl = {
    createCategory:async(req,res)=>{
        try{
            const{title} = req.body
           if(title){
            const category = await Category.create(req.body)
            res.json(category)
           }
         
        }catch(err){
            res.status(500).json({message:err.message})
        }
    },
    getAllCategory:async(req,res)=>{
        try{
       const cat = await Category.find()
       res.json(cat)
        }catch(err){
      res.status(500).json({message:err.message})
        }
    }
}
module.exports = categoryCtrl