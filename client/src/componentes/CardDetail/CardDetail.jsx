import styles from './card.module.css'


export default function CardDetail({id , name , image,origin, species,gender,location,episode, createdInDB}){



    return(
        <div className={styles.contenedorCard}>

{
                
                (typeof(id) === "number")
                ?
                <h2 className={styles.dogApi} >API Character</h2>
                :
                <h2 className={styles.dogDb} >DB Character</h2>
            }
            
            <h1 className={styles.nombre} >{name} </h1>
            <img src={image} alt={name} className={styles.imagen} />
            <h1 className={styles.description} >Origen:  {origin} </h1>
            <h1 className={styles.description}>species: {species} </h1>
            <h1 className={styles.description}>Genero: {gender} </h1>
           
            {
                    (!createdInDB)?
                        <h2 className={styles.description}>Locación: {location} </h2>
                    :
                    null
                }
          

          

        

{
                    (!createdInDB)?
                  <div>
                           <label  className={styles.description}>Episodios:</label>
                    <select  name="episodios" >
                    <option  >Lista de Episodios </option>
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
    )
}