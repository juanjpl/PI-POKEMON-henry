import React  from "react"
//import styles from './favorite.module.css'

import {  useSelector } from "react-redux";

import CardFav from "../CardFav/CardFav"
import Loading from "../Loading/Loading"
export default function Favorite(){

    const favoritos = useSelector((state) => state.favorites);

   





return(
    <div>
        {
             favoritos.length === 0   ?

             <Loading/>
            
            :

            favoritos.map((fav,index)=>{
                return(
                    <CardFav key={index}  {...fav}/>
                )
            })
           
        }



    </div>
)
 

  
       
    
   
}