const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a51291112',
    database: 'my_db',
})

module.exports = db