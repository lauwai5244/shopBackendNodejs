const shopHandler = require('../router_handler/shop')
const express = require('express')
const router = express.Router()


router.post('/getShop', shopHandler.getShop)
router.post('/getAllShop', shopHandler.getAllShop)
router.post('/updateShop', shopHandler.updateShop)
router.post('/creatShop', shopHandler.creatShop)
router.post('/getAllShopByCity', shopHandler.getAllShopByCity)
router.post('/getAllShopByType', shopHandler.getAllShopByType)
router.post('/getAllShopBySearch', shopHandler.getAllShopBySearch)

module.exports = router