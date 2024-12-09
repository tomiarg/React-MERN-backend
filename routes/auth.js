/*

Rutas de Usuario / Auth
host + /api/auth

*/


const {Router} = require('express');
const {check} = require("express-validator")
const {validarCampos} = require("../middlewares/validar-campos")
const router = Router();



const {createUser, loginUser, revalidToken} =require('../controllers/auth');
const { validarJSWT } = require('../middlewares/validar-jwt');

router.post('/new',
    [
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es oblgiatorio').isEmail(),
        check('password', 'el password debe tener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    createUser)

router.post('/',
    [   
        check('email', 'el email es oblgiatorio').isEmail(),
        check('password', 'el password debe tener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
     loginUser)

router.get('/renew',validarJSWT, revalidToken)

module.exports = router;