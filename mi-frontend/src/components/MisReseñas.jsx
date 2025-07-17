"use client"

import Image from "next/image"
import Link from "next/link"

const MisReseñasCard = ({ review}) => {
    return(
        <article className="bg-salet-800 rounded-lg p-4 flex gap-4">
            <Link href={`/animes/${review.animeId}`}>
                <Image src={review.animeImage} alt={review.animeTitle} 
                width={100} height={150} className="rounded object-cover w-20 h-28" />
            </Link>
            <div className="flex flex-col">
                <Link href={`/animes/${review.animeId}`}>
                    <h3 className="font-bold hover:text-cyan-400 transition">{review.animeTitle}</h3>
                </Link>
                <div className="flex items-center ">
                    {[...Array(5)].map((_,i)=>(
                        <span key={i} className={`text-lg ${i< review.rating ? 'text-yellow-400' : 'text-gray-500'}`}>★
                        </span>
                    ))}
                </div>
                <p className="text-slate-400 mt-2">{review.comment}</p>
            </div>
        </article>
    )
};
export default MisReseñasCard;