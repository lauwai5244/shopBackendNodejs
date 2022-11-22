const shoppingCartHandler = require('../router_handler/shoppingCart')
const express = require('express')
const router = express.Router()


router.post('/getshoppingCart', shoppingCartHandler.getshoppingCart)
router.post('/addshoppingCart', shoppingCartHandler.addshoppingCart)
router.post('/deleteShoppingCart', shoppingCartHandler.deleteShoppingCart)
router.post('/updateShoppingCartType', shoppingCartHandler.updateShoppingCartType)
router.post('/updateShoppingCartCount', shoppingCartHandler.updateShoppingCartCount)

module.exports = router