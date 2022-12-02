
const con = require('../export/connection')

class adminController {

    getAdminWelcome(req, res) {
        res.json({
            success: true,
            msg: "welcome! Admin",
        })
    }

    getAllUserByAdmin(req, res) {
        const sql = `Select * From User`
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    success: true,
                    msg: "your query is success!",
                    data: result
                })
            }
        })
    }

    getAllBrandByAdmin(req, res) {
        const orderby = req.query.orderby
        const limit = req.query.limit
        const brand = req.query.brand
        const id = req.query.id
        const over = req.query.over
        const sql = `Select * From Brand
        ${brand ? `WHERE brand = ` + brand : ``}
        ${id ? `WHERE id = ` + id : ``}
        ${orderby ? `order by ` + orderby + ` DESC` : ``}
        ${limit ? `limit ` + (over ? over + `,` : ``) + limit : ``
            }
        `
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    success: true,
                    msg: "your query is success!",
                    data: result
                })
            }
        })
    }

    createBrand(req, res) {
        const body = {
            brand: req.body.brand,
            logo: req.body.logo,
            cover: req.body.cover,
        }
        const sql = `insert into Brand set ? `

        con.query(sql, body, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    success: true,
                    msg: body.brand + " are created"
                })
            }
        })
    }

    updateBrand(req, res) {
        const body = req.body
        const id = req.params.id;
        const sql = `update Brand set ? where id = '${id}' `

        con.query(sql, body, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    success: true,
                    id: id,
                    msg: body.brand + " are updated"
                })
            }
        })
    }

    deleteBrand(req, res) {
        const id = req.params.id
        const sql = `delete from Brand where id = ${id}`
        con.query(sql, (err) => {
            if (err) { console.log(err) } else {
                res.json({
                    success: true,
                    msg: "your brand are deleted "
                })

            }
        })
    }

    uploadBrandLogo(req, res) {
        const uploadFile = req.files.file;
        const namefile = uploadFile.name

        uploadFile.mv(`public//brandlogo//${namefile}`, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            } else {
                res.json({
                    success: true,
                    msg: "upload success!",
                    data: namefile
                })
            }
        })
    }
    uploadBrandCover(req, res) {
        const uploadFile = req.files.file;
        const namefile = uploadFile.name

        uploadFile.mv(`public//brandcover//${namefile}`, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            } else {
                res.json({
                    success: true,
                    msg: "upload success!",
                    data: namefile
                })
            }
        })
    }

}

module.exports = new adminController;