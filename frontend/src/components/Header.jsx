"use client"

import Link from "next/link"

// este el componente header de la pagina

export const Header = () => {

    return (
        <header className="bg-primary text-white p-6 flex justify-between items-center">
            <div className="max-w-7xl mx-auto ">logo
            </div>
            <nav className="space-x-6 font-body text-sm">
                <Link href="/">Inicio</Link>
                <Link href="/animes">Animes</Link>
                <Link href="/login">Login</Link>
                <Link href="/registro">Registro</Link>

            </nav>

        </header>
    )
}