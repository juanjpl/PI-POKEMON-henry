import React , {useEffect, useState} from "react";
//import {Link} from "react-router-dom";
import axios from 'axios'
import {useParams} from 'react-router'
import { useDispatch , useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import { deleteCharacter } from '../../redux/actions/index';
import CardDetail from '../CardDetail/CardDetail'
import Loading from "../Loading/Loading"
import styles from './dogCard.module.css'

import { saveFavorite } from "../../redux/actions";

export default function Detail(){

   const allEpisodios = useSelector((state) => state.episodios);

    
   const [personaje , setPersonaje] = useState()

  
  

    let dispatch = useDispatch()

    let {id} = useParams()

    const navigate = useNavigate();

  
  



    console.log(personaje)

    console.log("personaje desde single card!")

    const handleFavorite=()=>{
        console.log ("quiero guardar un personaje")

        dispatch(saveFavorite(personaje))
        alert("Guardé en favoritos el personaje correctamente")
        navigate('/favorite')

    }

    function handleDelete(e){

        e.preventDefault()
        const id = personaje.id
        console.log(id)
 

        dispatch(deleteCharacter(id))

        //alert("Dog Created!")
        navigate('/home')
        
    }

  

    const handleSave=async (e)=>{

        e.preventDefault()
        
        //console.log(allEpisodios)
        
        console.log("hola... quiero guardar el personaje")
        //console.log(personaje.episode)

        const arreglo = allEpisodios.filter(ep=> personaje.episode.includes(ep.url))
        const arregloId = arreglo.map(a=> a.id)

        //console.log(arreglo);
        

        
        

        /*
        allEpisodes
        people = [
                    {id: "1", name: "abc", gender: "m", age:"15" },
                    {id: "2", name: "a", gender: "m", age:"25" },
                    {id: "3", name: "efg", gender: "f", age:"5" },
                    {id: "4", name: "hjk", gender: "m", age:"35" },
                    {id: "5", name: "ikly", gender: "m", age:"41" },
                    {id: "6", name: "ert", gender: "f", age:" 30" },
                    {id: "7", name: "qwe", gender: "f", age:" 31" },
                    {id: "8", name: "bdd", gender: "m", age:" 78" },
                ]
        
        
        id_filter = [1,4,5,8]

        people.filter(person => id_filter.includes(person.id))

        result = people.filter((o) => id_filter.includes(+o.id) && o.gender == "m");

        const filtered_people = people.filter((person) => id_filter.includes(person.id)

        for(person in people) {
            for(id in id_filter) {
                if(person[id] == id && person[gender] == "m"){

                }
            }
        }

        */
    
        

        let personajeSave={
            name: personaje.name,
            species: personaje.species,
            origin:personaje.origin,
            gender: [personaje.gender],
            image: personaje.image,
            episodios: arregloId,
           
            
            //location: "Earth (Replacement Dimension)"
            
            
           
        }


        console.log(personajeSave)
        
        
        console.log("Personaje enviado !")
        await axios.post("http://localhost:3001/characters" , personajeSave);

        alert("Personaje Guardado Correctamente !")
        navigate('/')
        
        
    }


    useEffect(()=>{

        axios.get(`http://localhost:3001/characters/${id}`)
        .then((response)=>{
            setPersonaje(response.data[0])
        })
        .catch(error => console.log(error) )

     
        
    },[id])


    console.log("episodios desde details")
    console.log(allEpisodios)

    return(
        <div className={styles.contenedor}>
    {
                personaje
                ?
                <div   className={styles.contenedorCard} >
                   
                    <CardDetail {...personaje} />

               

                    <div className={styles.contenerodBotonera} > 

                      
                      {
                
                (personaje.createdInDB)
                ?
                <div>
                    <button className={styles.buttonM} onClick={handleFavorite}>FAVORITO</button>
                    <button className={styles.buttonE} onClick={handleDelete} >MODIFICAR</button>
                    <button className={styles.buttonE} onClick={handleDelete} >ELIMINAR</button>
                </div>
              
                :
                <div>
                    <button className={styles.buttonM} onClick={handleFavorite} >FAVORITO</button>
                    <button className={styles.buttonE} onClick={handleSave} >GUARDAR</button>
                    
                </div>
               
            }
                     
                       
                    </div>
                 


                </div>
                  
                :
                <Loading/>
            }        </div>
    )
}