import { OBTENER_PERSONAJE ,  OBTENER_EPISODES,  ESPECIE,  GET_NAME_CHARACTERS ,ORDER_BY_NAME, BORRAR_PERSONAJE, SAVE_FAVORITE, BORRAR_FAVORITO } from "../actions"


//estado inicial

const initialState ={
    todos:[],
    personajes:[],
    episodios:[],
    favorites:[],
    save:[]
}


export default function rootReducer(state=initialState , action){
  

    switch(action.type){

        case OBTENER_PERSONAJE:
            console.log("Llego el payload.characters !")

        return{
            ...state,
            personajes: action.payload ,  //arreglo de personajes 
            todos: action.payload
        }

        
        case OBTENER_EPISODES:
            
        console.log("Llego el payload.episodes !")
        console.log(action.payload)
        return{
            ...state,
            episodios: action.payload  //arreglo de episodios
        }

        case ORDER_BY_NAME:
            let copyState = [...state.personajes ];

            let sortedArr = action.payload === 'A' ?
                copyState.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase() ){
                        return 1
                    }
                    if(b.name.toLowerCase()  > a.name.toLowerCase() ){
                        return -1
                    }
                    return 0
                }):
                copyState.sort(function(a,b){
                    if(a.name.toLowerCase()  >b.name.toLowerCase() ){
                        return-1
                    }
                    if(b.name.toLowerCase()  > a.name.toLowerCase() ){
                        return 1
                    }
                    return 0
                })
            return{
                ...state,
                personajes : sortedArr
            }

        case    ESPECIE:

        //esto es filtro anidado ... aprender bien .... // agregar a todos los select ALL... asi se puede resetear...


            if(action.payload === "all"){
                return{
                    ...state,
                    personajes: state.todos
                }
            }else if(action.payload === "Unknown"){
                return{
                    ...state,
                    personajes:state.personajes.filter(pj => pj.origin === "unknown")
                }
            }
            else if(action.payload === "Alien"){
                return{
                    ...state,
                    personajes: state.personajes.filter(pj => pj.species === "Alien")
                }
            } else if(action.payload === "Created"){
                return{
                    ...state,
                    personajes: state.personajes.filter(pj => pj.createdInDB === true)
                }
            } else if(action.payload === "Api"){
                return{
                    ...state,
                    personajes: state.personajes.filter(pj => pj.createdInDB !== true)
                }
            }
            else{
                console.log("No hago nada ! con los filtros")
                return
            }
      
            case GET_NAME_CHARACTERS:
                
                return{
                    ...state,
                    personajes: action.payload
                }
            
                case BORRAR_PERSONAJE:
                
                    return{
                        ...state
                    }
       
                    case SAVE_FAVORITE:
                    console.log("llega el personaje para guardar")
                    console.log(action.payload)
                        return{
                            ...state,
                            favorites:[...state.favorites,action.payload]
                        }

            /*
               case  REMOVE_TODO:
            //action = {type: REMOVE_TODO , index:3}
            return{
                ...state,
                todo:state.todo.filter((t,index)=>index !== action.index)
            }
            case  REMOVE_TODO:
                //alternativo cuando el add tiene id
                return{
                    ...state,
                    todo:state.todo.filter((t)=>t.id!== action.index)
                }
            */

                        case BORRAR_FAVORITO:
                            console.log("llega el personaje para borrar de favoritos")
                            console.log(action.payload)

                            let filtro = state.favorites.filter(f=> f.id !== action.payload)
                            console.log("estado filtrado " + filtro)
                            return{
                                ...state,
                                favorites:filtro
                            }

                 
        default: return state
    }
}