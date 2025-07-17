"use client";

// quitarlos error y el loading, organizar el diseño, habia otra cosa que arreglar y modificar pero no me acuerdo, volver a revisar

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import FavoritoBtn from "@/components/FavoritoBtn.jsx"
import Image from "next/image";
import ComentBox from "@/components/ComentBox";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";


export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        console.log(data)
        setAnime(data.data);
      } catch (err) {
        setError("No se pudo cargar el anime.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error || !anime) {
    return (
      <section className="p-10 text-center text-white bg-red-800">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white m-0 p-0">
      {/* Hero */}
      <Hero
        imageSrc={
          anime.trailer?.images?.maximum_image_url ||
          anime.images?.jpg?.large_image_url
        }
        title={anime.title}
        subtitle={`${anime.rating} — ${anime.status}`}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna izquierda: Info del anime */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                width={300}
                height={450}
                quality={100}
                className="rounded-lg shadow-lg object-cover w-full md:w-64 h-100"
              />

              <div className="flex-1 ">
                <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300">
                  <p><strong>Tipo:</strong> {anime.type}</p>
                  <p><strong>Episodios:</strong> {anime.episodes}</p>
                  <p><strong>Estado:</strong> {anime.status}</p>
                  <p><strong>Fecha:</strong> {anime.aired.string}</p>
                  <p><strong>Calificación:</strong> ⭐ {anime.score ?? "No disponible"}</p>
                </div>

                {/* esto lo hago porque muchas sinopsis son demasiados largas y me dañan un poco la visualizacion de la pagina entonces lo pongo que se muestre hasta el quinto punto para muestre lo justo */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {anime.synopsis
                    ?.split('.')
                    .slice(0, 5)
                    .join('.') + '.'}
                </p>

                {/* boton para ver los capitulos*/}
                {anime.url && (
                  <Link
                    href={anime.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 mr-4 inline-flex items-center gap-2 bg-cyan-600 text-white font-bold px-5 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
                  >
                    <FaPlay /> {/* icono de Play */}
                    Ver en MyAnimeList
                  </Link>
                )}


                {/* boton de favoritos */}
                <div className="bg-gray-700 p-2 rounded-lg inline-flex  items-center">
                  <FavoritoBtn anime={anime} />
                </div>
              </div>
            </div>
          </div>

          {/*  Trailer */}
          <div>
            {anime.trailer?.embed_url && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tráiler</h3>
                <div className="aspect-video rounded overflow-hidden">
                  <iframe
                    src={`${anime.trailer.embed_url}?autoplay=0`}
                    title={`Tráiler de ${anime.title}`}
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Reseñas</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ComentBox anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
}
