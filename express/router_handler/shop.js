const db = require('../db/index')
const config = require('../config')

exports.getShop = (req, res) => {
    const sql = `select * from ev_shops where userid=?`
    db.query(sql, req.user.id, (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        // 得到的數據數量不是1
        if (results.length === 0) return res.send({
            status: 1,
            message: '用戶還沒有商店,請進行申請',
        })
        //  成功並return 信息
        res.send({
            status: 0,
            message: '獲取成功',
            data: results,
        })
    })

}

exports.getAllShop = (req, res) => {

    const start = (req.body.page - 1) * 10

    const sql = `select * from ev_shops limit ?,? ` //  查詢從第0筆資料開始到第0+10筆資料
    db.query(sql, [start, start + 5], (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        //console.log(results)
        //results.count = 
        const sql2 = `select COUNT(*) as many from ev_shops `
        db.query(sql2, (err, results2) => {
            // results2[0]["count(*)"]  way1
            // select count(*) as many from ev_shops -> results2[0].many way2
            var count = results2[0].many
            const data2 = { count: results2[0].many }
            if (err) return res.send({
                status: 1,
                message: err,
            })

            //  成功並return 信息
            res.send({
                status: 0,
                message: '獲取成功',
                data: results,
                data2
            })
        })
    })

}

exports.getAllShopByCity = (req, res) => {

    const start = (req.body.page - 1) * 10
    const city = req.body.city
    const sql = `select * from ev_shops where city = ? limit ?,? ` //  查詢從第0筆資料開始到第0+10筆資料
    db.query(sql, [city, start, start + 5], (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })

        //results.count = 
        const sql2 = `select COUNT(*) as many from ev_shops where city = ?`
        db.query(sql2, city, (err, results2) => {
            // results2[0]["count(*)"]  way1
            // select count(*) as many from ev_shops -> results2[0].many way2
            var count = results2[0].many
            const data2 = { count: results2[0].many }
            if (err) return res.send({
                status: 1,
                message: err,
            })

            //  成功並return 信息
            res.send({
                status: 0,
                message: '獲取成功',
                data: results,
                data2
            })
        })
    })

}

exports.updateShop = (req, res) => {
    const shopInfo = req.body

    if (typeof shopInfo.shopname != 'string' || typeof shopInfo.type != 'string')
        return res.send({ status: 1, message: '名稱或類別資料型別錯誤！' })
    if (typeof shopInfo.date != 'string' || typeof shopInfo.address != 'string')
        return res.send({ status: 1, message: '日期或地址資料型別錯誤！' })
    if (typeof shopInfo.area != 'string' || typeof shopInfo.phone != 'string')
        return res.send({ status: 1, message: '地區或電話號碼資料型別錯誤！' })
    if (typeof shopInfo.star != 'number' || typeof shopInfo.popular != 'number')
        return res.send({ status: 1, message: '星數或評價資料型別錯誤！' })
    if (typeof shopInfo.city != 'string' || typeof shopInfo.phone != 'string')
        return res.send({ status: 1, message: '城市資料型別錯誤！' })

    const sql = `update ev_shops set ? where userId=?`
    db.query(sql, [req.body, req.user.id], (err, results) => {
        // sql執行失敗
        if (err) return res.send({ status: 1, message: err })
        // sql執行成功,影響行數不為1
        if (results.affectedRows !== 1) return res.send({ status: 1, message: '修改失敗' })
        return res.send({ status: 0, message: '修改成功' })
    })
}

exports.creatShop = (req, res) => {
    const shopInfo = req.body
    if (typeof shopInfo.shopname == '')
        return res.send({ status: 1, message: '名稱不能為空！' })

    if (typeof shopInfo.shopname != 'string' || typeof shopInfo.type != 'string')
        return res.send({ status: 1, message: '名稱或類別資料型別錯誤！' })
    if (typeof shopInfo.date != 'string' || typeof shopInfo.address != 'string')
        return res.send({ status: 1, message: '日期或地址資料型別錯誤！' })
    if (typeof shopInfo.area != 'string' || typeof shopInfo.phone != 'string')
        return res.send({ status: 1, message: '地區或電話號碼資料型別錯誤！' })
    if (typeof shopInfo.star != 'number' || typeof shopInfo.popular != 'number')
        return res.send({ status: 1, message: '星數或評價資料型別錯誤！' })
    if (typeof shopInfo.city != 'string' || typeof shopInfo.phone != 'string')
        return res.send({ status: 1, message: '城市資料型別錯誤！' })
    const sql = `select id from ev_shops where shopname=?`
    db.query(sql, [shopInfo.shopname, req.user.id], function (err, results) {
        if (err)
            return res.send({ status: 1, message: err.message })
        if (results.length > 0)
            return res.send({ status: 1, message: '商店名已經被佔用' })


        const sql3 = `select id from ev_shops where userId=?`
        db.query(sql3, [req.user.id], function (err, results) {
            if (err)
                return res.send({ status: 1, message: err.message })
            if (results.length > 0)
                return res.send({ status: 1, message: '用戶已經註冊商店了' })


            const sql2 = 'insert into ev_shops set ?'
            db.query(sql2, [req.body, req.body.userId = req.user.id], function (err, results) {

                if (err) return res.send({ status: 1, message: err.message })

                if (results.affectedRows !== 1)
                    return res.send({ status: 1, message: '註冊商店失敗,請稍後再試' })

                res.send({ status: 0, message: '申請成功' })

            })
        })
    })
}

exports.getAllShopByType = (req, res) => {

    const start = (req.body.page - 1) * 10
    const type = req.body.type
    const sql = `select * from ev_shops where type = ? limit ?,? ` //  查詢從第0筆資料開始到第0+10筆資料
    db.query(sql, [type, start, start + 5], (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        console.log(results)
        //results.count = 
        const sql2 = `select COUNT(*) as many from ev_shops where type = ?`
        db.query(sql2, type, (err, results2) => {
            // results2[0]["count(*)"]  way1
            // select count(*) as many from ev_shops -> results2[0].many way2
            var count = results2[0].many
            const data2 = { count: results2[0].many }
            if (err) return res.send({
                status: 1,
                message: err,
            })
            console.log(count)
            //  成功並return 信息
            res.send({
                status: 0,
                message: '獲取成功',
                data: results,
                data2
            })
        })
    })

}

exports.getAllShopBySearch = (req, res) => {

    const start = (req.body.page - 1) * 10
    const name = req.body.name
    var shopname = "%" + name + "%";
    const sql = `select * from ev_shops where shopname like ? limit ?,? ` //  查詢從第0筆資料開始到第0+10筆資料
    db.query(sql, [shopname, start, start + 5], (err, results) => {
        // 執行失敗
        if (err) return res.send({
            status: 1,
            message: err,
        })
        console.log(results)
        //results.count = 
        const sql2 = `select COUNT(*) as many from ev_shops where shopname like ?`
        db.query(sql2, shopname, (err, results2) => {
            // results2[0]["count(*)"]  way1
            // select count(*) as many from ev_shops -> results2[0].many way2
            var count = results2[0].many
            const data2 = { count: results2[0].many }
            if (err) return res.send({
                status: 1,
                message: err,
            })
            console.log(count)
            //  成功並return 信息
            res.send({
                status: 0,
                message: '獲取成功',
                data: results,
                data2
            })
        })
    })

}






