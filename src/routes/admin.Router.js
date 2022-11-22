const express = require("express")
const app = express()
const userController = require('../controller/user.Controller')

app.get('/', userController.getAllUser)

module.exports = app