"use client"

export default function Loading() {
  return (
     <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <div className="loader"></div>
      <p className="mt-4 text-lg text-cyan-500 font-semibold">Cargando...</p>
    </section>
  );
}
