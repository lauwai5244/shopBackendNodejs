const userHandler = require('../router_handler/user')
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块


// 注册新用户
router.post('/reguser', userHandler.reguser)
// 登录
router.post('/login', userHandler.login)

router.post('/test', userHandler.test)
module.exports = router