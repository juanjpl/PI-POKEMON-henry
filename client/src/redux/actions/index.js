import axios from "axios";

export const OBTENER_PERSONAJE = "Obtener personaje";
export const OBTENER_EPISODES = "Obtener episodios";
export const BUSCAR_PERSONAJE = "Buscar personaje";
export const BORRAR_PERSONAJE = "Borrar personaje";
export const BUSCAR_UNO ="Buscar uno";


export const GET_NAME_CHARACTERS = "Obtener personaje por searchbar"


export const SAVE_FAVORITE = "Guardar en favoritos"
export const BORRAR_FAVORITO ="Borrar favorito"


export const ORDER_BY_NAME ="orderByName"
export const ESPECIE ="especie"

const URL_GET_CHARACTERS="http://localhost:3001/characters"
const URL_GET_EPISODES="http://localhost:3001/episodes"





export function obtain(){

    //pedido a nuestro servidor con axios 
    return async function(dispatch){

       let pedido = await  axios.get(URL_GET_CHARACTERS)
        console.log(pedido)

        dispatch({
            
            type:OBTENER_PERSONAJE,
            payload:pedido.data
        })
    }

    //pedido a nuestro servidor con axios

  
}

//FRONT --- axios --- perdir ---> nuestro BACKEND-->apiR&M y la DB
//lo envia todo al Front


//DISPATCH ---- ACTIONS + INFO ---- REDUCER -----> ESTADO DE REDUX
//componente cards <<---------------------------------------// el estado avisa al componente

export function borrarFavorito(payload){
    console.log("borro de  favorito a ...")
    return{
        type: BORRAR_FAVORITO,
        payload
    }
}

export function saveFavorite(payload){
    console.log("guardo en favorito a ...")
    return{
        type: SAVE_FAVORITE,
        payload: payload
    }
}


export function obtainOne(id){
    console.log("Busco personaje por ID")
    return{
        type: BUSCAR_UNO,
        payload: id
    }
}

export function obtainEpisode(){
    console.log("Traigo episodios")

    return async function(dispatch){
        let pedido =await axios.get(URL_GET_EPISODES)
        console.log("episodios")
        console.log(pedido)
        dispatch({
            type: OBTENER_EPISODES,
            payload: pedido.data
        })
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function especie(valor){
    console.log("Filtro especies por ...")
    console.log(valor)
    //no es necesario enviar nada, ya que solo enviamos la orden
    return{
        type:ESPECIE,
        payload:valor
    }
}

export function getNameCharacters(name){
    console.log("El nombre de la searchbar es .... " + name)
    return async function( dispatch){
        try{
            var json = await axios.get("http://localhost:3001/characters?name=" + name);
            console.log(json.data)
            
            return dispatch({
                type:GET_NAME_CHARACTERS,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export  function deleteCharacter(id){
console.log("El id traido para borrar es ..." + id)

return async function( dispatch){
    //console.log(payload)
   
    const response = await axios.delete(`http://localhost:3001/characters/${id}`);

    
    //console.log(response)
    
    return response;
}



}