"use client";

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

    const [datosPerfil, setDatosPerfil] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [enviarSolicitud, setEnviarSolicitud] = useState(false)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
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
    }, [username, apiUrl]);

    const handleEnviarSolicitud = async () => {
        if (!token) return alert("Debes iniciar sesión para añadir amigos.");
        try {
            await fetch(`${apiUrl}/friends/request/${datosPerfil._id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEnviarSolicitud(true)
            alert("Solicitud de amistad enviada.");
        } catch (err) {
            alert("Error al enviar la solicitud.");
        }
    };


    if (loading) return <Loading text="Cargando perfil..." />;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!datosPerfil) return null // si no hay datos no muestro nada


    const rutaBackend = apiUrl.replace("/api/v1", ""); //remuevo para obtener la ruta del back y poder acceder a las imagenes que estan en la raiz
    // url para la imagen si se sube, si no usa la que es por defecto
    const fotoPerfilSrc = datosPerfil?.fotoPerfil?.startsWith("/uploads") // aqui uso startsWith para verificar que la ruta empieza con /uploads
        ? `${rutaBackend}${datosPerfil.fotoPerfil}`
        : datosPerfil?.fotoPerfil || "/img/avatar1.png";

    // si el usuario con su Id es el mismo de datosPerfil se guarda en la variable
    const miPerfil = user?._id === datosPerfil._id;

    // para cambiar el estado del boton dependiendo si es amigo o está pendiente
    const esAmigo = user?.amigos?.some(amigo => amigo._id === datosPerfil._id);
    const solicitudPendiente = user?.solicitudAmistad?.some(solicitud => solicitud._id === datosPerfil._id);

    return (
        <section className="max-w-7xl mx-auto p-4 md:p-8 text-white">
            {/* BANNER DEL PERFIL */}
            <div className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
                <Image src={fotoPerfilSrc} alt={`Foto de ${datosPerfil.username}`} width={128} height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700" />
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold">{datosPerfil.username}</h1>
                    <p className="text-slate-400 mt-1">{datosPerfil.bio}</p>

                    {/* SI MI PERFIL NO COINCIDE CON EL ID Y EL USUARIO ES TRUE MUESTRO EL BOTON */}
                    {!miPerfil && user && (
                        <>
                            {esAmigo ? (
                                <button disabled className="mt-4 flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md text-sm cursor-not-allowed">
                                    <FiCheck /> Ya son amigos
                                </button>
                            ) : requestSent || solicitudPendiente ? (
                                <button disabled className="mt-4 flex items-center gap-2 bg-slate-600 px-4 py-2 rounded-md text-sm cursor-not-allowed">
                                    Solicitud enviada
                                </button>
                            ) : (
                                <button onClick={handleEnviarSolicitud}
                                    className="mt-4 flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-md text-sm hover:bg-cyan-700">
                                    <FiUserPlus />
                                    Añadir Amigo
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default PerfilPublico;