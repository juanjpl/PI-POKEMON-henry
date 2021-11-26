const express = require("express")

const router = express.Router()


//importamos las funciones del controlador 
const {obtenerPokemons , crearPokemons} = require('../controllers/Pokemons')




router.get('/', obtenerPokemons)

router.post('/', crearPokemons)


module.exports = router;