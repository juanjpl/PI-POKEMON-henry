const express = require("express")

const router = express.Router()


//importamos las funciones del controlador 
const {obtenerTypes} = require('../controllers/Types')




router.get('/', (req,res,next)=>{
    res.send("hola desde el get de type!")
})



module.exports = router;