"use client"

// este componente muestra y permite agregar reseñas (comentarios + puntuación) para un anime, conecto con el backend para obtener y guardar los comentarios y las puntuaciones de cada usuario, con estrellas interactivas y también muestra reseñas que otros usuarios ya dejaron.


import { useState, useEffect } from "react";
import BtnPaginacion from "@/components/BtnPaginacion.jsx";



const ComentBox = ({ animeId }) => {
    const [reseñas, setReseñas] = useState([]);
    const [comentario, setComentario] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [pagina, setPagina] = useState(1);
    const reseñasPorPagina = 3;

    const totalPaginas = Math.ceil(reseñas.length / reseñasPorPagina);
    const reseñasMostradas = reseñas.slice((pagina - 1) * reseñasPorPagina, pagina * reseñasPorPagina);



    // CAMBIAR ESTO CUANDO HAGA EL BACKEND
    const obtenerReseñas = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

            const response = await fetch(`${apiUrl}/reviews/${animeId}`);
            const data = await response.json();
            if (response.ok) { // reviso que la respuesta sea correcta

                if(Array.isArray(data.data)){
                    setReseñas(data.data);
                    // console.log("reseñas obtenidas: ", data.data)
                }else{
                    setReseñas([])// si no es un array lo pongo vacio
                }
            }else{
                console.error("Error al obtener reseñas: ", data.msg );
                setReseñas([]); // si hay error limpio el estado
            }
        } catch (e) {
            console.error("Error al obtener las reseñas: ", e)
            setReseñas([]); // si hay error limpio el estado
        }
    };

    useEffect(() => { // al cargar el componente obtengo las reseñas
        obtenerReseñas();
    }, [animeId]) // cuando cambia el animeId vuelvo a obtener las reseñas

    const EnviarReseña = async () => {
        try {
            const response = await fetch(`http://localhost:7000/api/reviews`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ animeId, coment: comentario, score: puntuacion })
            });
            if (!response.ok) throw new Error("error con la reseña")
            // para restablecer todo
            setComentario("");
            setPuntuacion(0);
            obtenerReseñas();
            setPagina(1);

        } catch (e) {
            console.error("Error al enviar la reseña: ", e)
        }
    }

    return (
        <section className=" text-white mt-2">
            <h3 className="text-xl text-center font-semibold mb-4">Reseñas</h3>

            {/* formulario para comentarios */}
            <form className="mt-10 text-white" onSubmit={(e) => { e.preventDefault(); EnviarReseña(); }}>
                {/* estrellas interactivas */}
                <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <span
                            key={n}
                            onClick={() => setPuntuacion(n)}
                            onMouseEnter={() => setPuntuacion(n)}
                            onMouseLeave={() => setPuntuacion(puntuacion)}
                            className={`text-2xl cursor-pointer transition-colors duration-200 ${n <= puntuacion ? "text-yellow-400" : "text-gray-400"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="w-full rounded bg-gray-700 p-3 mb-4 text-white"
                />

                <button
                    type="button"
                    onClick={EnviarReseña}
                    className="bg-cyan-600 px-4 py-1 rounded hover:bg-cyan-800 transition"
                >
                    Publicar
                </button>

            </form>


            {/* visualizador de las demas reseñas de otros usuarios*/}
            <ul className="mt-5 space-y-4">
                {/* ejemplo fijo con 5 estrellas */}


                {reseñasMostradas.map((r, i) => (
                    <li key={i} className="bg-slate-900 p-3 rounded">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold">{r.user?.username || "anónimo"}</span>
                            <span>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <span key={n} className={`text-lg ${n <= r.score ? "text-yellow-400" : "text-gray-500"}`}>
                                        ★
                                    </span>
                                ))}
                            </span>
                        </div>
                        <p className="text-gray-300">{r.coment}</p>
                    </li>

                ))}
                

            </ul>
            {reseñas.length > reseñasPorPagina && (
                <BtnPaginacion
                
                    paginaActual={pagina}
                    totalPaginas={totalPaginas}
                    cambiarPagina={setPagina}
                />
            )}

        </section>);
}

export default ComentBox;