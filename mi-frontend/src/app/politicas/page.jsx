"use client";

export default function Politicas() {
  return (
    <section className="text-white max-w-5xl mx-auto px-4 py-10 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Políticas de Privacidad y Términos de Uso de AniVerse
      </h1>
      <p className="text-sm text-gray-400 text-center mb-10">
        Última actualización: 21 de julio de 2025
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Términos y Condiciones de Uso</h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.1. Aceptación de los Términos</h3>
      <p>
        Al crear una cuenta o utilizar la plataforma AniVerse (en adelante, "el Servicio"), confirmas que has leído, entendido y aceptado vincularte a los presentes Términos y Condiciones. Si no estás de acuerdo, no debes utilizar el Servicio.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.2. Tu Cuenta en AniVerse</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Edad mínima:</strong> Debes tener al menos 13 años (o la edad mínima legal en tu país).</li>
        <li><strong>Seguridad:</strong> Eres responsable de tu contraseña y actividad. Notifícanos si detectas accesos no autorizados.</li>
        <li><strong>Información veraz:</strong> Al registrarte, debes proporcionar datos reales y actualizados.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.3. Contenido del Usuario</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Responsabilidad:</strong> Eres responsable del contenido que publiques.</li>
        <li><strong>Licencia:</strong> Nos das permiso para mostrar tu contenido dentro de AniVerse.</li>
        <li><strong>Moderación:</strong> Podemos eliminar contenido que consideremos inapropiado.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.4. Uso Aceptable del Servicio</h3>
      <p>No puedes utilizar AniVerse para:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Realizar actividades ilegales o fraudulentas.</li>
        <li>Acosar o suplantar usuarios.</li>
        <li>Enviar spam o publicidad.</li>
        <li>Acceder sin permiso a otras cuentas.</li>
        <li>Infringir derechos de autor.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.5. Contenido de Terceros y API de Jikan</h3>
      <p>
        Usamos la API de Jikan (datos de MyAnimeList). No somos responsables del contenido o disponibilidad de dicha información. Todo el contenido de animes pertenece a sus respectivos propietarios.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">1.6. Terminación de la Cuenta</h3>
      <p>
        Podemos suspender o eliminar tu cuenta si violas estos términos, sin previo aviso.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">2. Política de Privacidad</h2>
      <p>
        Tu privacidad es importante. Aquí explicamos qué datos recogemos y cómo los usamos.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.1. ¿Qué Información Recopilamos?</h3>
      <p><strong>Información directa:</strong></p>
      <ul className="list-disc list-inside space-y-1">
        <li>Al registrarte: usuario, correo y contraseña (cifrada).</li>
        <li>En tu perfil: biografía, foto, etc.</li>
        <li>Al interactuar: reseñas, favoritos, solicitudes.</li>
      </ul>

      <p className="mt-2"><strong>Información automática:</strong></p>
      <ul className="list-disc list-inside space-y-1">
        <li>Uso del servicio: páginas visitadas, clics.</li>
        <li>Datos técnicos: IP, navegador, sistema operativo.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.2. ¿Cómo Usamos tu Información?</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Para mejorar el Servicio y mostrar contenido relevante.</li>
        <li>Para personalizar tu experiencia.</li>
        <li>Para proteger la plataforma contra abusos.</li>
        <li>Para enviarte notificaciones importantes (no spam).</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.3. ¿Con Quién Compartimos tu Información?</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>No vendemos tus datos.</li>
        <li>Otros usuarios ven tu perfil público y reseñas.</li>
        <li>Podemos compartir datos si lo exige la ley.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.4. ¿Cómo Protegemos tus Datos?</h3>
      <p>
        Usamos cifrado, limitación de acceso, y otras medidas de seguridad para proteger tu información personal.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.5. Tus Derechos sobre tus Datos</h3>
      <p>Puedes:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Acceder a tus datos.</li>
        <li>Rectificarlos.</li>
        <li>Solicitar su eliminación.</li>
        <li>Oponerte al procesamiento de ciertos datos.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.6. Cambios en esta Política</h3>
      <p>
        Podemos actualizar esta política. Te avisaremos si hay cambios importantes.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">2.7. Contacto</h3>
      <p>
        Si tienes dudas, escríbenos a: <a href="mailto:legal@aniverse.com" className="text-cyan-400 underline">legal@aniverse.com</a>
      </p>
    </section>
  );
}
