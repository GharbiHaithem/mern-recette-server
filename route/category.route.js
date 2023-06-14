const express = require('express')
const router =  express.Router()
const {createCategory,getAllCategory} = require('../controller/categoryCtrl')
router.post(`/create`,createCategory)
router.get('/categories',getAllCategory)
module.exports = router