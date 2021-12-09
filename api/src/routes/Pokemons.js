const express = require("express")

const router = express.Router()


//importamos las funciones del controlador 
const {obtenerPokemons , crearPokemons, buscarPokemon , borrarPokemon } = require('../controllers/Pokemons')



//ruta para traer los pokemons
router.get('/', obtenerPokemons);

//ruta para buscar pokemons por i ---- > uso de params 
router.get('/:id' , buscarPokemon );

//ruta para agregar pokemons  por formulario...
router.post('/', crearPokemons);

//ruta para borrar pokemons
router.delete('/:id' , borrarPokemon );

//filtros por back 

router.get("/order/:dato" , async(req,res)=>{

    const {dato} = req.params;  //human, alien,

    if(dato){
        const actividad = await Character.findAll({
            where:{
                species: dato
            },
        });

        return res.status(200).json(actividad);
    }

    res.status(404).json({error: "Dabe seleccionar una temporada!"})

    /*
    opcional filtro
    router.get("/order/:population/" , async (req, res)=>{
        const{population} =req.params;

        try{
            if(population === "DESC"){
                const desc = await Country.findAndCountAll({
                    order:[["population" , "DESC"]]
                })
            }
        }
    } )

    */

})
module.exports = router;