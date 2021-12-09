
const axios = require('axios')
const {Pokemon , Type} = require('../db')
//creamos las funciones modularizadas para cada ruta


const capitalStr = (string) => {
 return  string.charAt(0).toUpperCase() + string.slice(1);
}

const obtenerPokemons = async (req,res, next) =>{

    try {
        //ruta principal .. de aquí traemos 20 pokemons que nos trae la api
        const getApi = await axios.get('https://pokeapi.co/api/v2/pokemon')

        //usamos la propiedad next de la ruta principal para traer los próximos 20 pokemons
        const getApiNext = await axios.get(getApi.data.next)

        
      //unimos los dos llamados en un mismo array
        const bothAPI = [...getApi.data.results, ...getApiNext.data.results]

        //llamamos a la base de datos y pedimos todos los pokemons.... y sus tipos 
        const getDB =  await Pokemon.findAll({include: Type})


        //volvemos a unir los pokemons de la API y los de la base de datos 
        
    
        
        //vamos a juntar a todos los pokemon
        const pokeInfo = []

        for(i=0; i<bothAPI.length ; i++){

            if (!bothAPI[i]) return pokeInfo;

            if (bothAPI[i].url) {

                 await axios.get(bothAPI[i].url)
                                .then(response =>{
                                   pokemon = response
                                })
                                .catch(error=>{
                                  console.log(error)
                                })


                const info = await pokemon.data;
          
                pokeInfo.push({
                  id: info.id,
                  name: capitalStr( info.name),
                  type: info.types.map((t) =>capitalStr( t.type.name)),
                  moves: info.moves.map((m)=>capitalStr( m.move.name)),
                  sprites: info.sprites.other.dream_world.front_default,
                  weight: info.weight,
                  height: info.height,
                  hp: info.stats[0].base_stat,
                  attack: info.stats[1].base_stat,
                  defense: info.stats[2].base_stat,
                  speed: info.stats[5].base_stat,
                  createdInDB: false
                 
                });
              } 

              /*
              else {
                pokeInfo.push({
                  id: totalPokemons[i].id,
                  name:capitalStr (totalPokemons[i].name),
                  type: totalPokemons[i].pokemon_types.map((type)=>capitalStr(type)),
                  moves: totalPokemons[i].moves.map((move)=>capitalStr(move)),
                  sprites: totalPokemons[i].srites,
                  weight: totalPokemons[i].weight,
                  height: totalPokemons[i].height,
                  hp: totalPokemons[i].hp,
                  attack: totalPokemons[i].attack,
                  defense: totalPokemons[i].defense,
                  speed: totalPokemons[i].speed,
                  createdInDB: totalPokemons[i].createdInDB
                  
                });
              }
              */

             
        }
      
        if(!getDB){
          res.send(pokeInfo)
        }else{
          const totalPokemons = [...pokeInfo , ...getDB]
          res.send(totalPokemons)
        }
    
        
    } catch (error) {
        next(error)
    }

//res.send("hola... soyt el get desde del controller!")

  
}


const crearPokemons = async (req ,res , next)=>{

  const {pokemon , tipos} = req.body;
  //aqui hay que hacer mas comprobaciones de como vienen los datos 

  if(pokemon){
      try {
          const crear = await Pokemon.create(pokemon)
          //["asdf4asd455" , "asdf565fg9"]

          tipos.forEach( async t =>{
              let busqueda = await Type.findAll({where : {id:t} })

              if(busqueda){
                  crear.addType(t)
              }
          })

          res.send("ok ! Se creó perfectamente !")
          
      } catch (error) {
          next(error)
      }
  }else{
      res.send("No viene personaje por body !")
  }

//res.send("hola.. soy el post desde el controller!")
}

module.exports ={
    obtenerPokemons,
    crearPokemons
}