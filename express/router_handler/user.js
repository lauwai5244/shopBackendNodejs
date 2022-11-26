
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.reguser = (req, res) => {
    const userinfo = req.body

    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用戶名或密碼不能為空！' })
    // }
    if (typeof userinfo.username != 'string' || typeof userinfo.password != 'string') {
        return res.send({ status: 1, message: '用戶名或密碼資料型別錯誤！' })
    }
    const sql = `select * from ev_users where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        if (err)
            return res.send({ status: 1, message: err.message })
        if (results.length > 0)
            return res.send({ status: 1, message: '用戶名已經被佔用' })


        //  利用bcryptjs進行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql2 = 'insert into ev_users set ?'

        db.query(sql2, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            if (err) return res.send({ status: 1, message: err.message })

            if (results.affectedRows !== 1)
                return res.send({ status: 1, message: '註冊用戶失敗,請稍後再試' })

            res.send({ status: 0, message: '申請成功' })

        })
    })

}

exports.login = (req, res) => {
    const userinfo = req.body
    if (typeof userinfo.username != 'string' || typeof userinfo.password != 'string') {
        return res.send({ status: 1, message: '用戶名或密碼資料型別錯誤！' })
    }

    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        if (err) return res.send({ status: 1, message: err })
        if (results.length !== 1) return res.send({ status: 1, message: '賬號或密碼錯誤' })
        //  利用bcrypt來判斷密碼是否正確 (需要先加密)
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password) // 比較字串 返回boolean
        if (!compareResult)
            return res.send({ status: 1, message: '賬號或密碼錯誤' })

        //  生成JWT的TOKEN字串
        //const user = results[0].username;
        const user = { ...results[0], password: '', user_pic: '' } //  清除password 和 userpic的資料
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token有效時間
        })

        res.send({
            status: 0,
            message: "登錄成功",
            token: 'Bearer ' + tokenStr,
        })
    })

}


exports.test = (req, res) => {

    return res.send({ status: 0, message: '測試測試' })



}


