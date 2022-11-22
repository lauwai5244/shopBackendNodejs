const db = require('../db/index')
const config = require('../config')

exports.getshoppingCart = (req, res) => {
    const type = req.body.type
    const sql = `select * from ev_shoppingCart where userid=? and deal=?`
    db.query(sql, [req.user.id, type], (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length === 0) return res.send({
            status: 1,
            message: '購物車還沒有商品,請進行添加',
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '獲取成功',
            data: results,
        })
    })

}

exports.addshoppingCart = (req, res) => {

    const commodity = req.body
    const commodityId = commodity.commodityId
    var count = commodity.commodityCount
    const name = commodity.name;
    const price = commodity.price;
    const userId = req.user.id; //  要購買的使用者的id 
    const shopId = commodity.shopId;

    const sql2 = `select shopname from ev_shops where id=? `  // 把商店名稱抓出來
    db.query(sql2, shopId, (err, results2) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })

        const shopname = results2[0].shopname

        const sql3 = 'select id,count from ev_shoppingCart where userId=? and commodityId=? and deal = 0' // 看資料庫裡面有沒有一樣的資料
        db.query(sql3, [req.user.id, commodity.commodityId], function (err, results3) {  //有就用update加在一起，沒有就直接Insert

            if (err) return res.send({ status: 1, message: err.message })
            if (results3.length === 0) { // 沒有->insert
                const sql4 = 'insert into ev_shoppingCart set ?'
                db.query(sql4, [{ commodityId, name, price, userId, shopId, shopname, count }], function (err, results4) {
                    if (err) return res.send({ status: 1, message: err.message })
                    res.send({ status: 0, message: '添加成功' })
                })
            }
            else { // 有->count加在一起
                count = results3[0].count + commodity.commodityCount;
                const id = results3[0].id
                const sql5 = 'update ev_shoppingCart set count =? where id=?'
                db.query(sql5, [count, id], function (err, results4) {

                    if (err) return res.send({ status: 1, message: err.message })

                    res.send({ status: 0, message: '更新成功' })
                })

            }

        })


    })


}

exports.deleteShoppingCart = (req, res) => {
    const CommodityInfo = req.body
    const id = CommodityInfo.id
    const sql = `DELETE FROM ev_shoppingCart where id = ?`
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

exports.updateShoppingCartType = (req, res) => {

    const sql = `update ev_shoppingCart set ? where userId=?`
    db.query(sql, [{ deal: 1 }, req.user.id,], (err, results) => {
        // sql執行失敗
        if (err) return res.send({ status: 1, message: err })

        return res.send({ status: 0, message: '修改成功' })
    })
}

exports.updateShoppingCartCount = (req, res) => {
    const CommodityInfo = req.body
    const count = CommodityInfo.count
    const id = CommodityInfo.id


    const sql = `update ev_shoppingCart set ? where id=?`
    db.query(sql, [{ count: count }, id,], (err, results) => {
        // sql執行失敗
        if (err) return res.send({ status: 1, message: err })

        return res.send({ status: 0, message: '修改成功' })
    })
}




/*
exports.addshoppingCart = (req, res) => {

    const commodity = req.body
    const commodityId = commodity.commodityId
    const sql = `select * from ev_commodity where id=?`
    db.query(sql, commodityId, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length === 0) return res.send({
            status: 1,
            message: '商品賣完了,請選擇其他商品',
        })

        const commodityId = results[0].id;
        const name = results[0].name;
        const price = results[0].price;
        const userId = req.user.id;
        const shopId = results[0].shopId;

        const sql2 = `select shopname from ev_shops where id=? `
        db.query(sql2, shopId, (err, results2) => {
            // 執行失敗
            if (err) return res.send({
                status: 1,
                message: err,
            })

            const shopname = results2[0].shopname
            const sql3 = 'insert into ev_shoppingCart set ?'
            db.query(sql3, [{ commodityId, name, price, userId, shopId, shopname }], function (err, results3) {

                if (err) return res.send({ status: 1, message: err.message })

                res.send({ status: 0, message: '添加成功' })

            })
        })

    })

}
*/
