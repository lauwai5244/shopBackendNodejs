const db = require('../db/index')
const config = require('../config')

exports.creatCommodity = (req, res) => {
    const commodity = req.body
    if (typeof commodity.name != 'string' || typeof commodity.price != 'number')
        return res.send({ status: 1, message: '名稱或價格資料型別錯誤！' })

    const sql = 'insert into ev_commodity set ?'
    db.query(sql, [req.body, req.body.userId = req.user.id], function (err, results) {

        if (err) return res.send({ status: 1, message: err.message })

        if (results.affectedRows !== 1)
            return res.send({ status: 1, message: '註冊商品失敗,請稍後再試' })

        res.send({ status: 0, message: '添加成功' })

    })

}

exports.updateCommodity = (req, res) => {
    const CommodityInfo = req.body
    const id = CommodityInfo.id
    const name = CommodityInfo.name
    const price = CommodityInfo.price
    if (typeof name != 'string' || typeof price != 'number')
        return res.send({ status: 1, message: '名稱或價格資料型別錯誤' })


    const sql = `update ev_commodity set ? where id=?`
    db.query(sql, [{ name, price }, id], (err, results) => {
        // sql執行失敗
        if (err) return res.send({ status: 1, message: err })
        // sql執行成功,影響行數不為1
        if (results.affectedRows !== 1) return res.send({ status: 1, message: '修改失敗' })
        return res.send({ status: 0, message: '修改成功' })
    })
}

exports.getCommodity = (req, res) => {
    const sql = `select * from ev_commodity where userid=?`
    db.query(sql, req.user.id, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length === 0) return res.send({
            status: 1,
            message: '用戶還沒有商品,請進行添加',
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '獲取成功',
            data: results,
        })
    })

}

exports.getCommodityByShopId = (req, res) => {
    const CommodityInfo = req.body
    const id = CommodityInfo.shopId
    const sql = `select * from ev_commodity where shopId=?`
    db.query(sql, id, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length === 0) return res.send({
            status: 1,
            message: '用戶還沒有商品,請進行添加',
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '獲取成功',
            data: results,
        })
    })

}

exports.deleteCommodity = (req, res) => {
    const CommodityInfo = req.body
    const id = CommodityInfo.id
    const sql = `DELETE FROM ev_commodity where id = ?`
    db.query(sql, id, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '刪除成功',

        })
    })

}