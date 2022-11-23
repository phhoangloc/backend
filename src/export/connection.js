const mysql = require('mysql')

const conn = mysql.createPool({
    database: "MyApp",
    host: "localhost",
    user: "root",
    password: "root"
});

module.exports = conn
