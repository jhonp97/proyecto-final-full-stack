
import { AuthProvider } from '@/context/AuthContext';
import { Poppins, Roboto } from 'next/font/google'; // importo las fuentes

import "./globals.css";

// importo  el header y footer para que salgan en todas mis paginas
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading', 
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
});

// para el seo
export const metadata = {
  title: "Aniverse",
  description: "Buscador de animes, para ver y comentar con tus amigos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} ${roboto.variable}`} >
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body   className={` bg-slate-900 text-cyan-500 `}>
        <AuthProvider>
          <Header/>
          <main aria-label="Contenido principal" className="min-h-screen w-full overflow-x-hidden ">
          {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
