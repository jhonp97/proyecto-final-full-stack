"use client";

// importo Link para poder navegar hacia mis rutas sin usar <a>
//el useState para abrir y cerrar el menu hamburguesa
// handleClick es para que se cierre el menu despues de      hacer click a donde vayamos a navegar
// tenia repetido dos veces mi nav con el mismo codigo entonces cree una lista de objetos la cual recorro despues con un map dandole las props para que se vea menos codigo

// PENDIENTE VOLVER AQUI CUANDO REALICE EL LOGGIN PARA CAMBIAR LOGIN Y REGISTRO POR "MI PERFIL" Y "CERRAR SESION"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
//Iconos de react-icons perfil y cerra sesion
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { usePathname,  useRouter } from "next/navigation";

// este el componente header de la pagina

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false)
  const pathname = usePathname();
  const router = useRouter()

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {

    
    // luego poner aqui la logica del back para eliminar el token y limpiar todo
    console.log("se ha cerrado sesion");
    setIsOpen(false);
    setLogout(true)
    router.push("/login")
  };

  // enlances siempre visibles
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/animes", label: "Animes" },
  ];

  // lo uso para simular que pueda funcionar la autenticacion cambiar esto luego
  const isAutenticado = true;
  const user = {
    username: "jhon_dev",
    profilePicture: "/user-avatar.png", // Imagen de perfil (opcional)
  };
  return (
    <header className=" sticky top-0  bg-slate-900 h-20 border-b border-slate-800 backdrop-blur-sm flex justify-between items-center  text-white p-5 md:p-6 shadow-lg z-50">
      <div className="text-2xl font-semibold">
        <Link href="/">
          {isAutenticado && user.fotoPerfil ? (
            // mostrar foto de perfil cuando inicio sesion
            <Image
              src={user.fotoPerfil}
              alt={user.username}
              width={400}
              height={400}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <Image
              src="/img/aniverse-logo-removebg-preview.png"
              alt="imagen logo de aniverse"
              width={250}
              height={250}
              className="w-40 h-auto hover:scale-110 transition"
            />
          )}
        </Link>
      </div>

      <nav className="hidden md:flex justify-around w-xl font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition ${
              pathname === href
                ? "text-cyan-400 font-semibold border-b-2 border-cyan-500"
                : "hover:text-[#00adb5] text-white"
            }`}
          >
            {label}
          </Link>
        ))}

        {/* mostrar enlace dependiedno si estoy en cesion o no */}
        {isAutenticado ? (
          <>
            <Link
              href="/perfil"
              className={`transition ${
                pathname === "/perfil"
                  ? "text-cyan-400 font-semibold border-b-2 border-cyan-500"
                  : "hover:text-[#00adb5] text-white"
              }`}
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition">
              <FiLogOut className="w-4 h-auto" />
              <span>Cerrar sesión</span>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`transition ${
                pathname === "/login"
                  ? "text-cyan-400 font-semibold border-b-2 border-cyan-500"
                  : "hover:text-[#00adb5] text-white"
              }`}
            >
              Login
            </Link>
            <Link
              href="/registro"
              className={`transition ${
                pathname === "/registro"
                  ? "text-cyan-400 font-semibold border-b-2 border-cyan-500"
                  : "hover:text-[#00adb5] text-white"
              }`}
            >
              Registro
            </Link>
          </>
        )}
      </nav>

      {/* menu hamburguesa para pantallas pequeñas */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-3xl p-2 w-20 z-99 md:hidden"
      >
        {/* alterno entre abrir o cerrar */}
        <span className="material-icons ">{isOpen ? "close" : "menu"}</span>
      </button>

      {/* enlaces desplegables */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 flex flex-col gap-5 text-center w-full bg-slate-900 p-6 z-50">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[#00adb5]  transition"
              onClick={handleClick}
            >
              {label}
            </Link>
          ))}

          {isAutenticado ? (
            <>
              <Link
                href="/perfil"
                onClick={handleClick}
                className="hover:text-[#00adb5] transition"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={handleClick}
                className="hover:text-[#00adb5] transition"
              >
                Login
              </Link>
              <Link
                href="/registro"
                onClick={handleClick}
                className="hover:text-[#00adb5] transition"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
