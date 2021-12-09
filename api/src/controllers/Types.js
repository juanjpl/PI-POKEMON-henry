
const {Type} = require('../db')


//creamos las funciones modularizadas para cada ruta

const obtenerTypes = async (req,res,next) =>{

    try {
        const busqueda = await Type.findAll()

        if(busqueda){
            res.send(busqueda)
        }
        else{
            res.json({message: "error"})
        }
        
    } catch (error) {
        next(error)
    }
    

  
}

//opcional !! con esta funcion ...traemos los episodios desde esta ruta 
//y los creamos ..
//no los precargamos desde el inde ...


const episodiosApiCrear = async (req,res,next)=>{

    const verificacion = await Type.findAll()

    if(verificacion.length < 1){
  
            const pedido = await axios.get('https://pokeapi.co/api/v2/type')
          const formateo = pedido.data.results?.map(type =>{
            return{
            
              name:type.name,
              url:type.url
            }
          })
  
          //console.log(formateo)
          //para cada ocupacion ... entra en el modelo y busca .. si encuentra no hace nada .. si no.. lo  crea 

            formateo.forEach(type =>{
                Type.findOrCreate({
                    where:{name: type}
                })
            })
          
          
           console.log("se cargaron los episodios exitosamente!")
        }




    const allTypes= await Type.findAll();

    res.send(allTypes)
}


module.exports ={
    obtenerTypes
}