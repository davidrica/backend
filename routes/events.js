/*
    rutas de usuarios auth
    host + /api/events
*/
const Route = require('express');
const { getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const route = Route()

//publicas son las rutas arriba de route.use(midelware)
//prividas son las rutas debajo de route.use(midelware)
route.use(validarJWT)

route.get('/', getEventos);

route.post('/',
    [
        check('title','El titulo es obligatorio. Mayor a 4 caracteres').not().isEmpty().isLength({min:4}),
        check('start','Fecha de inicio es obligatoria').custom(isDate) ,//custom llama a callback o funcion
        check('end','Fecha de finalizacion es obligatoria').custom(isDate) ,//custom llama a callback o funcion
        validarCampos
    ],
    crearEvento)

route.put('/:id',
    [
        check('title','El titulo es obligatorio. Mayor a 4 caracteres').not().isEmpty().isLength({min:4}),
        check('start','Fecha de inicio es obligatoria').custom(isDate) ,//custom llama a callback o funcion
        check('end','Fecha de finalizacion es obligatoria').custom(isDate) ,//custom llama a callback o funcion
        validarCampos
    ],
    actualizarEvento)

route.delete('/:id',eliminarEvento)


module.exports = route;