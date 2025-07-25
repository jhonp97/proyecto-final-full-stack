"use client";

import Image from "next/image";
import Link from "next/link";

const AmigosTab = ({ datosAmigos, onAccept, onReject }) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const rutaBackend = apiUrl.replace("/api/v1", "");

  // la linea 27 es como lo tenia y como lo he usado en otros componentes pero como lo he usado en dos secciones mejor decidí 
  // hacerlo en una funcion para que se vea mejor y no tan confuso
  const traerFotoPerfil = (usuario) => {
  return usuario?.fotoPerfil?.startsWith("/uploads")
    ? `${rutaBackend}${usuario.fotoPerfil}`
    : usuario?.fotoPerfil || "/img/avatar1.png";
};


  return (
    <div>
      {/* SECCIÓN DE SOLICITUDES PENDIENTES */}
      {datosAmigos.solicitudes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Solicitudes de Amistad</h3>
          <div className="space-y-3">
            {datosAmigos.solicitudes.map((solicitud) => {
              // const fotoPerfilSrc = solicitud.user?.fotoPerfil?.startsWith("/uploads")
              //   ? `${rutaBackend}${solicitud.user.fotoPerfil}`
              //   : solicitud.user?.fotoPerfil || "/img/avatar1.png";
              
              return (
                <div
                  key={solicitud._id}
                  className="bg-slate-700 p-3 rounded-lg flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <Link href={`/perfil/${solicitud.datosAmigos?.username}`}>
                      <Image
                        src={traerFotoPerfil(solicitud)}
                        width={40}
                        height={40}
                        alt={`foto perfil de ${solicitud.username}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                    <span className="font-semibold">{solicitud.username}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onAccept(solicitud._id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 text-xs rounded"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => onReject(solicitud._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs rounded"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECCIÓN DE LISTA DE AMIGOS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mis Amigos</h2>
        {datosAmigos.amigos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {datosAmigos.amigos.map((amigo) => {
              
              return(
              <Link key={amigo._id} href={`/perfil/${amigo.username}`}>
                <div className="text-center">
                  <Image
                    src={traerFotoPerfil(amigo)}
                    width={80}
                    height={80}
                    alt={`foto perfil de ${amigo?.username}`}
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  {/* uso truncate por si el nombre es muy largo */}
                  <p className="mt-2 text-sm truncate">{amigo.username}</p>
                </div>
              </Link>
            )})}
          </div>
        ) : (
          <p className="text-slate-400">Aún no tienes amigos.</p>
            )}
      </div>
    </div>
  );
};

export default AmigosTab;
