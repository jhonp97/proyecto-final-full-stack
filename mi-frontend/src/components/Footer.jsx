"use client"
export const Footer = ()=>{
    return(
        <footer className="bg-primary text-white p-6 mt-10 text-center text-sm">
            <p>© 2025 Todos los derechos reservados,</p>
            <a href="/politicas">Politicas de privacidad</a>
            <div className="mt-2 space-x-4">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Facebook</a>
                <a href="#" className="hover:underline">Linkedin</a>
            </div>
        </footer>
    )
}