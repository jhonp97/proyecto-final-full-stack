"use client";

/** aqui manejo la paginacion, permitiendo que el usuario pueda navegar entre paginas
 * y pueda ver la pagina actual en la que está y el total de paginas que hay
 */

const BtnPaginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {

   const handleCambioPagina = (nuevaPagina) => {
    cambiarPagina(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "auto" }); // funcion oara volver a la parte superior de la pagina
  };



  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* boton anterior */}
      <button
        onClick={() => handleCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className={`px-3 py-1 rounded ${
          paginaActual === 1
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-800"
        }`}
      >
        ← Anterior
      </button>

        {/* pagina actual */}
      <span className="text-gray-300">
        Página {paginaActual} de {totalPaginas}
      </span>

        {/* boton de siguiente */}
      <button
        onClick={() => handleCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className={`px-3 py-1 rounded ${
          paginaActual === totalPaginas
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-800"
        }`}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default BtnPaginacion;
