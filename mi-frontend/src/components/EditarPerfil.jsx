"use client"

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; 

const EditarPerfil = ({ user, onClose }) => {
  const { token, fetchUserData } = useAuth(); //obtengo el token desde el contexto
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (file) {
      formData.append("fotoPerfil", file);
    }

    try {
      // variable de entorno para la URL de la api (Fijarme que todo este CORRECTO despues)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/perfil`, { // Ruta completa
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data= await response.json();
      // console.log("mis datos actualizados son", data);
      if (!response.ok) {
         throw new Error(data.msg || `Error al actualizar el perfil  ${response.status}`);
      }
      console.log(`perfil actualizado con exito: ${data}`)

      // actualizar luego el estado 
       if (fetchUserData) { 
         await fetchUserData(); //actualizo los datos del usuario
       }
   

      onClose(); //para que se cierre despues de que se guarde
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/*nombre de usuario*/}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="Nombre de usuario"
            />
          </div>

          {/*biografia*/}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-1">Biografía</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="Un poco de ti..."
              rows="3"
            />
          </div>

          {/* subir imagen*/}
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-slate-300 mb-1">Foto de perfil</label>
            <input
              id="profilePicture"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
            />
          </div>

          {/*botones*/}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;