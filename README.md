# Aniverse - El Frontend

Ésta es la parte visual del proyecto Aniverse, es una web hecha con NextJs Y React con el objetivo de ser un tipo de red social para fans del anime.

### Lo que puedes hacer:

* En la pagina de inicio podrás ver los animes mas populares del momento
*  Puedes buscar cualquier anime gracias a la API de Jikan y filtrarlos
*  Crear tu perfil, subir tu foto y poner una biografia (puedes editar esos datos cuando quieras)
*  Guardar tus animes favoritos en una lista pública o en una lista privada
* calificar y poner reseñas a cualquier anime, y ver los comentarios de otro
* Puedes hacer amigos, enviando, recibiendo y aceptando solicitudes de amistad.

  ### Estructura

  ```bashh
+---public
|   |   file.svg
|   |   globe.svg
|   |   next.svg
|   |   vercel.svg
|   |   window.svg
|   |   
|   \---img
|           aniverse-logo-removebg-preview.png
|           aniverse-logo.png
|           avatar1.PNG
|           logo-eye.png
|           
\---src
|    +---app
|    |   |   globals.css
|    |   |   icon.png
|    |   |   layout.js
|    |   |   loading.jsx
|    |   |   not-found.jsx
|    |   |   page.js
|    |   |   
|    |   +---animes
|    |   |   |   page.jsx
|    |   |   |   
|    |   |   \---[id]
|    |   |           page.jsx
|    |   |           
|    |   +---login
|    |   |       page.jsx
|    |   |       
|    |   +---perfil
|    |   |   |   page.jsx
|    |   |   |   
|    |   |   \---[username]
|    |   |           page.jsx
|    |   |           
|    |   +---politicas
|    |   |       page.jsx
|    |   |       
|    |   \---registro
|    |           page.jsx
|    |           
|    +---assets
|    |       hero-aniverse1-2.png
|    |       
|    +---components
|    |       AmigosTab.jsx
|    |       AnimeCards.jsx
|    |       BtnPaginacion.jsx
|    |       BtnPriv.jsx
|    |       ComentBox.jsx
|    |       EditarPerfil.jsx
|    |       FavoritoBtn.jsx
|    |       FiltroAnimes.jsx
|    |       Footer.jsx
|    |       Header.jsx
|    |       Hero.jsx
|    |       Loading.jsx
|    |       MisRese±as.jsx
|    |       PerfilContent.jsx
|    |       PerfilTabs.jsx
|    |       
|    \---context
|            AuthContext.jsx
|
|   .env.local
|   .gitignore
|   eslint.config.mjs
|   estructura.txt
|   jsconfig.json
|   next.config.mjs
|   package-lock.json
|   package.json
|   postcss.config.mjs
|   README.md
|   tailwind.config.js
         
  ```

### Tecnologias que usé:
* **NextJs y React:** para construir toda la interfaz y poder usar el App router porque me parece mas facil de usar
* **Tailwind CSS:** para ir probando y estilizando todos mis componentes mientras los hacia para no tener demasiadas lineas en uno varios archivos CSS
* ** React context** para que la aplicacion sepa y recuerde al usuario despues de iniciar sesion
* **React-icons** para poder usar los iconos en toda la pagina
* **Fetch** con async await para todas las llamadas al back

### Puesta en marcha

1. Clonar el repositorio
2. Asegurarse de que el backend este corriendo primero
3.instalar las dependencias: `npm install'
4.Crear un archivo `.env.local`y añadir la URL del backend, ejemplo:
``` bash
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```.
5. ejecutarlo con 'npm run dev'
6. Abrir `http://localhost:3000` en el navegador y disfrutar de la web 
