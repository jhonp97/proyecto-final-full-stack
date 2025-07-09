"use client"
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen  p-4">
           <h3 className="text-4xl text-center text-red-500 font-bold p-4 ">Pagina no encontrada... 404</h3> 
            <Link href="/" className="text-blue-500 text-2xl hover:underline transition">
                Volver al inicio
            </Link>
        </section>
    );
}

export default NotFoundPage;