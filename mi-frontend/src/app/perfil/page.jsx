"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEdit, FiCamera, FiBell } from "react-icons/fi";
import AnimeCards from "@/components/AnimeCards";
import EditarPerfil from "@/components/EditarPerfil";
import Loading from "@/components/Loading";
import Link from "next/link";
import MisReseñasCard from "@/components/MisReseñas";

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
  // const [favoritos, setFavoritos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [activeTab, setActiveTab] = useState("favoritos"); // Estado para controlar la pestaña activa
  // const [error, setError] = useState(null);
  const [datosAmigos, setDatosAmigos] = useState({
    amigos: [],
    solicitudes: [],
  });

  const { user, token, loading, error } = useAuth();
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const rutaBackend = apiUrl.replace("/api/v1", ""); //remuevo para obtener la ruta del back
  // url para la imagen si se sube, si no usa la que es por defecto
  const fotoPerfilSrc = user?.fotoPerfil?.startsWith("/uploads") // aqui uso startsWith para verificar que la ruta empieza con /uploads
    ? `${rutaBackend}${user.fotoPerfil}`
    : user?.fotoPerfil || "/img/avatar1.png";

  //useEffect para cargar los datos de amigos cuando la pestaña esté activa
  useEffect(() => {
    const fetchDatosAmigos = async () => {
      if (activeTab === "amigos" && token) {
        try {
          const response = await fetch(`${apiUrl}/friends/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setDatosAmigos(data);
            console.log(`mis datos de amigos son ${datosAmigos}`);
          }
        } catch (err) {
          console.error("Error al cargar datos de amigos:", err);
        }
      }
    };
    fetchDatosAmigos();
  }, [activeTab, token]);

  const handleAceptarSolicitud = async (usuarioQueEnvia) => {
    /*fetch a PUT /friends/accept/:usuarioQueEnvia  */
  };
  const handleRechazarSolicitud = async (usuarioQueEnvia) => {
    /*fetch a PUT /friends/accept/:usuarioQueEnvia  */
  };

  useEffect(() => {
    const fetchMisReseñas = async () => {
      if (activeTab === "reseñas" && token) {
        try {
          const response = await fetch(`${apiUrl}/reviews/my-reviews`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error("Error al obtener las reseñas");
          }
          const data = await response.json();
          setReseñas(data);
          console.log("mis reseñas son:", data);
        } catch (error) {
          console.error("Error al obtener reseñas:", error);
        }
      }
    };
    fetchMisReseñas();
  }, [activeTab, token]); //se ejecuta cuando cambia activeTab(pestaña) o token

  const renderContent = () => {
    switch (activeTab) {
      case "favoritos":
        // se verifica que el usuario y la lista estén
        if (!user?.favoritos || user?.favoritos.length === 0) {
          return (
            <div>
              <h2 className="text-2xl font-bold mb-4">Mis Animes Favoritos</h2>
              <p className="text-slate-400">
                Aún no has añadido ningún anime a tus favoritos.
              </p>
            </div>
          );
        }
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Animes Favoritos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/*uso el map sobre user.favoritos para mostrar el contenido*/}
              {user.favoritos.map((fav) => {
                const cardFavorito = {
                  mal_id: fav.animeId,
                  titles: [{ type: "Default", title: fav.title }],
                  images: { webp: { large_image_url: fav.image } },
                  score: fav.score,
                  genres: fav.genero ? [{ name: fav.genero }] : [],
                  synopsis: "Haz clic en 'Ver más' para ver los detalles.",
                };

                return <AnimeCards key={fav.animeId} anime={cardFavorito} />;
              })}
            </div>
          </div>
        );
      case "privada":
        if (!user?.listaPrivada || user.listaPrivada.length === 0) {
          return <p className="text-slate-400">La lista privada está vacía.</p>;
        }
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mi Lista Privada</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {user.listaPrivada.map((priv) => {
                const cardFavoritoPriv = {
                  mal_id: priv.animeId,
                  titles: [{ type: "Default", title: priv.title }],
                  images: { webp: { large_image_url: priv.image } },
                  score: priv.score,
                  genres: priv.genero ? [{ name: fav.genero }] : [],
                  synopsis: "Haz clic en 'Ver más' para ver los detalles.",
                };

                return (
                  <AnimeCards key={priv.animeId} anime={cardFavoritoPriv} />
                );
              })}
            </div>
          </div>
        );
      case "reseñas":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
            {reseñas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols gap-4">
                {reseñas.map((review) => (
                  <MisReseñasCard key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-slate-400">Aún no has realizado reseñas.</p>
            )}
          </div>
        );
      case "amigos":
        return (
          <div>
            {/* SECCIÓN DE SOLICITUDES PENDIENTES */}
            {datosAmigos.solicitudes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">
                  Solicitudes de Amistad
                </h3>
                <div className="space-y-3">
                  {datosAmigos.solicitudes.map((solicitud) => (
                    <div
                      key={solicitud._id}
                      className="bg-slate-700 p-3 rounded-lg flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <Link href="/perfil">
                          <Image
                            src={solicitud.fotoPerfil || "/img/avatar1.png"}
                            width={40}
                            height={40}
                            alt={solicitud.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </Link>
                        <span className="font-semibold">
                          {solicitud.username}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(solicitud._id)}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 text-xs rounded"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleRejectRequest(solicitud._id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs rounded"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN DE LISTA DE AMIGOS */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Mis Amigos</h2>
              {datosAmigos.amigos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {datosAmigos.amigos.map((amigo) => (
                    <Link key={amigo._id} href={`/perfil/${amigo.username}`}>
                      <div className="text-center">
                        <Image
                          src={amigo.fotoPerfil || "/img/avatar1.png"}
                          width={80}
                          height={80}
                          alt={amigo.username}
                          className="w-20 h-20 rounded-full object-cover mx-auto"
                        />
                        <p className="mt-2 text-sm truncate">
                          {amigo.username}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">Aún no tienes amigos.</p>
              )}
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  //si la carga ha terminado y AÚN no hay usuario, lo redirige a la página de login
  if (!loading && !user) {
    router.push("/login");
  }

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      {/* --- BANNER DEL PERFIL --- */}
      <div className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <Image
            src={fotoPerfilSrc}
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
          {user?.solicitudAmistad?.length > 0 && (
            <span className="absolute -top-1 -right-1 ...">
              {user.solicitudAmistad.length}
            </span>
          )}
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
