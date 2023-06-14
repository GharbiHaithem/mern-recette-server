const Recette = require('../model/recette.model')
const slugify = require('slugify')
const recetteCtr = {
    createRecette: async (req, res) => {
        const   {googleId}= req.user
        try {
       
           console.log({aaccccccaa:googleId})
            if (req.body.title) {
                req.body.slug = slugify(req.body.title)
            }
            const recettes = new Recette(
                {
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                    category: req.body.category,
                    images: req.body.images,
                     postedBy: googleId
                })
            await recettes.save()
            res.json(recettes)
        } catch (err) {
            console.log(err.message)
        }
    },
    getAllRecette:async(req,res)=>{
        const ITEM_PER_PAGE = 3
        const page = req.query.page || 1
        const query={}
        try {
            const skip = (page - 1) * ITEM_PER_PAGE
            const count =await Recette.estimatedDocumentCount(query)
       
            const recettes = await Recette.find({postedBy:req.user.googleId},query)
          
            console.log(recettes)
            const pageCount = count / ITEM_PER_PAGE
                       res.json({recettes,
                    pagination:{
                        count,
                        pageCount
                    }
                    })
        } catch (error) {
            res.json({message:error.message})
        }
    },
    getARecette:async(req,res)=>{
       const {id} = req.params
      

        try {
         
           
            const recette = await Recette.findById(id)
            console.log(recette)
            res.json(recette)
        } catch (error) {
            res.json({message:error.message})
        }
    },
    deleteRecette:async(req,res)=>{
        
        try {
            const {id} = req.params
            const recetteDel = await Recette.findByIdAndDelete(id)
            res.status(200).json(recetteDel)
        } catch (error) {
            res.json({message:error.message})
        }
    },
    updateRecette:async(req,res)=>{
        try {
          console.log(req.user);
          const { id } = req.params
          const updateRecette = await Recette.findByIdAndUpdate(id,req.body,{new:true})  
          res.status(200).json(updateRecette)
        } catch (error) {
            res.json({message:error.message})
        }
    }

}
module.exports = recetteCtr