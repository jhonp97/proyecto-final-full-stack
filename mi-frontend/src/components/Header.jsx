"use client";

import Link from "next/link";
import { useState } from "react";

// este el componente header de la pagina

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="h-25 flex justify-between items-center bg-[#1E1E2F] text-white p-5 md:p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link href="/">Logo</Link>
        </div>
      </div>
      <nav className="hidden md:flex space-x-6 justify-around w-xl text-sm font-medium">
        <Link href="/" className="hover:text-[#00adb5] transition">
          Inicio
        </Link>
        <Link href="/animes" className="hover:text-[#00adb5] transition">
          Animes
        </Link>
        <Link href="/login" className="hover:text-[#00adb5] transition">
          Login
        </Link>
        <Link href="/registro" className="hover:text-[#00adb5] transition">
          Registro
        </Link>
      </nav>


{/* menu hamburguesa para pantallas pequeñas */}
     
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
        >
            <span className="material-icons">{isOpen ? "close" : "menu"}</span>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#1e1e2f] p-4 space-y-4">
            <Link href="/" className="block text-white hover:text-[#00adb5]  transition">
          Inicio
        </Link>
        <Link href="/animes" className="block text-white hover:text-[#00adb5] transition ">
          Animes
        </Link>
        <Link href="/login" className="block text-white hover:text-[#00adb5] transition ">
          Login
        </Link>
        <Link href="/registro" className="block text-white hover:text-[#00adb5]  transition">
          Registro
        </Link>
        </div>
      )}
    </header>
  );
};
