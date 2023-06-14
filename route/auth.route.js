const express = require('express')
const router =  express.Router()
const {createUser,login,addToWishList,getWishList} = require('../controller/userCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.post(`/registre`,createUser)
router.post(`/login`,login)
router.put('/addWidhList',authMiddleware,addToWishList)
router.get('/wishListGet',authMiddleware,getWishList)
module.exports = router