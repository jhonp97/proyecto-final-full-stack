// actualizar el diseño final 



// import Image from "next/image";
// import Link from "next/link";

// const Cards = ({ anime }) => {
//   return (
//     <article className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//       <figure>
//         <Image
//           src={anime.images?.jpg.image_url}
//           alt={`Imagen de ${anime.title}`}
//           width={320}
//           height={450}
//           className="w-full h-auto object-cover"
//         />
//       </figure>
//       <div className="p-4 flex flex-col gap-5 items-center justify-center">
//         <h2 className="text-base font-semibold text-gray-500">{anime.title}</h2>
//         <p className="text-sm text-white">
//             {/* terminar de mirar bien esta parte */}
//             <strong>Género:</strong> {anime.genres.map(g => g.name)} 
//         </p>
//         <p className="text-sm text-black">
//             <strong>⭐ Calificación:</strong>{anime.score ?? 'Sin calificación'}
//         </p>

//         {/* acordarme de probar esa ruta en casa para que funcione */}
//         <Link href={/animes/[id]}>
//         <button className=" mt-3 bg-amber-50 text-black px-3 py-1 text-sm rounded hover:bg-gray-600 hover:text-white transition">Ver mas</button>
//         </Link>
//       </div>
//     </article>
//   );
// };

// export default Cards;




import Image from "next/image";
import Link from "next/link";

const Cards = () => {
  return (
    <article className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <figure>
        <Image
          src="/next.svg"
          alt="imagen"
          width={320}
          height={450}
          className="w-full h-auto object-cover"
        />
      </figure>
      <div className="p-4  flex flex-col gap-5 items-center justify-center">
        <h2 className="text-base font-semibold text-gray-500">mi anime</h2>
        <p className="text-sm text-white">
            {/* terminar de mirar bien esta parte */}
            <strong>Género:</strong> anime 
        </p>
        <p className="text-sm text-black">
            <strong>⭐ Calificación:</strong>Sin calificación
        </p>
       
        {/* acordarme de probar esa ruta en casa para que funcione */}
        <Link href={"/inicio"}>
        <button className=" mt-3 bg-amber-50 text-black px-3 py-1 text-sm rounded hover:bg-gray-600 hover:text-white transition">Ver mas</button>
        </Link>
      </div>
    </article>
  );
};

export default Cards;
