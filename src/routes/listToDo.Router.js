const express = require("express")
const app = express()
const listtodoController = require('../controller/listtodo.Controller')

app.get('/', listtodoController.getListById)
app.post('/', listtodoController.creatToDoById)
app.put('/:id', listtodoController.updateToDoById)
app.put('/done/:id', listtodoController.toDoDone)
app.delete('/:id', listtodoController.deleteToDoById)

module.exports = app