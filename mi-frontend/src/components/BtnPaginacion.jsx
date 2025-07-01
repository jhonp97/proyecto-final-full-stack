"use client";

import AnimeCards from "@/components/AnimeCards";
import BtnPaginacion from "@/components/BtnPaginacion";
import { useState, useEffect } from "react";

const Animes = () => {
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [filtro, setFiltro] = useState({
    name: "",
    status: "",
    genre: "",
    order_by: "score",
    sort: "desc",
  });

  useEffect(() => {
    const traerAnimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("page", page);

        if (filtro.name) params.append("q", filtro.name);
        if (filtro.status) params.append("status", filtro.status);
        if (filtro.genre) params.append("genres", filtro.genre);
        if (filtro.order_by) params.append("order_by", filtro.order_by);
        if (filtro.sort) params.append("sort", filtro.sort);

        const response = await fetch(
          `https://api.jikan.moe/v4/anime?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            `error ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setAnimes(data.data || []);
        setTotalPages(data.pagination?.last_visible_page || 1);
      } catch (err) {
        console.log(`No se pudo cargar el archivo: ${err}`);
        setError("Ocurrió un problema al cargar los animes.");
      } finally {
        setLoading(false);
      }
    };

    traerAnimes();
  }, [page, filtro]);

  const handleCambioDePagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPages) {
      setPage(nuevaPagina);
    }
  };

  const handleInputChange = (e) =>
    setFiltro({ ...filtro, name: e.target.value });

  const handleGeneroChange = (e) =>
    setFiltro({ ...filtro, genre: e.target.value });

  return (
    <main className="animes">
      <h2 className="animes-title">Animes Populares 🎌</h2>

      <div className="Search">
        <input
          className="Search-label"
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro.name}
          onChange={handleInputChange}
        />

        <label className="Search-label">
          Filtrar por Género:
          <select value={filtro.genre} onChange={handleGeneroChange}>
            <option value="">Todos</option>
            <option value="1">Acción</option>
            <option value="2">Aventura</option>
            <option value="4">Comedia</option>
            <option value="8">Drama</option>
            <option value="22">Romance</option>
            <option value="24">Sci-Fi</option>
          </select>
        </label>
      </div>

      <section className="Card">
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && animes.length === 0 && <p>No se encontraron animes.</p>}
        {animes.map((anime) => (
          <AnimeCards key={anime.mal_id} {...anime} />
        ))}
      </section>

      <BtnPaginacion
        paginaActual={page}
        totalPaginas={totalPages}
        cambiarPagina={handleCambioDePagina}
      />
    </main>
  );
};

export default Animes;
