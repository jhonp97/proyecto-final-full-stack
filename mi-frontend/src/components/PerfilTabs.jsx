"use client";



const PerfilTabs = ({ activeTab, setActiveTab, user }) => {
     const tabs = ["favoritos", "privada", "reseñas", "amigos"];
    return ( 
         <div className="flex border-b border-slate-700 mt-8 mb-6 ">
            {tabs.map((tab)=>(
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-b-2 border-cyan-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                    {tab === 'privada' ? 'Lista Privada' : tab} {/* <-- 3. Muestra el nombre */}

                     {/* Notificación dinámica */}
                    {tab === 'amigos' && user?.solicitudAmistad?.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {user.solicitudAmistad.length}
                        </span>
                )}
                </button>
            ))}
        </div>
     );
}
 
export default PerfilTabs;