const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const con = require('../export/connection')
const transporter = require('../export/transporter')

class userController {

    getListById(req, res) {
        const id = res.id;
        const sql = `select id, todolist as TODO, finish as done, finish_date as date
        from todolist where user_id=?`
        con.query(sql, id, (err, result) => {
            if (err) { console.log(err) } else {
                res.send(result)
            }
        })
    }

    creatToDoById(req, res) {
        const id = res.id;
        const body = {
            todolist: req.body.todolist,
            user_id: id,
        }
        const sql = `insert into todolist set ? `
        con.query(sql, [body, id], (err) => {
            if (err) { console.log(err) } else {
                res.send("insert successful!")
            }
        })
    }

    updateToDoById(req, res) {
        const id = req.params.id
        const body = {
            todolist: req.body.todolist,
        }
        const sql = `update todolist set ? where id = ${id}`
        con.query(sql, body, (err) => {
            if (err) { console.log(err) } else {
                res.send("update successful!")

            }
        })
    }

    deleteToDoById(req, res) {
        const id = req.params.id
        const sql = `delete from todolist where id = ${id}`
        con.query(sql, (err) => {
            if (err) { console.log(err) } else {
                res.send("delete successful!")

            }
        })
    }
}

module.exports = new userController;