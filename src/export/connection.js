const mysql = require('mysql')

const conn = mysql.createPool({
    database: "MyApp",
    host: "localhost",
    user: "root",
    password: ""
});

module.exports = conn
