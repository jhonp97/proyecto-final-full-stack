"use client";

// 1. hago variables de la data para organizar mejor el codigo, en imgUrl hago eso porque "images" tiene dos objetos y cada uno tiene contenido, el estado de hover para cuando pase el raton por encima de la imagen se pueda ver una breve sinopsis


// 2. linea 22: esta parte me ponia error y no sabia por que y resulta que era que tenia que next exige poner los dominios externos donde se cargan imagenes, asi que me puse a buscar como arreglarlo y tenia que modificar el next.config.js


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const AnimeCards = ({ anime }) => {
  // 1:
  const { mal_id, title, images, score, genres = [], synopsis } = anime;
  const imgUrl = images?.webp?.large_image_url
  const [isHover, setIsHover] = useState(false)


  return (
    <article className="bg-slate-800 text-gray-200  rounded-lg overflow-hidden shadow-cyan-950 hover:shadow-lg hover:scale-105 transition-transform duration-200 ">
      <div className="relative h-64 overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>

        {/* 2. */}
        <Image
          src={imgUrl}
          alt={`Imagen de ${title}`}
          width={200}
          height={330}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />

        {/* hover para la sinopsis */}
        {isHover && (
          <div className="absolute inset-0 bg-slate-950 bg-opacity-80 flex items-center justify-center p-4 transition-opacity duration-300">
            <p className="text-white text-sm text-center leading-relaxed">
              {synopsis.substring(0, 150) ?? "Sinopsis no disponible"}...
            </p>
          </div>
        )}
      </div>

      <div className="p-2.5  flex flex-col items-center justify-between gap-2  h-50">
        <h3 className=" font-bold text-sm sm:text-base md:text-lg  mb-2 text-center break-words ">{title}</h3>

        <div className="flex flex-wrap gap-1 mb-3 items-center justify-center">
          {genres.map((gen, i)=>(
            <span key={i}
            className=" text-white bg-purple-600 text-xs px-2 p-1 rounded-full">
              {gen.name}
            </span>
          ))}
        </div>

        <p className="text-sm">
          <strong>⭐</strong>{score ?? 'Sin calificación'}
        </p>

        <Link href={`/animes/${mal_id}`}>
          <button className=" w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">Ver mas</button>
        </Link>
      </div>
    </article>
  );
};

export default AnimeCards;




