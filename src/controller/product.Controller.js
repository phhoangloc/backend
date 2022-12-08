const con = require('../export/connection')
class ProductController {
    getAllProduct(req, res, next) {
        const slug = req.query.slug
        const sql = `select * from Product
        ${slug ? `where slug = '${slug}'` : ""}

        `

        con.query(sql, (err, result) => {
            if (err) {
                res.json(
                    {
                        success: false,
                        msg: err.message
                    }
                )
            } else {
                res.json(
                    {
                        success: true,
                        msg: "your query is success",
                        data: result
                    }
                )
            }
        })
    }



    createProduct(req, res) {
        const sql = `insert into Product set ?`
        const body = req.body
        con.query(sql, body, (err, result) => {
            if (err) {
                res.json(
                    {
                        success: false,
                        msg: err.message
                    }
                )
            } else {
                res.json(
                    {
                        success: true,
                        msg: "your product is created!"
                    }
                )
            }
        })
    }
    updateProduct(req, res) {

        const id = req.params.id
        const body = req.body
        const sql = `update Product set ? where id = ${id}`
        con.query(sql, body, (err, result) => {
            if (err) {
                res.json(
                    {
                        success: false,
                        msg: err.message
                    }
                )
            } else {
                res.json(
                    {
                        success: true,
                        msg: "your product is update!"
                    }
                )
            }
        })
    }
    deleteProduct(req, res) {
        const sql = `delete from Product where id = ?`
        const id = req.params.id
        con.query(sql, id, (err, result) => {
            if (err) {
                res.json(
                    {
                        success: false,
                        msg: err.message
                    }
                )
            } else {
                res.json(
                    {
                        success: true,
                        msg: "your product is deleted!"
                    }
                )
            }
        })
    }
}
module.exports = new ProductController;