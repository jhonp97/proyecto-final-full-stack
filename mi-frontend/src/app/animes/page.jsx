"use client";

import AnimeCards from "@/components/AnimeCards";
import FiltroAnimes from "@/components/FiltroAnimes";
import BtnPaginacion from "@/components/BtnPaginacion";
import Loading from "@/components/Loading";

import { useState, useEffect } from "react";

const Animes = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [filtro, setFiltro] = useState("all")

  const [filtro, setFiltro] = useState({
    name: "", //
    status: "", //  completado
    genres: "", // número de género
    order_by: "", // para ordenar por puntuación
    sort: "desc", // orden descendente
  });

  useEffect(() => {
    const traerAnimes = async () => {
      try {
       
        setError(null);

         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const params = new URLSearchParams({
          page: page, // Añadimos la página por defecto
        });

        // Este bloque añade dinámicamente todos los filtros que no estén vacíos
        Object.entries(filtro).forEach(([key, value]) => {
          if (value) {
            // si 'value' no es una cadena vacía, null o undefined
            const paramKey = key === "name" ? "q" : key; // la api de Jikan usa "q" para el nombre
            params.append(paramKey, value);
          }
        });
       
       
        const response = await fetch(
          `${apiUrl}/jikan/animes?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`error ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        setAnimes(data.data || []);
        setTotalPages(data.pagination.last_visible_page);
      } catch (error) {
        console.error(`No se pudo cargar el archivo, error:`, error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    traerAnimes();
  }, [page, filtro]);

  // esta funcion es para que no me salga error en la pagina ya que la api no me permite hacer mas de dos peticiones por segundo
  const handleFiltroChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
    setPage(1);
  };

  // const cards = animes.map((a) => <AnimeCards key={animes.mal_id} anime={animes} />);

  const cards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-3">
      {animes.map((anime) => (
        <AnimeCards key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );

  return (
    <section className="flez flex-col items-center justify-center">
      <h2 className="font-bold text-sm md:text-2xl xl:text-5xl text-center text-white p-5 m-3">Animes</h2>

      <FiltroAnimes filtro={filtro} setFiltro={handleFiltroChange} />

      <section className="max-w-7xl mx-auto p-3 w-full">
        {loading ? <Loading/>: cards}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </section>
      <BtnPaginacion
        paginaActual={page}
        totalPaginas={totalPages}
        cambiarPagina={setPage}
      />
    </section>
  );
};

export default Animes;
