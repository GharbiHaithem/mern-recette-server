const mongoose = require('mongoose')
var RecetteSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true
},
slug:{
    type:String,
    required:true,
    unique:true,
    lowerase:true
},
description:{
    type:String,
    required:true
},

category:String
,


images:[{
    public_id:String,
    url:String
}],
postedBy:String



},{timestamps:true})
module.exports = mongoose.model('Recette',RecetteSchema)