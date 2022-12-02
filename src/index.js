const userRouter = require('./routes/user.Router')
const auth = require('./auth/Auth')
const authUser = require('./routes/authUser.Router')
const adminRouter = require('./routes/admin.Router')
const listtodo = require('./routes/listToDo.Router')


const route = (app) => {


    app.get('/', (req, res) => {
        fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.send("home connect " + fullUrl)
    })

    app.use('/', userRouter)

    app.use('/user', auth.authentication, authUser)

    app.use('/listtodo', auth.authentication, listtodo)

    app.use('/myshop', auth.authentication, auth.authenticationRole, adminRouter)
}
module.exports = route