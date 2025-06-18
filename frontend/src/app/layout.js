// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// importo  el header y footer para que salgan en todas mis paginas
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// para el seo
export const metadata = {
  title: "Mis animes",
  description: "Buscador de animes, para ver y comentar con tus amigos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`bg-primary text-white font-body`}>
        <Header/>
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">
        {children}

        </main>
        <Footer/>
      </body>
    </html>
  );
}
