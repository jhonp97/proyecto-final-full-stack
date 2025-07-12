"use client"
// mi componente para el boton de favoritos, el cual añade o quita el anime de la lista de favoritos, enviandolo a un backend y mostrandolo en la pagina de nuestro perfil

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const FavoritoBtn = ({anime})=>{
    const {user, token} = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)


// verifica que el anime si esta en la lista
    useEffect(()=>{
        if(user?.favoritos?.some(fav=> fav.animeId === anime.mal_id)){
            setIsFavorite(true)
        }else{
            setIsFavorite(false)
        }
    },[user, anime.mal_id])

    

    
    // recordar esa ruta para no confundirme despues
    // comentado para probar el funcionamiento del boton mientras hago el backend, descomentar despues
    const toggleFavorito = async ()=>{
        if (!token) {
            alert("Debes iniciar sesión para añadir a favoritos.");
            return;
        }
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        try{
             const res = await fetch(`${apiUrl}/favoritos`,{
                method: "POST",
                headers: {"Content-type": "application/json",
                    "Authorization": `Bearer ${token}`},
                body: JSON.stringify({
                    animeId: anime.mal_id,
                    title: anime.title, 
                    image: anime.images.webp.large_image_url
                }),
             });

             if(!response.ok)throw new Error("error al añadir a favoritos")
            setIsFavorite(true)
                
        } catch(e){
            console.error("Error al aregar a favoritos: ", e)
        }
        // console.log(isFavorite)
    };
    return(
        <button
        onClick={toggleFavorito}
        className="text-pink-700  text-3xl hover:scale-110 transition">
             {isFavorite ? <FaHeart/> : <FaRegHeart/>} 
              {/* {isFavorite ? <FaHeart/> : "selleciona"}  */}
        </button>
    )


};

export default FavoritoBtn;