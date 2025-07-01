"use client";

const BtnPaginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {

   const handleCambioPagina = (nuevaPagina) => {
    cambiarPagina(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "auto" }); // funcion oara volver a la parte superior de la pagina
  };



  return (
    <div className="flex items-center justify-center gap-4 mt-6">
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

      <span className="text-gray-300">
        Página {paginaActual} de {totalPaginas}
      </span>

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
