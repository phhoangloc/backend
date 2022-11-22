const con = require('../../src/export/connection')
class Auth {
    authentication(req, res, next) {
        const token = req.headers['authorization']
        const sql = `SELECT user_id FROM  RefreshToken WHERE token = ? `
        con.query(sql, token, (err, result) => {
            if (err) { console.log(err) } else {
                if (result.length == 0) {
                    res.send("you don't have a access")
                } else {
                    res.id = result[0].user_id
                    next()
                }
            }
        })
    }

    authenticationRole(req, res, next) {
        const id = res.id
        const sql = `SELECT position FROM  User WHERE id = ? `
        con.query(sql, id, (err, result) => {
            if (err) { console.log(err) } else {
                if (result.length == 0 || result[0].position != "admin") {
                    res.send("you don't have a access")
                } else {
                    next()
                }
            }
        })
    }
}


module.exports = new Auth