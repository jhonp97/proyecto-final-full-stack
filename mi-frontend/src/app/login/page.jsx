"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("null");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // envuamos los datos del formulario
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      const data = await response.json();
      console.log("datos del login", data);
      if (!response.ok) {
        throw new Error(data.msg, "error al iniciar sesion")
      }
      //guardo el usuario y su token y  luego lo mando a la pagina de perfil
      login(data.data, data.data.token)
      console.log("sesion iniciada ", data.data);
      router.push("/perfil");

    } catch (err) {
    setError(err.message, "error al iniciar sesion")
    console.error("Error al iniciar sesión:", err);
    } finally {
      setLoading(false)
    }

  }
  return (
    <section className="min-w-screen min-h-screen  p-6 flex flex-col items-center justify-center  text-white ">
      <h3 className="text-2xl font-semibold text-center mb-4">Iniciar sesión</h3>

      <form onSubmit={handleSubmit} className="w-full max-w-md m-8 p-7 border rounded-lg shadow-lg flex flex-col gap-8 bg-slate-800">
        {error && <p className="bg-red-500 text-center text-white p-3 rounded ">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@gmail.com"
            onChange={handleChange}
            value={formData.email}
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
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >{loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
};

export default Login;
