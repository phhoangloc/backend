const express = require("express")
const app = express()
const userController = require('../controller/user.Controller')

app.get('/', userController.getUserById)
app.get('/search', userController.getSearchbyId)
app.get('/getBrand', userController.getAllBrand)
app.post('/updatefile', userController.uploadFileToSetBackground)
app.post('/updatefiletosetavartar', userController.uploadFileToSetAvatar)
app.post('/postsearch/', userController.postSearchFromId)
app.put('/setbackground/', userController.updateBackground)
app.put('/setavartar/', userController.updateAvatar)

module.exports = app