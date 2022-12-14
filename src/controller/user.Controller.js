const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const con = require('../export/connection')
const transporter = require('../export/transporter')

class userController {
    createUser(req, res, next) {
        const salt = bcryptjs.genSaltSync(10);
        const mahoa_password = bcryptjs.hashSync(req.body.password.toString(), salt);
        const body = {
            username: req.body.username,
            password: mahoa_password,
            email: req.body.email,
        }


        const sql = `INSERT INTO User SET ?;`

        con.query(sql, body, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                req.email = req.body.email;
                next();
            }
        })
    }
    //for resend email to ative user
    inputEmailToActiveAccount(req, res, next) {
        req.email = req.body.email
        next()
    }

    getToken(req, res, next) {
        const token = uuid.v1().toString()
        const sqltoken = `INSERT INTO RefreshToken  (token,user_id) VALUE ("${token}",(SELECT id from User where email="${req.email}"))`
        con.query(sqltoken, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                req.token = token
                next()
            }
        })
    }

    //for resend email to ative user
    getTokenbyEmail(req, res, next) {
        const email = req.email
        const sql = `SELECT token FROM RefreshToken WHERE user_id = (SELECT id from User where email= ?) `
        con.query(sql, email, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                if (result) {
                    req.token = result[0].token
                    next()
                } else {
                    res.send("Email is not existed")
                }
            }
        })
    }

    sendMail(req, res) {
        const mainOptions = {
            from: 'ph.hoangloc.mailtest@gmail.com',
            to: req.email,
            subject: 'Active User',
            html: `
            <p style="text-align:center">Ch??o b???n, b???n c?? m???t email ????? x??c nh???n k??ch ho???t t??i kho???n<p>
            <p style="text-align:center">B???n h??y click v??o <a style="font-weight:bold;color:green" href=http://localhost:4000/active?token=${req.token}>????y</a> ????? k??ch ho???t t??i kho???n<p>`
        }

        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.send('L???i g???i mail: ' + err.message);
            } else {
                res.send(`M???t email ???? ???????c g???i ?????n mail c???a b???n, ki???m tra email ????? active account`);
            }
        });
    }

    activeUser(req, res) {
        const token = req.query.token
        const sql = `UPDATE User SET active = "yes" WHERE id =(SELECT user_id FROM RefreshToken WHERE token = ?  )`
        con.query(sql, token, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            }
            else {
                res.send('Your account is active');
            }
        })
    }

    isExistById(req, res, next) {
        const username = req.body.username;
        const sql = `SELECT id FROM User Where username=?`
        con.query(sql, username, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                if (result.length) {
                    req.username = req.body.username;
                    next()
                } else {
                    res.json({
                        success: false,
                        msg: "username is not correct"
                    });
                }
            }
        })
    }

    logIn(req, res, next) {
        const username = req.username
        const password = req.body.password.toString()
        const sql = `SELECT id,password,active FROM User Where username=?`
        con.query(sql, username, (err, result) => {
            const isPasswordValid = bcryptjs.compareSync(password, result[0].password);
            if (result[0].active == "no") {
                res.json({
                    success: false,
                    msg: "your account is not actived"
                });
            } else {
                if (isPasswordValid) {
                    res.id = result[0].id;
                    next()
                }
                else {
                    res.json({
                        success: false,
                        msg: "password is not correct"
                    })
                }
            }
        })
    }

    getTokenbyId(req, res, next) {
        const id = res.id
        const sql = `SELECT token FROM RefreshToken WHERE user_id = ? `
        con.query(sql, id, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.token = result[0].token
                next()
            }
        })
    }
    getAccessTokentoUser(req, res) {

        const accesstoken = uuid.v1().toString()

        const sql = ` update RefreshToken set accessToken = '${accesstoken}' where token= '${res.token}'`
        con.query(sql, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    id: res.id,
                    token: accesstoken
                })
            }
        })
    }
    getUserById(req, res) {
        const sql = "Select * From User where id = ?"
        const id = res.id
        con.query(sql, id, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.send({
                    success: true,
                    msg: "get user success!",
                    data: result
                })
            }
        })
    }
    sendMailToResetPassword(req, res) {
        const mainOptions = {
            from: 'ph.hoangloc.mailtest@gmail.com',
            to: req.email,
            subject: 'Reset Password',
            html: `
            <p style="text-align:center">Ch??o b???n, b???n c?? m???t email ????? thay ?????i password<p>
            <p style="text-align:center">B???n h??y click v??o <a style="font-weight:bold;color:green" href=http://localhost:3000/resetpassword?${req.token}>????y</a> ????? thay ?????i password<p>`
        }

        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.send('L???i g???i mail: ' + err);
            } else {
                res.send(`M???t email ???? ???????c g???i ?????n mail c???a b???n, ki???m tra email ????? reset password`);
            }
        });
    }
    resetPassword(req, res) {
        const token = req.query.token;
        const salt = bcryptjs.genSaltSync(10);
        const mahoa_password = bcryptjs.hashSync(req.body.password.toString(), salt);
        const password = mahoa_password;
        const sql = `UPDATE User SET password = "${password}" WHERE id = (SELECT user_id FROM RefreshToken WHERE token = "${token}"  )`
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.send("Your Password has been Updated")
            }
        })
    }
    uploadFileToSetBackground(req, res) {
        const uploadFile = req.files.file;
        const namefile = uploadFile.name

        uploadFile.mv(`public//background//${namefile}`, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            } else {
                res.send(namefile)
            }
        })
    }
    uploadFileToSetAvatar(req, res) {
        const uploadFile = req.files.file;
        const namefile = uploadFile.name

        uploadFile.mv(`public//avatar//${namefile}`, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            } else {
                res.send(namefile)
            }
        })
    }
    updateBackground(req, res) {
        const background = req.body.background;
        const id = res.id;
        const sql = `UPDATE user
        SET background = ?
        WHERE id= ?`

        con.query(sql, [background, id], (err) => {
            if (err) { console.log }
        })
    }
    updateAvatar(req, res) {
        const avatar = req.body.avatar;
        const id = res.id;
        const sql = `UPDATE user
        SET avatar = ?
        WHERE id= ?`

        con.query(sql, [avatar, id], (err) => {
            if (err) { console.log }
        })
    }
    getSearchbyId(req, res) {
        const id = res.id
        const sql = `SELECT keysearch, COUNT(user_id) AS "times"
        FROM search
        where user_id = ?
        GROUP BY keysearch
        ORDER BY times DESC

        LIMIT 5`

        con.query(sql, id, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.send(result)
            }
        })
    }
    postSearchFromId(req, res) {
        const id = res.id
        const keysearch = req.body.keysearch
        const sql = `INSERT INTO search (keysearch,user_id)
        value('${keysearch}',${id})`

        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            }
            else {
                res.send("insert success")
            }
        })
    }
    getAllBrand(req, res) {
        const orderby = req.query.orderby
        const limit = req.query.limit
        const brand = req.query.brand
        const sql = `Select * From Brand
        ${brand ? `WHERE brand = ` + brand : ``}
        ${orderby ? `order by ` + orderby + ` DESC` : ``}
        ${limit ? `limit ` + limit : ``}
        `
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.send(result)
            }
        })
    }
    sendMailtoCheckMagazine(req, res) {
        const mainOptions = {
            from: 'ph.hoangloc.emailtest@gmail.com',
            to: req.body.email,
            subject: 'ASTEM MAGAZINE',
            html: req.body.html
        }

        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.send('L???i g???i mail: ' + err);
            } else {
                res.send(`M???t email ???? ???????c g???i ?????n mail c???a b???n`);
            }
        });
    }
}

module.exports = new userController;