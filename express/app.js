
const cors = require('cors')
const express = require('express')
const app = express()
const userRouter = require('./router/user')
// 用户信息路由模塊
const userinfoRouter = require('./router/userinfo')
const shopRouter = require('./router/shop')
const csvRouter = require('./router/csv')
const commodityRouter = require('./router/commodity')
const shoppingCartRouter = require('./router/shoppingCart')
// 導入配置文件
const config = require('./config')
// 解析token中間件
const expressJWT = require('express-jwt')
// 全局跨域
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())


// 使用 .unless({ path: [/^\/api\//] }) 指定那些接口不需要進行Token身份認證
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use('/api', userRouter, csvRouter)
// /my開頭的api，都是有權限接口，需要進行Token 身份驗證
app.use('/my', userinfoRouter, shopRouter, commodityRouter, shoppingCartRouter)
app.use(function (err, req, res, next) {
    console.log("err" + err)
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份認證失敗！' })
})


// app.listen(process.env.PORT || 80, function () {
//     console.log('api server running at http://127.0.0.1:80')
// })


//localhost
app.listen(3000, function () {
    console.log('api server running at http://127.0.0.1:3000')
})

