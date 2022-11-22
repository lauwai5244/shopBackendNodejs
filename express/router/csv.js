const shopHandler = require('../router_handler/csv')
const express = require('express')
const router = express.Router()


router.post('/creatShopFromCSV', shopHandler.creatShopFromCSV)
module.exports = router