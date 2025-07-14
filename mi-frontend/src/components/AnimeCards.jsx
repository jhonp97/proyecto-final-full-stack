"use client";

// 1. hago variables de la data para organizar mejor el codigo, en imgUrl hago eso porque "images" tiene dos objetos y cada uno tiene contenido, el estado de hover para cuando pase el raton por encima de la imagen se pueda ver una breve sinopsis

// 2. linea 22: esta parte me ponia error y no sabia por que y resulta que era que tenia que next exige poner los dominios externos donde se cargan imagenes, asi que me puse a buscar como arreglarlo y tenia que modificar el next.config.js

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AnimeCards = ({ anime }) => {
  // 1:
  const { mal_id, titles, title, images, image, 
    score = anime.score ?? "Sin calificación", 
    genres = anime.genres ?? [], 
    synopsis= anime.synopsis ?? "Haz clic en 'Ver más' para ver los detalles." } = anime;

  const imgUrl = images?.webp?.large_image_url || image;

  const titulo =
    titles.find((t) => t.type === "Synonym")?.title ||
    titles.find((t) => t.type === "Default")?.title || title;
  const [isHover, setIsHover] = useState(false);

  return (
    <article className="bg-slate-800 text-gray-200  rounded-lg overflow-hidden shadow-cyan-950 hover:shadow-lg hover:scale-105 transition-transform duration-200 ">
      <div
        className="relative h-64 overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* 2. */}
        <Image
          src={imgUrl}
          alt={`Imagen de ${titulo}`}
          width={200}
          height={330}
          quality={100}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* hover para la sinopsis, con transicion en la opacidad */}
        <div
          className={`absolute inset-0 bg-slate-950 bg-opacity-80 flex items-center justify-center p-4 transition-opacity duration-300 
          ${isHover ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <p className="text-white text-sm text-center leading-relaxed">
            {synopsis?.substring(0, 150) ?? "Sinopsis no disponible"}...
          </p>
        </div>
      </div>
      <Link href={`/animes/${mal_id}`} className="cursor-default">
        <div className="p-2.5  flex flex-col  justify-between gap-2  h-50">
          <h3
          // esto es para que el titulo cuando es muy largo (mayor a 23 caracteres) se achique permitiendo que no me rompa la tarjeta
            className={`font-bold mb-2 text-center break-words ${titulo.length >= 23 ? "text-sm" : "text-base sm:text-lg md:text-xl"}`}
          >
            {titulo}
          </h3>

            {/* aquí aplico algo parecido a lo hecho con el titulo pero con los generos para que solo me muestre un total de 4 etiquetas de generos y no me rompa el codigo */}
          <div className="flex flex-wrap gap-1 mb-3 items-center justify-center ">
            {genres.slice(0, 4).map((gen, i) => (
              <span
                key={i}
                className={` text-white bg-purple-600 text-xs px-2 p-1 rounded-full `}
              >
                {gen.name}
              </span>
            ))}
          </div>

          <p className="text-sm text-center">
            <strong>⭐</strong>
            {score ?? "Sin calificación"}
          </p>

        
            <button className=" w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer text-white p-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              Ver mas
            </button>
          
        </div>
      </Link>
    </article>
  );
};

export default AnimeCards;
