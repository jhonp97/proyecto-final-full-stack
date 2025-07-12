"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const registro = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth(); // esto irá en login.jsx para autenticar al usuario

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // validacion para que las contraseñas coincidan
    if (formData.password !== formData.repeatPassword) {
      setError("las contraseñas no coinciden");
      return;
    }
    setLoading(true)

    try{
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        // envuamos los datos del formulario
        body: JSON.stringify({
          username: formData.username, 
          email :formData.email,
          password: formData.password,
        })
      });

      const data= await response.json();
      console.log("datos del registro", data);
      if(!response.ok){
        throw new Error(data.msg || "error en el registro")
      }
      //guardo el usuario y su token cuando ya esta registrado y autenticado luego lo mando a la pagina de perfil
      login(data.data, data.data.token)
      console.log("usuario registrado ", data.data);
      // console.log(login(data.data, data.data.token))
      router.push("/perfil");
      
    } catch(err){
      setError(err.message || "error al registrar usuario")
    } finally{
      setLoading(false)
    }

  }


  return (
    <section className="min-w-screen min-h-screen  p-6 flex flex-col items-center   text-white ">
      <h3 className="text-2xl font-semibold text-center mb-4">Registro</h3>

      <form
      onSubmit={handleSubmit}
        className="w-full max-w-md m-8 p-7 border rounded-lg shadow-lg flex flex-col gap-8 bg-slate-800">
          {error && <p className="bg-red-500 text-white p-3 rounded text-center">{error}</p>}


        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Nombre de usuario:
          </label>
          <input
            id="username"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="usuario123"
            required
            onChange={handleChange}
            value={formData.username}
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
            onChange={handleChange}
            value={formData.email}
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
            onChange={handleChange}
            value={formData.password}
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
            onChange={handleChange}
            value={formData.repeatPassword}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          {loading? "Registrando..." : "Registrar"}
        </button>
      </form>
    </section>
  );
};

export default registro;
