const express = require("express")
const app = express()
const adminController = require('../controller/admin.Controller')
const ProductController = require('../controller/product.Controller')

app.get('/', adminController.getAdminWelcome)
app.get('/user', adminController.getAllUserByAdmin)
app.get('/brand', adminController.getAllBrandByAdmin)
app.get('/product', ProductController.getAllProduct)

app.post('/product', ProductController.createProduct)
app.put('/product/:id', ProductController.updateProduct)
app.delete('/product/:id', ProductController.deleteProduct)

app.post('/', adminController.createBrand)
app.put('/', adminController.updateBrand)
app.delete('/', adminController.deleteBrand)

app.put('/uploadLogo', adminController.uploadBrandLogo)
app.put('/uploadCover', adminController.uploadBrandCover)

app.put('/:id', adminController.updateBrand)
app.delete('/:id', adminController.deleteBrand)

module.exports = app