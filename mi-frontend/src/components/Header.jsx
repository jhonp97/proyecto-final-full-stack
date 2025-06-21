"use client";

// importo Link para poder navegar hacia mis rutas sin usar <a>
//el useState para abrir y cerrar el menu hamburguesa
// handleClick es para que se cierre el menu despues de      hacer click a donde vayamos a navegar
// tenia repetido dos veces mi nav con el mismo codigo entonces cree una lista de objetos la cual recorro despues con un map dandole las props para que se vea menos codigo

// PENDIENTE VOLVER AQUI CUANDO REALICE EL LOGGIN PARA CAMBIAR LOGIN Y REGISTRO POR "MI PERFIL" Y "CERRAR SESION"

import Link from "next/link";
import { useState } from "react";

// este el componente header de la pagina

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false)
  }

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/animes", label: "Animes" },
    { href: "/login", label: "Login" },
    { href: "/registro", label: "Registro" },
  ];

  return (
    <header className="h-25 flex justify-between items-center bg-[#1E1E2F] text-white p-5 md:p-6 shadow-lg ">

      <div className="text-2xl font-semibold">
        <Link href="/">Logo</Link>
      </div>

      <nav className="hidden md:flex justify-around w-xl font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="hover:text-[#00adb5]  transition">{label}</Link>
        ))}
      </nav>


      {/* menu hamburguesa para pantallas pequeñas */}

      <button onClick={() => setIsOpen(!isOpen)}
        className="text-white text-3xl p-2 w-20  md:hidden">
        <span className="material-icons">{isOpen ? "close" : "menu"}</span>
      </button>

      {/* enlaces desplegables */}
      {isOpen && (
        <div className="md:hidden absolute top-[10%] left-0 flex flex-col gap-5 text-center w-full bg-[#1e1e2f] p-6 z-50">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-[#00adb5]  transition"
              onClick={handleClick}>{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
};
