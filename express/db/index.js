const mysql = require('mysql')

// const db = mysql.createPool({
//     host: 'localhost',
//     port: 3306,
//     user: 'lauuai5244',
//     password: 'Aa51291112',
//     database: 'my_db',
// })

const db = mysql.createPool({
    host: 'mysqltest1234.mysql.database.azure.com',
    port: 3306,
    user: 'lauuai5244',
    password: 'Aa51291112',
    database: 'my_db',
})
module.exports = db