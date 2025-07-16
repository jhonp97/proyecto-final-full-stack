"use client";

// este componente muestra y permite agregar reseñas (comentarios + puntuación) para un anime, conecto con el backend para obtener y guardar los comentarios y las puntuaciones de cada usuario, con estrellas interactivas y también muestra reseñas que otros usuarios ya dejaron.

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import BtnPaginacion from "@/components/BtnPaginacion.jsx";
import Link from "next/link";
import Image from "next/image";

const ComentBox = ({ animeId }) => {
  const { user, token } = useAuth();
  const [reseñas, setReseñas] = useState([]);
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [editando, setEditando] = useState(null);

  const reseñasPorPagina = 3;

  const totalPaginas = Math.ceil(reseñas.length / reseñasPorPagina);
  const reseñasMostradas = reseñas.slice(
    (pagina - 1) * reseñasPorPagina,
    pagina * reseñasPorPagina
  );

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const rutaBackend = apiUrl.replace("/api/v1", ""); //remuevo para obtener la ruta del back
  // url para la imagen si se sube, si no usa la que es por defecto
  const fotoPerfilSrc = user?.fotoPerfil?.startsWith("/uploads") // aqui uso startsWith para verificar que la ruta empieza con /uploads
    ? `${rutaBackend}${user.fotoPerfil}` : user?.fotoPerfil || "/img/avatar1.png";

  const obtenerReseñas = async () => {
    try {
      const response = await fetch(`${apiUrl}/reviews/${animeId}`);

      if (!response.ok) throw new Error("No se pudieron cargar las reseñas.");

      const data = await response.json();
      setReseñas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error al obtener las reseñas: ", e);
      setReseñas([]); // si hay error limpio el estado
    }
  };

  useEffect(() => {
    // al cargar el componente obtengo las reseñas
    if (animeId) {
      obtenerReseñas();
    }
  }, [animeId]); // cuando cambia el animeId vuelvo a obtener las reseñas

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Debes iniciar sesión para dejar una reseña.");
    if (comentario.trim() === "" || puntuacion === 0)
      return alert("Debes añadir un comentario y una puntuación.");

    const ruta = editando
      ? `${apiUrl}/reviews/${editando._id}`
      : `${apiUrl}/reviews`;
    const metodo = editando ? "PUT" : "POST";

    try {
      const response = await fetch(ruta, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          animeId: animeId,
          comment: comentario,
          rating: puntuacion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al guardar la reseña");
      }

      //limpio el formlario y vuelvo a cargar las reseñas
      setComentario("");
      setPuntuacion(0);
      setEditando(null);
      obtenerReseñas();
    } catch (e) {
      console.error("Error al enviar la reseña:", e);
      alert(e.message);
    }
  };

  const handleEditar = (reseña) => {
    setEditando(reseña);
    setComentario(reseña.comment);
    setPuntuacion(reseña.rating);
  };

  const handleEliminar = async (reviewId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta reseña?"))
      return;

    try {
      const response = await fetch(`${apiUrl}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("No se pudo eliminar la reseña.");

      obtenerReseñas(); //recargo las reseñas
    } catch (e) {
      console.error("Error al eliminar la reseña:", e);
    }
  };
  return (
    <section className="text-white mt-2">
      <h3 className="text-xl text-center font-semibold mb-4">Reseñas de la Comunidad</h3>

      {/*solo se muestra el formulario si el usuario está logueado */}
      {user ? (
        <form className="mt-10" onSubmit={handleSubmit}>
          <h4 className="font-semibold mb-2">{editando ? 'Editando tu reseña' : 'Deja tu reseña'}</h4>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} onClick={() => setPuntuacion(n)} className={`text-2xl cursor-pointer ${n <= puntuacion ? "text-yellow-400" : "text-gray-400"}`}>★</span>
            ))}
          </div>
          <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Escribe tu comentario..." className="w-full rounded bg-slate-700 p-3 mb-4 text-white" />
          <div className="flex gap-2">
            <button type="submit" className="bg-cyan-600 px-4 py-1 rounded hover:bg-cyan-700 transition">
              {editando ? 'Actualizar' : 'Publicar'}
            </button>
            {editando && (
              <button type="button" onClick={() => { setEditando(null); setComentario(''); setPuntuacion(0); }} className="bg-slate-600 px-4 py-1 rounded hover:bg-slate-700 transition">
                Cancelar
              </button>
            )}
          </div>
        </form>
      ) : (
        <p className="text-center text-slate-400 mt-6">
          <Link href="/login" className="text-cyan-400 hover:underline">Inicia sesión</Link> para dejar tu propia reseña.
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {reseñasMostradas.length > 0 ? reseñasMostradas.map((r) => (
          <li key={r._id} className="bg-slate-900 p-4 rounded-lg flex flex-col items-center sm:flex-row gap-4">

            <div className="flex  items-start justify-start  mb-2">

              <Image src={fotoPerfilSrc || '/img/avatar1.png'} width={35} height={35} alt={r.user?.username} className="w-12 h-12 rounded-full object-cover mr-2" />

              <div className="flex flex-col  items-start">
                <span className="font-bold mb-0">{r.user?.username || "Anónimo"}</span>
                
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < r.rating ? "text-yellow-400" : "text-gray-500"}`}>★</span>
                  ))}
                </span>
              </div>
            </div>
            <p className="text-gray-300 pl-10 sm:pl-10 sm:border-l-2">{r.comment}</p>
            {/* 4. muestro botones solo si el usuario logueado es el autor */}
            {user && user.id === r.user?._id && (
              <div className="flex gap-4 mt-2 pl-10">
                <button onClick={() => handleEditar(r)} className="text-xs text-yellow-400 hover:underline">Editar</button>
                <button onClick={() => handleEliminar(r._id)} className="text-xs text-red-500 hover:underline">Eliminar</button>
              </div>
            )}
          </li>
        )) : (
          <p className="text-slate-500 text-center py-4">Sé el primero en dejar una reseña para este anime.</p>
        )}
      </ul>

      {reseñas.length > reseñasPorPagina && (
        <BtnPaginacion paginaActual={pagina} totalPaginas={totalPaginas} cambiarPagina={setPagina} />
      )}
    </section>
  );
};

export default ComentBox;