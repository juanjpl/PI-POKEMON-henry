const express = require("express")

const router = express.Router()


//importamos las funciones del controlador 
const {obtenerTypes} = require('../controllers/Types')




router.get('/', obtenerTypes)



module.exports = router;