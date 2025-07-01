"use client"

const FiltroAnimes = ({filtro, setFiltro}) => {
    return ( 
        <div className="flex flex-col md:flex-row flex-wrap m-5 gap-4 items-end bg-slate-800 p-4 rounded-lg mb-8">

        {/* Filtro por Nombre */}
        <div className="flex-grow w-full md:w-auto">
          <label htmlFor="name-filter" className="block text-sm font-medium text-gray-300 mb-1">
            Buscar por nombre
          </label>
          <input
            id="name-filter"
            type="text"
            placeholder="Ej: Jujutsu Kaisen..."
            value={filtro.name}
            onChange={(e) => setFiltro({ ...filtro, name: e.target.value })}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* Filtro por Género */}
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-300 mb-1">
            Género
          </label>
          <select
            id="genre-filter"
            value={filtro.genres}
            onChange={(e) => setFiltro({ ...filtro, genres: e.target.value })}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="1">Acción</option>
            <option value="2">Aventura</option>
            <option value="4">Comedia</option>
            <option value="10">Fantasía</option>
            <option value="22">Romance</option>
          </select>
        </div>

        {/* Filtro por Estado */}
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-300 mb-1">
            Estado
          </label>
          <select
            id="status-filter"
            value={filtro.status}
            onChange={(e) => setFiltro({ ...filtro, status: e.target.value })}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="">Cualquiera</option>
            <option value="airing">En emisión</option>
            <option value="complete">Completado</option>
            <option value="upcoming">Próximamente</option>
          </select>
        </div>

        {/* Ordenar Por */}
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="orderby-filter" className="block text-sm font-medium text-gray-300 mb-1">
            Ordenar por
          </label>
          <select
            id="orderby-filter"
            value={filtro.order_by}
            onChange={(e) => setFiltro({ ...filtro, order_by: e.target.value })}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="score">Puntuación</option>
            <option value="popularity">Popularidad</option>
            <option value="episodes">Mas Episodios</option>
            <option value="favorites">Favoritos</option>
          </select>
        </div>

      </div>
     );
}
 
export default FiltroAnimes;