const userInfoHandler = require('../router_handler/userInfo')
const express = require('express')
const router = express.Router()


// 獲取用戶信息
router.post('/getUserInfo', userInfoHandler.getUserInfo)
router.post('/updateUserInfo', userInfoHandler.updateUserInfo)
router.post('/resetPassword', userInfoHandler.resetPassword)

module.exports = router

