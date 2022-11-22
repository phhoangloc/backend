const { body, validationResult } = require('express-validator');

const validationCondition = [
    body('username', 'username does not Empty').not().isEmpty(),
    body('username', 'username more than 6 degits').isLength({ min: 6 }),
    body('username', 'username more than 6 degits').isLength({ max: 12 }),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'username more than 6 degits').isLength({ min: 8 }),
    body('email', 'email does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail()
]
const validationLoginCondition = [
    body('username', 'username does not Empty').not().isEmpty(),
    body('username', 'username more than 6 degits').isLength({ min: 6 }),
    body('username', 'username more than 6 degits').isLength({ max: 12 }),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'username more than 6 degits').isLength({ min: 8 }),
]

const validationResendEmailCondition = [
    body('email', 'email does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail()
]
const validationPasswordCondition = [
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'username more than 6 degits').isLength({ min: 8 }),
]

const validationFunction = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({
            success: false,
            msg: errors.array()[0].msg
        });
    } else {
        next()
    }
}

const validation = {
    validationCondition,
    validationLoginCondition,
    validationResendEmailCondition,
    validationPasswordCondition,
    validationFunction
}

module.exports = validation;