"use client"
// mi componente para el boton de favoritos, el cual añade o quita el anime de la lista de favoritos, enviandolo a un backend y mostrandolo en la pagina de nuestro perfil

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const FavoritoBtn = ({ anime }) => {
    const { user, token, updateData } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)


    // verifica que el anime si esta en la lista
    useEffect(() => {
        if (user?.favoritos?.some(fav => fav.animeId === anime.mal_id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [user, anime.mal_id])




    const toggleFavorito = async () => {
        if (!token) {
            alert("Debes iniciar sesión para añadir a favoritos."); //mensaje de que debe estar registardo para agregar a fav
            return;
        }

        const titulo = anime.titles?.find(t => t.type === "Default")?.title || anime.title;
        const imageUrl = anime.images?.webp?.large_image_url;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

        // aqui depende de que si el esatdo actual es true (si ya esta en favoritos) se elimina al hacer click (DELETE), y si no, lo agrego con POST
        const metodo = isFavorite ? "DELETE" : "POST";

        const ruta = isFavorite ? `${apiUrl}/favoritos/${anime.mal_id}`//quito el anime
            : `${apiUrl}/favoritos`// lo agrego
        try {
            const res = await fetch(ruta, {
                method: metodo,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: metodo === "POST" ? JSON.stringify({
                    animeId: anime.mal_id,
                    title: titulo,
                    image: imageUrl
                }) : null,
            });

            if (!res.ok) {
                throw new Error(`error al ${isFavorite ? 'eliminar' : 'añadir'} el favorito`)
            }
            setIsFavorite(prev => !prev) // actualizo el estado del boton
            // actualizar los datos del usuario
            if (updateData) {
                updateData()
            }

        } catch (e) {
            console.error("Error al agregar a favoritos: ", e)
        }
        // console.log(isFavorite)
    };
    useEffect(() => {
        updateData?.(); //si está definido, se ejecuta
    }, []);

    return (
        <button
            onClick={toggleFavorito}
            className="text-pink-700  text-3xl hover:scale-110 transition">
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {/* {isFavorite ? <FaHeart/> : "selleciona"}  */}
        </button>
    )


};

export default FavoritoBtn;