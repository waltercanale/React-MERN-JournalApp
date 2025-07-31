/*
Events Routes
/api/events
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { 
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento } = require('../controllers/events')
    
const router = Router()

//Todas las peticiones tiene que pasar por jwt, de esta manera no hay que usarlo en cada router.accion(), todos los router que esten debajo de esta linea, si estuviera en la linea por ej 25 solo aplicaria el middleware en put y delete
router.use( validarJWT )

//obtener eventos
router.get('/', getEventos);

//crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento)

//Actualizar Eventos
router.put('/:id', actualizarEvento)

//Eliminar Evento
router.delete('/:id', eliminarEvento)

module.exports = router