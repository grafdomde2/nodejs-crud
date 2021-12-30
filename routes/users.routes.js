const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../controllers/users.controller");
const { check, validationResult } = require('express-validator');
const jwtauthuser = require('../middleware/jwtauthuser');

router.post("/", [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .trim()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('Minimum 6 characters required!')
        .bail(),
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }else{
        next();
    }
    
}, UserCtrl.apiCreateUser);

//User Login
router.post("/login", [
    check("email")
        .trim()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage("invalid email address")
        .normalizeEmail(),
    check("password")
        .exists()
        .withMessage("Password cannot be blank")
], (req, res, next) => {

    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        next();
    }
}, UserCtrl.apiUserLogin);

//Get logedin user detail
router.get("/user-detail", jwtauthuser, UserCtrl.apiGetUserById);
module.exports = router;