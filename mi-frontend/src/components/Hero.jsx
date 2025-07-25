"use client"

import Image from "next/image";

/**componente para reutilizar en la pagina de detalles de cada anime y en 
 * la pagina principal
 */

const Hero = ({ imageSrc, title, subtitle }) => {
    return (
        <div className="relative h-[28rem] w-full overflow-hidden">
            <Image
                src={imageSrc}
                alt={`Banner de ${title}`}
                fill
                sizes="100vw"
                quality={85}
                priority
                className=" object-cover"
                
            />



            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* titulo centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl max-w-4xl">
                    {title}
                </h1>
                {/* infromacion como subtitulos*/}
                {subtitle && (
                    <p className="text-purple-300 mt-4 text-sm sm:text-base tracking-wide">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Hero;