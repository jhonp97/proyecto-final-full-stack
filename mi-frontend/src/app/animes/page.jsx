"use client";

import AnimeCards from "@/components/AnimeCards";

import { useState, useEffect } from "react";

const Animes = () => {
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

   
 
  // const [filtro, setFiltro] = useState("all")
 
  const [filtro, setFiltro] = useState({
    name: "", //
    status: "", //  completado
    genre: "", // número de género
    order_by: "score", // para ordenar por puntuación
    sort: "desc", // orden descendente
  });

  useEffect(() => {
    const traerAnimes = async () => {
      try {
        setLoading(true);
        setError(null);

       
        const params = new URLSearchParams();
        params.append("page", page);
        if (filtro.name) params.append("q", filtro.name);
        if (filtro.status) params.append("status", filtro.status);
        if (filtro.genre) params.append("genres", filtro.genre);
        if (filtro.order_by) params.append("order_by", filtro.order_by);
        if (filtro.sort) params.append("sort", filtro.sort);

        //añadir solo los filtros que tengan valor
        Object.entries(filtro).forEach(([key, value]) => {
          if (value !== "") {
            params.append(key, value);
          }
        });

        const response = await fetch(
          `https://api.jikan.moe/v4/anime?${params.toString()}`
        );
        // const apiBase = import.meta.env.VITE_API_URL; // Ejemplo: "http://localhost:5000/api"
        // const response = await fetch(`${apiBase}/character?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`error ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        //guardar animes
        setAnimes(data.data);
       

        //guardar info de la pagina
       

        // console.log(data.data)
        // console.log(data.pagination)
      } catch (error) {
        console.log(`No se pudo cargar el archivo, error: ${error}`);
      }
      setLoading(false);
    };

    traerAnimes();
  }, [page, filtro]);

 
  // const cards = animes.map((a) => <AnimeCards key={animes.mal_id} anime={animes} />);

  const cards = (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-3" >
          {animes.map((anime) => (
            <AnimeCards key={anime.mal_id} anime={anime} />
          ))}
        </div>)

  

  return (
    <main className="animes">
      <h2 className="animes-title">Animes</h2>

      <div className="Search">
        <input
          className="Search-label"
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro.name}
          onChange={(e) => setFiltro({ ...filtro, name: e.target.value })}
        />

        

  
        <label className="Search-label">
          Filtrar por Genero:
          <select
            onChange={(e) => setFiltro({ ...filtro, genre: e.target.value })}
            value={filtro.genre}
          >
            <option value="">Todos</option>
            <option value="1">Acción</option>
            <option value="2">Aventura</option>
            <option value="4">Comedia</option>
            <option value="8">Drama</option>
          </select>
        </label>
      </div>

   


      <section className="max-w-7xl mx-auto p-3">
        {loading ? <p>Cargando...</p> : cards}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </section>
    </main>
  );
};

export default Animes;
