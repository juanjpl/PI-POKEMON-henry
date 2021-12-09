import React, {useState} from "react";
import { useSelector } from "react-redux";
import SingleCard from "./SingleCard";
import Loading from "../Loading/Loading";
import styles from './dogs.module.css'


//escucho y mapeo el estado de los personajes y por cada uno renderizamos una singleCard

export default function AllCards(){

   const allCharacters = useSelector((state) => state.personajes);

   const [page , setPage] = useState(0)
   


   


  const paginate = (pagiChar) => {
    const itemsPerPage = 9
    const numberOfPages = Math.ceil(pagiChar.length / itemsPerPage)
  
    const newDogs = Array.from({ length: numberOfPages }, (_, index) => {
      const start = index * itemsPerPage
      return pagiChar.slice(start, start + itemsPerPage)
    })
  
    return newDogs
  }

      
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > nuevosPerros.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = nuevosPerros.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }

 let nuevosPerros = paginate(allCharacters)
  

  
  if(nuevosPerros.length === 0){

    
      <div  className={styles.contenedorDogs} >
           <h1>no hay personajes </h1>
          
      </div>
     

    

   
  }


    return(
        <div  className={styles.contenedorDogs} >

            { (nuevosPerros.length === 0)?null:
            
                <div className={styles.contenedorPaginador}>
                  <div className={styles.botoneraPaginador} >
                  <button className={styles.prevbtn} onClick={prevPage}>
                      prev
                    </button>
                    {nuevosPerros.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`${index === page ? styles.pagebtn : styles.activebtn }`}
                          onClick={() => handlePage(index)}
                        >
                          {index + 1}
                        </button>
                      )
                    })}
                    <button className={styles.nextbtn } onClick={nextPage}>
                      next
                    </button>
                  </div>
                  
                </div>
           
            }

            {(nuevosPerros.length===0)?null:
          
            nuevosPerros[page].map( (pj , index) =>{

                return(
                    
                        <SingleCard key={index} {...pj}  />
                    
                )
            })
            
        
        }

        </div>
    )
}