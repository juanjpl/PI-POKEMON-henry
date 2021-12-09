
const axios = require('axios')
const {Pokemon , Type} = require('../db')
//creamos las funciones modularizadas para cada ruta


//funcion para guardarlas con letra capital
const capitalStr = (string) => {
 return  string.charAt(0).toUpperCase() + string.slice(1);
}

const obtenerPokemonsters = async (req,res, next) =>{

  //const name = req.query.name;
  
  const name = req.query.name;

    try {

      

        //ruta principal .. de aquí traemos 20 pokemons que nos trae la api
        const getApi = await axios.get('https://pokeapi.co/api/v2/pokemon')

        //usamos la propiedad next de la ruta principal para traer los próximos 20 pokemons
        const getApiNext = await axios.get(getApi.data.next)

        
      //unimos los dos llamados en un mismo array
        const bothAPI = [...getApi.data.results, ...getApiNext.data.results]

        //llamamos a la base de datos y pedimos todos los pokemons.... y sus tipos 
        const getDB =  await Pokemon.findAll({include: Type})
       
    
        
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



             
        }
      
        const totalPokemons =[]


        if(!getDB){
          res.send(pokeInfo)
        }else {
          
          totalPokemons.push( ...pokeInfo , ...getDB )
         
        }

        
        const pokeName = []
        if(name){

         pokeName.push(totalPokemons.filter( el => el.name.toLowerCase().includes(name.toLowerCase())))
        
          pokeName.length?
          res.status(200).send(pokeName) :
          res.status(404).send([])

          }else{

          res.status(200).send(totalPokemons)
         }


         


        
    } catch (error) {
        next(error)
    }


  
}


//ultima ruta para traer id por params ...
const buscarPokemon = async (req , res , next)=>{

  //traigo el id por params.....
 // const {id} = req.params;
 const id = req.params.id;
 const pokemonTotal = await obtenerPokemonsters();

 if(id){
     let pokemonId = await pokemonTotal.filter( el => el.id == id);
     pokemonId.length ?
     res.status(200).json(pokemonId):
     res.status(404).send('Character not found ! ')
 }

}

const borrarPokemon = async (req, res, next) =>{

  const {id} = req.params;

  Pokemon.destroy({where: {id}})
  .then(() => {
    return res.send({deleteStatus: "dog successfully removed"})
  })
  .catch(err => {
    res.send({deleteStatus: err});
    next(err);
  })
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
    
    crearPokemons,
    buscarPokemon,
    borrarPokemon,
    obtenerPokemonsters
}