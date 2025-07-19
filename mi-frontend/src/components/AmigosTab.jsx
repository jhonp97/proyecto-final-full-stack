"use client";

import Image from "next/image";
import Link from "next/link";

const AmigosTab = ({ datosAmigos, onAccept, onReject }) => {
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
                                className="bg-slate-700 p-3 rounded-lg flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Link href="/perfil">
                                        <Image
                                            src={solicitud.fotoPerfil || "/img/avatar1.png"}
                                            width={40}
                                            height={40}
                                            alt={solicitud.username}
                                            className="w-10 h-10 rounded-full object-cover" />
                                    </Link>
                                    <span className="font-semibold">
                                        {solicitud.username}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onAccept={() => onAccept(solicitud._id)}
                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 text-xs rounded"
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        onReject={() => onReject(solicitud._id)}
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
                                    {/* uso truncate por si el nombre es muy largo */}
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

export default AmigosTab;