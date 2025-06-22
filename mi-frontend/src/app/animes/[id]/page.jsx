"use client";

// quitarlos error y el loading, organizar el diseño, habia otra cosa que arreglar y modificar pero no me acuerdo, volver a revisar

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import  FavoritoBtn  from "@/components/FavoritoBtn.jsx"

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
      <section className="p-10 text-center text-white">
        <p className="text-lg text-gray-300">Cargando anime...</p>
      </section>
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
    <section className="max-w-5xl  text-white">
      <h1 className="flex items-center justify-center gap-5 text-3xl  p-5 text-center ">{anime.title}
      <FavoritoBtn animeId={anime.mal_id}/>
      </h1>

      <div className="flex flex-col justify-center items-center md:flex-row gap-6">
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={300}
          height={450}
          className="rounded md:h-100"
        />

        <div className="flex flex-col gap-2">
          <p><strong>Tipo:</strong> {anime.type}</p>
          <p><strong>Episodios:</strong> {anime.episodes}</p>
          <p><strong>Estado:</strong> {anime.status}</p>
          <p><strong>Géneros:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
          <p className="text-gray-300">{anime.synopsis}</p>
        </div>
      </div>
    </section>
  );
}
