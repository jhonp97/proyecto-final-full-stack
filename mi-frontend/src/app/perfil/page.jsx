"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit, FiCamera, FiBell } from "react-icons/fi"; 
import AnimeCards from "@/components/AnimeCards"; 

//  DATOS DE EJEMPLO
// estos datos  de  API
const mockUser = {
  username: "MiUsuario123",
  bio: "Amante del shonen y la ciencia ficción.",
  profilePicture: "/img/default-profile.png", 
};

const mockFavorites = [
  {
    mal_id: 1,
    titles: [
      { type: "Default", title: "Attack on Titan" },
      { type: "Synonym", title: "Shingeki no Kyojin" }
    ],
    images: {
      webp: {
        large_image_url: "/img/shingeki.jpg"
      }
    },
    score: 4.8,
    genres: [{ name: "Action" }, { name: "Drama" }],
    synopsis: "La humanidad lucha contra titanes en un mundo postapocalíptico."
  },
 
];



const perfil = () => {
   const [activeTab, setActiveTab] = useState("favoritos"); // Estado para controlar la pestaña activa

  const renderContent = () => {
    switch (activeTab) {
      case "favoritos":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Animes Favoritos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockFavorites.map((anime) => (
               
                <AnimeCards key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </div>
        );
      case "privada":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mi Lista Privada</h2>
            <p className="text-slate-400">Aquí se mostrarán los animes de lista privada.</p>
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

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      
      {/* --- BANNER DEL PERFIL --- */}
      <div className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <Image
            src={mockUser.profilePicture}
            alt={`Foto de perfil de ${mockUser.username}`}
            width={128}
            height={128}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700"
          />
          <button className="absolute bottom-1 right-1 bg-cyan-500 p-2 rounded-full hover:bg-cyan-600 transition-colors duration-200">
            <FiCamera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{mockUser.username}</h1>
          <p className="text-slate-400 mt-1">{mockUser.bio}</p>
          <button className="mt-4 flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-md text-sm hover:bg-slate-600 transition-colors duration-200">
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
            activeTab === "favoritos" ? "border-b-2 border-cyan-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Mis Favoritos
        </button>
        <button
          onClick={() => setActiveTab("privada")}
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "privada" ? "border-b-2 border-cyan-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Mi Lista Privada
        </button>
        <button
          onClick={() => setActiveTab("reseñas")}
          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "reseñas" ? "border-b-2 border-cyan-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Mis Reseñas
        </button>
        <button
          onClick={() => setActiveTab("amigos")}
          className={`relative px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === "amigos" ? "border-b-2 border-cyan-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Amigos
          {/* Notificación de solicitud de amistad */}
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </button>
      </div>

      {/* --- CONTENIDO DE LA PESTAÑA ACTIVA --- */}
      <div>
        {renderContent()}
      </div>
    </section>
     );
}
 
export default perfil;