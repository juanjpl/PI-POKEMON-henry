import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import styles from './cardfav.module.css'
import { borrarFavorito } from "../../redux/actions";



export default function CardFav({id , name , image,createdInDB}){

   
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const [personaje , setPersonaje] = useState({
        id:id,
        name: name,
        image: image,
        createdInDB:createdInDB
    })

    //console.log("personaje desde single card!")

    const handleFavorite=(e)=>{
        e.preventDefault()

        console.log ("quiero borrar el favorito id " + personaje.id)

        dispatch(borrarFavorito(personaje.id))
        
        alert("borré en favoritos el personaje correctamente")
        navigate('/home')
        
    }



 
    return(
        <div  className={styles.contenedorCard}>
            <div>
                <div className={styles.cartel}>
                {
                
                (typeof(personaje.id) === "number")
                ?
                <h2 className={styles.dogApi} >API Character</h2>
                :
                <h2 className={styles.dogDb} >DB Character</h2>
                }

                

                </div>
               

                <Link to={`/character/${id}`} key={id} className={styles.nombre} >{personaje.name} </Link>

                <img src={personaje.image} alt={name} className={styles.imagen} />

                <button className={styles.buttonE} onClick={handleFavorite} >x</button>
               
            </div>
        </div>
    )
}