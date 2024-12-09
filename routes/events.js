
/*

Rutas de Evento
host + /api/events

*/

//Todos los eventos deben estar validados por JWT
// obtener eventos
const {Router} = require('express');
const { check} = require('express-validator')
const {validarJSWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');

const {crearEvento, refreshEvento, deleteEvento, getEventos} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.get('/',validarJSWT , getEventos)


//crear eventos
router.post('/',[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatoria').custom(isDate),
    check('end', 'la fecha de fin es obligatoria').custom(isDate),
    validarJSWT,    
    validarCampos
    
], crearEvento)

//actualizar eventos
router.put('/:id',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
],
 validarJSWT,
 refreshEvento)

//actualizar eventos
router.delete('/:id',validarJSWT , deleteEvento)


module.exports = router
