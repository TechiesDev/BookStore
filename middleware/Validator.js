
const { body, validationResult } = require('express-validator');

const valid = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();

}

const errorMsg = (msg) => (_value,{req})=> req.__(msg);



const signupValidator = [
    body('role').optional().isIn(['admin', 'user']).withMessage(errorMsg('validator.invalid_role')),
    body('name').notEmpty().escape().withMessage(errorMsg('validator.name_empty')),
    body('email').notEmpty().isEmail().normalizeEmail().escape().trim().withMessage(errorMsg('validator.invld_email')),

    body('phoneNumber').notEmpty().withMessage(errorMsg('validator.phon_num_rqird'))
    .isLength({ min: 10, max: 10 }).withMessage(errorMsg('validator.phon_num_lngth'))
    .matches(/^[0-9]+$/).withMessage(errorMsg('validator.invld_phone_num')),

    body('password').notEmpty().isLength({ min: 6 }).withMessage(errorMsg('validator.short_password')),
    body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/).withMessage("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."),
    valid
]



const loginValidator = [
    body('email').notEmpty().withMessage("Fill email").isEmail().normalizeEmail().escape().trim().withMessage(errorMsg('validator.invld_email')),
    body('password').notEmpty().withMessage("Fill the password").isLength({ min: 6 }).withMessage(errorMsg('validator.short_password')),
    valid
]

const forgetValidator = [
    body('email').notEmpty().withMessage("Fill email").isEmail().normalizeEmail().escape().trim().withMessage(errorMsg('validator.invld_email')),
    valid
]


const resetValidator = [
    body('email').notEmpty().withMessage("Fill email").isEmail().normalizeEmail().escape().trim().withMessage(errorMsg('validator.invld_email')),
    body('password').notEmpty().withMessage("Fill the password").isLength({ min: 6 }).withMessage(errorMsg('validator.short_password')),
    body('otp').notEmpty().withMessage("Fill the otp").isLength({ min: 6 }).withMessage(errorMsg('validator.otp_format')),
    valid
]



module.exports = {signupValidator,loginValidator,forgetValidator,resetValidator}