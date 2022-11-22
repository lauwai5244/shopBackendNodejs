const db = require('../db/index')
const config = require('../config')

exports.creatShopFromCSV = (req, res) => {
    const shopInfo = req.body

    const sql2 = 'insert into ev_shops set ?'
    db.query(sql2, [req.body], function (err, results) {

        if (err) return res.send({ status: 1, message: err.message })

        if (results.affectedRows !== 1)
            return res.send({ status: 1, message: '註冊商店失敗,請稍後再試' })

        res.send({ status: 0, message: '申請成功' })

    })


}