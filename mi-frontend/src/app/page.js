"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import AnimeCards from "@/components/AnimeCards";
import Hero from "@/components/Hero";

export default function Home() {
  const [animes, setAnimes] = useState([])
  // const [error, setError] = useState(null) comentado para luego hacer el loading.jsx y erros.jsx


  // llamara a la api de jikan para traer los animes mas populares ()
  useEffect(() => {
    const getAnimes = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=8")
        const data = await response.json();
        // console.log(data)
        setAnimes(data.data)

      } catch (error) {
        console.error("Error al cargar animes", error)
      }
    }
    getAnimes();
  }, [])
  return (
    <section className=" text-white bg-slate-900">
      {/* hero */}
      <Hero
        imageSrc="/img/hero-aniverse1-2.png"
       
      />
       

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubre tu próximo anime</h1>
        <p className="text-lg text-gray-300">Explora nuevos títulos, géneros y más.</p>
      </div>

      {/* animes populares */}
      <div className="max-w-7xl mx-auto p-3">
        <h2 className="text-2xl font-semibold mb-6 inline-block border-b border-cyan-500 ">
          Animes mas populares
        </h2>

        {/* poner el loading aqui  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-3" >
          {animes.map((anime) => (
            <AnimeCards key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </div>


    </section>
  );
}
