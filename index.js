const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser")
const cors = require('cors');
const fileUpload = require('express-fileupload')
const route = require('./src')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.use(fileUpload())

app.use(bodyParser.json())

route(app)

app.listen(port, (err) => {
    console.log("Connect with port :" + port)
})