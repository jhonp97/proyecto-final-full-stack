"use client"

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="h-32 bg-[#1E1E2F] flex flex-col gap-1 justify-evenly text-white p-6 mt-10 text-center text-sm">


            <div className="mt-4 flex justify-center gap-6 text-lg">
                <a href="https://www.instagram.com/" target="_blank" className="text-white hover:text-cyan-400"><FaInstagram size={20} /> </a>
                <a href="https://www.facebook.com/" target="_blank" className="text-white hover:text-cyan-400"><FaFacebook size={20} /> </a>
                <a href="https://x.com/?lang=es" target="_blank" className="text-white hover:text-cyan-400"> <FaTwitter size={20} /></a>
                <a href="https://www.linkedin.com/in/jhonper1997/" target="_blank" className="text-white hover:text-cyan-400"> <FaLinkedin size={20} /></a>
            </div>
            <a href="/politicas"
                className="block mt-1 text-white hover:text-cyan-400 ">
                Politicas de privacidad
            </a>
            <p >© 2025 Todos los derechos reservados.</p>
        </footer>
    )
}