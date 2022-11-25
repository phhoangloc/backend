const express = require("express")
const app = express()
const userController = require('../controller/user.Controller')
const validation = require('../validation/validattion')

app.get('/active', userController.activeUser)
app.post('/create',
    validation.validationCondition,
    validation.validationFunction,
    userController.createUser,
    userController.getToken,
    userController.sendMail
)
app.post('/login',
    validation.validationLoginCondition,
    validation.validationFunction,
    userController.isExistById,
    userController.logIn,
    userController.getTokenbyId,
    userController.getAccessTokentoUser
)
app.post('/resendemailtoactiveaccount',
    validation.validationResendEmailCondition,
    validation.validationFunction,
    userController.inputEmailToActiveAccount,
    userController.getTokenbyEmail,
    userController.sendMail
)
app.post('/resendemailtoresetpassword',
    validation.validationResendEmailCondition,
    validation.validationFunction,
    userController.inputEmailToActiveAccount,
    userController.getTokenbyEmail,
    userController.sendMailToResetPassword
)
app.post('/reset',
    validation.validationPasswordCondition,
    validation.validationFunction,
    userController.resetPassword
)


module.exports = app