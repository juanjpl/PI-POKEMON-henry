import React from "react";
import { useDispatch } from "react-redux";
import { orderByName , especie } from "../../redux/actions";


export default function Order(){

    const dispatch = useDispatch()



  

    function handleSort(e){

        console.log("Envío action...")
        console.log(e.target.value)

        dispatch(orderByName(e.target.value))
        
    }

    
    function handleChange(e){

        console.log("Envío action...")
        console.log(e.target.value)

        dispatch(especie(e.target.value))
      
        
    }


    return(
        <div>
            <div>
                <select onChange={handleSort} >
                    <option value="all">Todos</option>
                    <option value="A">A a la Z</option>
                    <option value="Z">Z a la A</option>
                </select>
            </div>

            <div>
                <select onChange={handleChange} >
                    <option value="all">Todos</option>
                    <option value="Alien"> Alien</option>
                    <option value="Unknown"> Unknown</option>
                    
                </select>
            </div>

            <div>
                <select onChange={handleChange} >
                    <option value="all">Todos</option>
                    <option value="Created"> DB</option>
                    <option value="Api">API</option>
                    
                </select>
            </div>
           
        </div>
    )
}