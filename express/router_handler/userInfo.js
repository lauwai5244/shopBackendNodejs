
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.getUserInfo = (req, res) => {
    const sql = `select id, username, name, email, gender, birthday, phone from ev_users where id=?`
    db.query(sql, req.user.id, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length !== 1) return res.send({
            status: 1,
            message: '獲取失敗',
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '獲取成功',
            data: results[0],
        })
    })

}

exports.updateUserInfo = (req, res) => {
    const userInfo = req.body

    if (typeof userInfo.name != 'string' || typeof userInfo.email != 'string')
        return res.send({ status: 1, message: '名稱或電郵資料型別錯誤！' })

    if (typeof userInfo.gender != 'string' || typeof userInfo.phone != 'string')
        return res.send({ status: 1, message: '性別或電話資料型別錯誤！' })

    // if (typeof userInfo.birthday != 'object')
    //     return res.send({ status: 1, message: '生日型別錯誤！' })

    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.user.id], (err, results) => {
        // sql執行失敗
        if (err) return res.send({ status: 1, message: err })
        // sql執行成功,影響行數不為1
        if (results.affectedRows !== 1) return res.send({ status: 1, message: '修改失敗' })
        return res.send({ status: 0, message: '修改成功' })
    })
}

exports.resetPassword = (req, res) => {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    if (typeof oldPassword != 'string' || typeof newPassword != 'string') {
        return res.send({ status: 1, message: '密碼型別錯誤' })
    }
    if (newPassword == oldPassword)
        return res.send({ status: 1, message: '新密碼和舊密碼相同' })

    const sql = `select password from ev_users where id=?`
    //  先找到密碼
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.send({ status: 1, message: err })
        const compareResult = bcrypt.compareSync(oldPassword, results[0].password)
        if (!compareResult) return res.send({ status: 1, message: '舊密碼錯誤' })

        const bcryptPwd = bcrypt.hashSync(newPassword, 10) //  新密碼加密
        const sql = `update ev_users set password=? where id=?`
        db.query(sql, [bcryptPwd, req.user.id], (err, results) => {
            // sql執行失敗
            if (err) return res.cc(err)
            // sql執行成功,影響行數不為1
            if (results.affectedRows !== 1) return res.send({ status: 1, message: '修改失敗' })
            return res.send({ status: 0, message: '修改成功' })
        })
    })
}



