"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import heroImagen from "@/assets/hero-aniverse1-2.png"

import AnimeCards from "@/components/AnimeCards";
import Hero from "@/components/Hero";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Home() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null) comentado para luego hacer el loading.jsx y erros.jsx


  // llamara a la api de jikan para traer los animes mas populares ()
  useEffect(() => {
    const getAnimes = async () => {
      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const response = await fetch(`${apiUrl}/jikan/top-anime`);

        console.log("estado del fetch:", response.status);

        if (!response.ok) {
            throw new Error("Error al obtener datos de Jikan del servidor");
    }
        const data = await response.json()
        console.log("Respuesta del backend:", data);

        //  console.log(`mi data.data es ${data.data}`);
        //para segurarme que siempre sea un array
        setAnimes(Array.isArray(data.data) ? data.data : [])

      } catch (error) {
        console.error("Error al cargar animes", error)
        setAnimes([])
      }finally{
        setLoading(false)
      }
    }
    getAnimes();
  }, [])
  return (
    <section className=" text-white bg-slate-900">
      {/* hero */}
      <Hero
        imageSrc={heroImagen}
        title="  "
        subtitle= " "

      />


      <div className="text-center mb-12 p-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 p-2">Descubre tu próximo anime</h1>
        <p className="text-lg text-gray-300 p-3">Explora nuevos títulos, géneros y más.</p>
      </div>

      {/* animes populares */}
      <div className="max-w-7xl mx-auto p-3">
        <h2 className="text-2xl font-semibold mb-6 inline-block border-b border-cyan-500 ">
          <Link href="/animes">
            Animes más populares
          </Link>
        </h2>

        {/* poner el loading aqui  */}
        {loading ? (
          <Loading />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-3" >
          {animes.length >0 ? (
          animes.map((anime) => (
            <AnimeCards key={anime.mal_id} anime={anime} />
          ))
         ) : (
              <p className="col-span-full text-center text-slate-400">No se pudieron cargar los animes, actualiza la pagina </p>
            )}
        </div>
          )}
      </div>
</section>
  );
}
