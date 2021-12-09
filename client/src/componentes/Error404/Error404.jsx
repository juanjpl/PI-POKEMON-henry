import styles from './error404.module.css'

export default function Error404(){


    return(
        <div className={styles.contenedorHenry} >
         
            <div className={styles.contenedorTextoHenry}>
                <h1 className={styles.titulo}>La ruta no existe ! </h1>
                <h1 className={styles.titulo}>poner boton volver a inicio ! </h1>
            </div>
        </div>
    )
}