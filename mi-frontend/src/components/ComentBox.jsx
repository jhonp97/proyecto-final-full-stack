"use client"

import { useState, useEffect } from "react";

const ComentBox = ({animeId}) => {
    const [reseñas, setReseñas] = useState([]);
    const [comentario, setComentario] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);

    // CAMBIAR ESTO CUANDO HAGA EL BACKEND
    const obtenerReseñas = async()=>{
        try{
            const response = await fetch(`http://localhost:7000/api/reviews/${animeId}`);
            const data = await response.json();
            setReseñas(data)
            // console.log(data)
        }catch(e){
            console.error("Error al obtener las reseñas: ", e)
        }
    };

    useEffect(()=>{
        obtenerReseñas();
    },[animeId])
    
    const EnviarReseña =async()=>{
        try{
            const response = await fetch(`http://localhost:7000/api/reviews`,{
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({animeId, coment: comentario, score: puntuacion})
            });
            if(!response.ok) throw new Error("error con la reseña")
                // para restablecer todo
                setComentario("");
            setPuntuacion(0);
            obtenerReseñas();
        }catch(e){
            console.error("Error al enviar la reseña: ", e)
        }
    }

      return ( 
    <section className=" text-white mt-10">
        <h3 className="text-xl text-center font-semibold mb-4">Reseñas</h3>

        {/* formulario para comentarios */}
        <form className="mt-10 text-white">
            <div>
                {[1,2,3,4,5].map((n)=>(
                    <button key={n} onClick={()=>setPuntuacion(n)}
                    className={`text-xl ${n <= puntuacion ? "text-yellow-400" : "text-gray-300"}`}
                    >⭐
                    </button>
                ))}
            </div>

            <textarea value={comentario} onChange={(e)=>setComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full rounded bg-gray-500 p-2"/>

                <button onClick={EnviarReseña}
                className="bg-cyan-600 px-4 py-1 rounded hover:bg-cyan-800 transition">Publicar</button>
        </form>

        {/* visualizador de las demas reseñas de otros usuarios*/}
        <ul className="">
            {reseñas.map((r, i)=>(
                <li key={i} className="bg-slate-900 p-3 rounded">
                    <div className="flex justify-between mb-1">
                        <span className="font-bold">{r.user?.username || "anomimo"}</span>
                        <span className="text-yellow-400">{"⭐".repeat(r.score)} </span>
                    </div>
                    <p className="text-gray-300">{r.coment}</p>
                </li>
            ))}
        </ul>

    </section> );
}
 
export default ComentBox;