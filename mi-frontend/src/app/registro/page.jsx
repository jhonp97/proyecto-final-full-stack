const registro = () => {
  return (
    <section className="min-w-screen min-h-screen  p-6 flex flex-col items-center   text-white ">
      <h3 className="text-2xl font-semibold text-center mb-4">Registro</h3>

      <form
        method="POST"
        className="w-full max-w-md m-8 p-7 border rounded-lg shadow-lg flex flex-col gap-8 bg-slate-800"
      >
        <div className="flex flex-col">
          <label htmlFor="text" className="mb-1 font-medium">
            Nombre:
          </label>
          <input
            id="text"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Juan Perez"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="text" className="mb-1 font-medium">
            Nombre de usuario:
          </label>
          <input
            id="text"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="usuario123"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="repeatPassword" className="mb-1 font-medium">
            Repetir Contraseña:
          </label>
          <input
            id="repeatPassword"
            type="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          Entrar
        </button>
      </form>
    </section>
  );
};

export default registro;
