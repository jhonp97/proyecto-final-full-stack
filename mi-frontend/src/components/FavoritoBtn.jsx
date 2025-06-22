"use client"
// mi componente para el boton de favoritos, el cual añade o quita el anime de la lista de favoritos, enviandolo a un backend y mostrandolo en la pagina de nuestro perfil

import { useState, useEffect } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const FavoritoBtn = ({animeId})=>{
    const [isFavorite, setIsFavorite] = useState(false)


    // probando, esto cambiarlo para poner la llamada al backend
    useEffect(()=>{
        // poner el get aqui para los favoritos
        setIsFavorite(false)
    },[animeId])


    // recordar esa ruta para no confundirme despues
    const toggleFavorito = async ()=>{
        try{
            const res = await fetch(`http://localhost:7000/api/favoritos`,{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({animeId}),
            });
            const data = await res.json();
            setIsFavorite(data.isFavorite);
        } catch(e){
            console.error("Error al aregar a favoritos: ", e)
        }
    };
    return(
        <button
        onClick={toggleFavorito}
        className="text-pink-700 text-3xl hover:scale-110 transition">
            {isFavorite ? <FaHeart/> : <FaRegHeart/>}
        </button>
    )


}

export default FavoritoBtn;