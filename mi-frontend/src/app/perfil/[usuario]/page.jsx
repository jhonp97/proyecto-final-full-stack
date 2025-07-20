"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Loading from "@/components/Loading";
import AnimeCards from "@/components/AnimeCards";
import { FiUserPlus, FiCheck } from "react-icons/fi";

const PerfilPublico = () => {
    const { username } = useParams()
    const { user, token } = useAuth() // para saber quien está viendio la pagina

    const [datosPerfil, setDatosPerfil] = useState(nuell)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect = (() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/public/${username}`);
                if (!response.ok) throw new Error("Usuario no encontrado.");

                const data = await response.json();
                setDatosPerfil(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (username) fetchPerfil();
    }, [username]);

    const handleEnviarSolicitud=async()=>{
        if (!token) return alert("Debes iniciar sesión para añadir amigos.");
        try {
            await fetch(`${apiUrl}/friends/request/${datosPerfil._id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            alert("Solicitud de amistad enviada.");
        } catch (err) {
            alert("Error al enviar la solicitud.");
        }
    };

    if (loading) return <Loading text="Cargando perfil..." />;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    
    const rutaBackend = apiUrl.replace("/api/v1", ""); //remuevo para obtener la ruta del back y poder acceder a las imagenes que estan en la raiz
    // url para la imagen si se sube, si no usa la que es por defecto
    const fotoPerfilSrc = user?.fotoPerfil?.startsWith("/uploads") // aqui uso startsWith para verificar que la ruta empieza con /uploads
        ? `${rutaBackend}${user.fotoPerfil}`
        : user?.fotoPerfil || "/img/avatar1.png";
        
        // si el usuario con su Id es el mismo de datosPerfil se guarda en la variable
      const miPerfil = user?._id === datosPerfil._id;

    return (
         <section className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      {/* BANNER DEL PERFIL */}
      <div className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <Image src={fotoPerfilSrc} alt={`Foto de ${datosPerfil.username}`} width={128} height={128}
         className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700"/>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{datosPerfil.username}</h1>
          <p className="text-slate-400 mt-1">{datosPerfil.bio}</p>
       
          {/* SI MI PERFIL NO COINCIDE CON EL ID Y EL USUARIO ES TRUE MUESTRO EL BOTON */}
          {!miPerfil && user && (
             <button onClick={handleEnviarSolicitud} 
             className="mt-4 flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-md text-sm hover:bg-cyan-700">
               <FiUserPlus />
               Añadir Amigo
             </button>
          )}
        </div>
      </div>
      </section>
    );
}

export default PerfilPublico;