const con = require('../../src/export/connection')
class Auth {
    authentication(req, res, next) {
        const token = req.headers['authorization']
        const sql = `SELECT user_id FROM  RefreshToken WHERE accessToken = ?`
        if (token) {
            con.query(sql, token, (err, result) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "you dont connect to database!"
                    })
                }
                if (result.length == 0) {
                    res.json({
                        success: false,
                        msg: "you don't have a access"
                    })
                } else {
                    res.id = result[0].user_id
                    next()
                }
            })
        } else {
            res.json({
                success: false,
                msg: "you dont have logged in yet"
            })
        }
    }

    authenticationRole(req, res, next) {
        const token = req.headers['authorization']
        const id = res.id
        const sql = `SELECT position FROM  User WHERE id = ? `
        con.query(sql, id, (err, result) => {
            if (token == undefined) {
                res.json({
                    success: false,
                    msg: "you dont have logged in yet"
                })
            } else {
                if (result.length == 0 || result[0].position != "admin") {
                    res.json({
                        success: false,
                        msg: "you don't have a access"
                    })
                } else {
                    next()
                }
            }
        })
    }
}


module.exports = new Auth