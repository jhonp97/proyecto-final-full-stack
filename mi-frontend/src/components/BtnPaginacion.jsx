"use client";

// este es mi componente para la paginacion 

const BtnPaginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => cambiarPagina(paginaActual - 1)}
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
        onClick={() => cambiarPagina(paginaActual + 1)}
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
