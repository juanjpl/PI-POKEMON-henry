import React,{useState , useEffect} from "react";
import {useDispatch , useSelector} from "react-redux";
import {obtainEpisode} from "../../redux/actions/index"
import { useNavigate } from "react-router-dom";
import styles from './addDog.module.css'
import axios from "axios";



export default function Form(){


    const dispatch = useDispatch()
    const estadoEp = useSelector(state => state.episodios)

    const navigate = useNavigate()

    console.log("Episodios desde Form")
    console.log(estadoEp)

    const [personaje, setPersonaje] = useState({
        name:"",
        species:"",
        origin:"",
        gender:[],
        image:"",
        episodios:[]
    })



    const handleChange=(e)=>{
        e.preventDefault()

        if(e.target.name === "gender"){
            setPersonaje({
                ...personaje,
                gender:[...personaje.gender, e.target.value]
            })
        }

        setPersonaje({
            ...personaje,
            [e.target.name] : e.target.value
        })
    }

    const handleSelect= (e) =>{
        e.preventDefault()

           setPersonaje({
            ...personaje,
            episodios: [...personaje.episodios , e.target.value]
        })
    }

    const handleSelectGender= (e) =>{
        e.preventDefault()


        setPersonaje({
            ...personaje,
            gender: [...personaje.gender , e.target.value]
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log("Personaje enviado !")
        console.log(personaje)
        await axios.post("http://localhost:3001/characters" , personaje);


        setPersonaje({
            name:"",
            species:"",
            origin:"",
            gender:[],
            image:"",
            episodios:[]
        })

        alert("El personaje se creó correctamente!")

        navigate("/home")
        
    }

    useEffect(()=>{
        dispatch(obtainEpisode())
    },[dispatch])

    return(
        <div  className={styles.contenedorHenry} >
            
            <form onSubmit ={handleSubmit} className={styles.formulario}  >

                <label className={styles.labels} htmlFor="" >Nombre:</label>
                <input required className={styles.input} type="text" name="name" value={personaje.name} onChange={handleChange} />

                <label className={styles.labels} htmlFor="">Especie:</label>
                <input required className={styles.input} type="text" name="species" value={personaje.species} onChange={handleChange} />

                <label className={styles.labels} htmlFor="">Origen:</label>
                <input required className={styles.input} type="text" name="origin" value={personaje.origin} onChange={handleChange} />

                <label className={styles.labels} htmlFor="">Imagen:</label>
                <input required className={styles.input} type="text" name="image" value={personaje.image} onChange={handleChange} />

                <label className={styles.labels} htmlFor="">Genero:</label>

               <select required className={styles.input}  name="gender" onChange={handleSelectGender} >

                    <option value="" >Seleccione un genero</option>
                   <option value="Fem" name="Fem"  >Fem</option>
                   <option value="Male" name="Male"   >Male</option>
                   <option value="Otro" name="Otro" >Otro</option>

               </select>

                <label className={styles.labels} htmlFor="">Episodios:</label>
                <select required className={styles.input}  name="episodios" onChange={handleSelect} >
                    {estadoEp?.map((ep,index)=>{
                        return(
                            <option name={ep.name} key={index} value={ep.id} >{ep.name} </option>
                        )
                    })}
                </select>

                <button type="submit">CREAR</button>

              

            </form>
        </div>
    )
}