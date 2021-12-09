import React , { useEffect} from  'react';
import {useSelector} from 'react-redux';
import styles from './home.module.css'
import {useDispatch} from "react-redux"
import { obtain , obtainEpisode } from "../../redux/actions";

//importamos la action de traer personajes 
//import {orderByName , especie } from '../../redux/actions';


import AllCards from '../Cards/AllCards'
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';




export default function Home(){

    const allCharacters = useSelector((state) => state.personajes);


    const dispatch = useDispatch()
    
    useEffect(()=>{
  
        dispatch(obtain())
        dispatch(obtainEpisode())
       
    
      },[dispatch])



if(allCharacters.length === 0){

   


    return(
        <div className={styles.contenedorHome} >
            <SearchBar/>
           <h1>NO HAY PERSONAJES</h1>       
        </div>
       

    )
}
  

    return (

        



        <div className={styles.contenedorHome} >

            
            <SearchBar/>
            <AllCards/>
        </div>
    )

   
}