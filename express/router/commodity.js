const shopHandler = require('../router_handler/commodity')
const express = require('express')
const router = express.Router()


router.post('/creatCommodity', shopHandler.creatCommodity)
router.post('/updateCommodity', shopHandler.updateCommodity)
router.post('/getCommodity', shopHandler.getCommodity)
router.post('/deleteCommodity', shopHandler.deleteCommodity)
router.post('/getCommodityByShopId', shopHandler.getCommodityByShopId)
module.exports = router