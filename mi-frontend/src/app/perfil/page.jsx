"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { FiEdit, FiCamera, FiBell } from "react-icons/fi";
import AnimeCards from "@/components/AnimeCards";
import EditarPerfil from "@/components/EditarPerfil";
import Loading from "@/components/Loading";

//  DATOS DE EJEMPLO (usados antes de hacer el back )
// const mockUser = {
//   username: "MiUsuario123",
//   bio: "Amante del shonen y la ciencia ficción.",
//   profilePicture: "/img/logo-eye.png",
// };

// const mockFavoritos = [{
//     mal_id: 1,
//     titles: [
//       { type: "Default", title: "Attack on Titan" },
//       { type: "Synonym", title: "Shingeki no Kyojin" }
//     ],
//     images: {
//       webp: {
//         large_image_url: "/img/shingeki.jpg"}},
//     score: 4.8,
//     genres: [{ name: "Action" }, { name: "Drama" }],
//     synopsis: "La humanidad lucha contra titanes en un mundo postapocalíptico."
//   }];
const perfil = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [activeTab, setActiveTab] = useState("favoritos"); // Estado para controlar la pestaña activa
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      const obtenerDatos = async () => {
        try {
          setLoading(true);
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
          const response = await fetch(`${apiUrl}/auth/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(
              data.msg || "No se puedo cargar los datos del perfil"
            );
          }
          setUser(data.data); //para guardar los datos del usuario
        } catch (e) {
          console.log("error al obtener datos del perfil", e);
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      obtenerDatos();
    } else {
      //si no encuentra token se deja de cargar
      setLoading(false);
    }
  }, [token]);

  const renderContent = () => {
    switch (activeTab) {
      case "favoritos":
        // se verifica que el usuario y la lista estén
        if(!user?.favoritos || user.favoritos.length === 0){
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Animes Favoritos</h2>
            <p className="text-slate-400">Aún no has añadido ningún anime a tus favoritos.</p>
          </div>
        );
      } return(
        <div>
          <h2 className="text-2xl font-bold mb-4">Mis Animes Favoritos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/*uso el map sobre user.favoritos para mostrar el contenido*/}
            {user.favoritos.map((fav) => {
              
              //adapto la estructura para que coincida con la de mi componente AnimeCards
              const cardFavorito = {
                mal_id: fav.animeId,
                titles: [{ type: "Default", title: fav.title }],
                images: { webp: { large_image_url: fav.image } },
                // añado valores por defecto para otras props que el Card pueda necesitar
                score: fav.score, 
                genres: [],
                synopsis: "Haz clic en 'Ver más' para ver los detalles."
              };

              return <AnimeCards key={fav.animeId} anime={cardFavorito} />;
            })}
          </div>
        </div>
      )
      case "privada":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mi Lista Privada</h2>
            <p className="text-slate-400">
              Aquí se mostrarán los animes de lista privada.
            </p>
          </div>
        );
      case "reseñas":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
            <p className="text-slate-400">Aquí se mostrarán las reseñas </p>
          </div>
        );
      case "amigos":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Amigos</h2>
            <p className="text-slate-400">Aquí se mostrará mis amigos.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if(loading){
    return <Loading/>
  }

  if(error){
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

    if (!user && !loading) {
      return <p className="text-center text-yellow-500 mt-10">Inicia sesión para ver tu perfil</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      {/* --- BANNER DEL PERFIL --- */}
      <div className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <Image
            src={user?.fotoPerfil ||"/img/avatar1.png" }
            alt={`Foto de perfil de ${user?.username || "usuario"} `}
            width={128}
            height={128}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700"
          />
          <button className="absolute bottom-1 right-1 bg-cyan-500 p-2 rounded-full hover:bg-cyan-600 transition-colors duration-200">
            <FiCamera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <p className="text-slate-400 mt-1">{user?.bio}</p>
          <button
            className="mt-4 flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-md text-sm hover:bg-slate-600 transition-colors duration-200"
            onClick={() => setEditarPerfil(true)}
          >
            <FiEdit />
            Editar Perfil
          </button>
        </div>
      </div>

      {/* --- PESTAÑAS DE NAVEGACIÓN --- */}
      <div className="flex border-b border-slate-700 mt-8 mb-6">
        <button
          onClick={() => setActiveTab("favoritos")}
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "favoritos"
              ? "border-b-2 border-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Mis Favoritos
        </button>
        <button
          onClick={() => setActiveTab("privada")}
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "privada"
              ? "border-b-2 border-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Mi Lista Privada
        </button>
        <button
          onClick={() => setActiveTab("reseñas")}
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "reseñas"
              ? "border-b-2 border-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Mis Reseñas
        </button>
        <button
          onClick={() => setActiveTab("amigos")}
          className={`relative px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "amigos"
              ? "border-b-2 border-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Amigos
          {/* Notificación de solicitud de amistad */}
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </button>
      </div>

      {/* --- CONTENIDO DE PESTAÑA ACTIVA --- */}
      <div>{renderContent()}</div>

      {editarPerfil && (
        <EditarPerfil user={user} onClose={() => setEditarPerfil(false)} />
      )}
    </section>
  );
};

export default perfil;
