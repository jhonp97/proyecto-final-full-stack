"use client";

// 1. hago variables de la data para organizar mejor el codigo, en imgUrl hago eso porque "images" tiene dos objetos y cada uno tiene contenido

// 2. linea 22: esta parte me ponia error y no sabia por que y resulta que era que tenia que next exige poner los dominios externos donde se cargan imagenes, asi que me puse a buscar como arreglarlo y tenia que modificar el next.config.js


 import Image from "next/image";
 import Link from "next/link";

 const AnimeCards = ({ anime }) => {
// 1:
  const {mal_id, title, images, score, genres = []} = anime;
  const imgUrl = images?.webp?.large_image_url


   return (
     <article className="bg-slate-900 text-gray-200 border-2 border-cyan-700 rounded-lg overflow-hidden shadow-cyan-800 hover:shadow-lg hover:scale-105 transition-transform duration-200 ">

       <Link href={`/animes/${mal_id}`}>
      {/* 2. */}
         <Image
           src={imgUrl}
           alt={`Imagen de ${title}`}
           width={200}
           height={330}
           className="w-full h-85 object-cover"/>
       </Link> 

       <div className="p-4  flex flex-col items-center justify-center gap-3 h-50">
         <h3 className="text-base font-semibold  text-center h-12 ">{title}</h3>

         <p className="text-sm text-gray-400  text-center">
             {/* terminar de mirar bien esta parte */}
             <strong>Géneros:</strong> {genres.map(g => g.name)} 
         </p>

         <p className="text-sm">
             <strong>⭐</strong>{score ?? 'Sin calificación'}
         </p>

         <Link href={`/animes/${mal_id}`}>
         <button className="  bg-cyan-900 text-white p-3 py-1 text-center rounded hover:bg-slate-700 hover:text-gray-300 transition">Ver mas</button>
         </Link>
       </div>
     </article>
   );
 };

 export default AnimeCards;




