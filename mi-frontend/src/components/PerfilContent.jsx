"use client";

import AnimeCards from "@/components/AnimeCards";
import MisReseñasCard from "@/components/MisReseñas";
import AmigosTab from "@/components/AmigosTab";

const PerfilContent = ({activeTab, user, reseñas, datosAmigos, onAccept, onReject}) => {
       switch (activeTab) {

      case "favoritos":
        // se verifica que el usuario y la lista estén
        if (!user?.favoritos || user?.favoritos.length === 0) {
          return <p className="text-slate-400"> Aún no has añadido ningún anime a tus favoritos. </p>     
        }
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/*uso el map sobre user.favoritos para mostrar el contenido*/}
              {user.favoritos.map((fav) => {
                const cardFavorito = {
                  mal_id: fav.animeId,
                  titles: [{ type: "Default", title: fav.title }],
                  images: { webp: { large_image_url: fav.image } },
                  score: fav.score,
                  genres: fav.genero ? [{ name: fav.genero }] : [],
                  synopsis: "Haz clic en 'Ver más' para ver los detalles.",
                };

                return <AnimeCards key={fav.animeId} anime={cardFavorito} />;
              })}
         </div>
     );
     case "reseñas":
         if (!reseñas || reseñas.length === 0){
            return <p className="text-slate-400">Aún no has realizado reseñas.</p>
         }
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols gap-4">
                {reseñas.map((review) => (
                  <MisReseñasCard key={review._id} review={review} />
                ))}
              </div>
        </div>
       );
       case "amigos":
      return <AmigosTab datosAmigos={datosAmigos} onAccept={onAccept} onReject={onReject} />;

      case "privada":
        if (!user?.listaPrivada || user.listaPrivada.length === 0) {
          return <p className="text-slate-400">La lista privada está vacía.</p>;
        }
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mi Lista Privada</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {user.listaPrivada.map((priv) => {
                const cardFavoritoPriv = {
                  mal_id: priv.animeId,
                  titles: [{ type: "Default", title: priv.title }],
                  images: { webp: { large_image_url: priv.image } },
                  score: priv.score,
                  genres: priv.genero ? [{ name: priv.genero }] : [],
                  synopsis: "Haz clic en 'Ver más' para ver los detalles.",
                };

                return (
                  <AnimeCards key={priv.animeId} anime={cardFavoritoPriv} />
                );
              })}
            </div>
          </div>
        );
}}
 
export default PerfilContent;