import React from "react";
//import {useDispatch} from "react-redux"
//import { obtain , obtainEpisode } from "../../redux/actions";

import {Link} from "react-router-dom";
import styles from './landing.module.css'

export default function Landing(){

 

    return(
        <div className={styles.contenedor} >

        <div className={styles.row} >
            <h2 className={styles.titulo } >Meet your Next friend!</h2>
            
            <h3 className={styles.parrafo}  >Use this wanderfull API to search the dog what you are interested. If you can not find him, dont worry ! You can create a new Dog´s breed. Use this wanderfull API to search the dog what you are interested. If you can not find him, dont worry ! You can create a new Dog´s breed.</h3>
            
            <div className={styles.contenedorBotonera} >
            <Link to="/home" className={styles.button} >
                <h3  >Get Started</h3>
            </Link>
          
            </div>
         
        </div>
      
       
    </div>
    )
}