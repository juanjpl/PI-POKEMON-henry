//const fetch = require("node-fetch");
const axios = require('axios')
const {Pokemon} = require('../db')
//creamos las funciones modularizadas para cada ruta

const obtenerPokemons = async (req,res, next) =>{

    try {
        //ruta principal .. de aquí traemos 20 pokemons que nos trae la api
        const getApi = await axios.get('https://pokeapi.co/api/v2/pokemon')
        
        //usamos la propiedad next de la ruta principal para traer los próximos 20 pokemons
        const getApiNext = await axios.get(getApi.data.next)

        

        const bothAPI = [...getApi.data.results, ...getApiNext.data.results]

        const getDB =  await Pokemon.findAll()

        const totalPokemons = [...bothAPI, ...getDB]
    
        
        const pokeInfo = []

        for(i=0; i<totalPokemons.length ; i++){

            if (!totalPokemons[i]) return pokeinfo;

            if (totalPokemons[i].url) {

                 await axios.get(totalPokemons[i].url)
                                .then(response =>{
                                   pokemon = response
                                })
                                .catch(error=>{
                                  console.log(error)
                                })


                const info = await pokemon.data;
          
                pokeInfo.push({
                  id: info.id,
                  name: info.name,
                  type: info.types.map((t) => t.type.name),
                  sprites: info.sprites.other.dream_world.front_default,
                  strenght: info.stats[1].base_stat,
                  weight: info.weight,
                  height: info.height,
                  hp: info.stats[0].base_stat,
                  
                  attack: info.stats[1].base_stat,
                  defense: info.stats[2].base_stat,
                  speed: info.stats[5].base_stat
                 
                });
              } else {
                pokeInfo.push({
                  id: base[i].id,
                  idPoke: base[i].idPoke,
                  name: base[i].name,
                  type: base[i].tipos.map((t) => t.name),
                  fuerza: base[i].fuerza,
                  img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
                });
              }
        }
      
        res.send(pokeInfo)
        
    } catch (error) {
        next(error)
    }
//res.send("hola... soyt el get desde del controller!")

  
}


const crearPokemons = async (req ,res , next)=>{

res.send("hola.. soy el post desde el controller!")
}

module.exports ={
    obtenerPokemons,
    crearPokemons
}