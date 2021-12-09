import React, { useState} from "react";
import {Link} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import styles from './dog.module.css'
import { saveFavorite } from "../../redux/actions";



export default function SingleCard({id , name , image,origin, species,gender,location,episode, createdInDB}){

    const allFavoritos = useSelector((state) => state.favorites);
    //console.log(allFavoritos)

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const [personaje , setPersonaje] = useState({
        id:id,
        name: name,
        image: (image).toString(),
        
    })

    
    //console.log(personaje)

    //console.log("personaje desde single card!")

    const handleFavorite=()=>{
        console.log ("quiero guardar un personaje")
        //console.log(personaje)

        let persona ={
            id,
            name,
            image
        }

        //console.log(persona)
        dispatch(saveFavorite(persona))
        alert("Guardé en favoritos el personaje correctamente")
        navigate('/favorite')

    }

    return(
        <div  className={styles.contenedorCard}>
            <div>
                <div className={styles.cartel}>
                {
                
                (typeof(id) === "number")
                ?
                <h2 className={styles.dogApi} >API DOG</h2>
                :
                <h2 className={styles.dogDb} >DB DOG</h2>
                }

                <button className={styles.buttonE} onClick={handleFavorite} >Fav</button>

                </div>
               
                <h4 className={styles.texto}>id: {id} </h4>
                <Link to={`/character/${id}`} key={id} className={styles.nombre} >{name} </Link>

                <img src={image} alt={name} className={styles.imagen} />

                <h4 className={styles.texto}>Especie: {species} </h4>
                <h4 className={styles.texto}>Origen: {origin} </h4>
                <h4 className={styles.texto}>Genero: {gender} </h4>
             

                {
                    (!createdInDB)?
                        <h2 className={styles.texto}>Locación: {location} </h2>
                    :
                    null
                }

                {
                    (!createdInDB)?
                  <div>
                           <label className={styles.texto}>Episodios:</label>
                    <select name="episodios" >
                    <option >Lista de Episodios </option>
                        {episode?.map((ep,index)=>{
                            return(
                                <option name={ep} key={index} value={index} >Episodio  {index+1} </option>
                            )
                        })}
                    </select>
                  </div>

               
                    :
                    null
                }


                
               
            </div>
        </div>
    )
}