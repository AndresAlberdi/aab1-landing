# AAB1 Landing

Esta aplicación utiliza Firebase App Check con reCAPTCHA Enterprise para proteger la invocación a la API de Gemini (mediante una Cloud Function `onCall`).

## Desarrollo Local (App Check)

Para que el asistente de IA responda desde `localhost`, es **obligatorio** proveer un token de debug para App Check, ya que reCAPTCHA Enterprise rechazará de forma predeterminada las peticiones provenientes de dominios no verificados (como localhost).

Debes establecer `self.FIREBASE_APPCHECK_DEBUG_TOKEN = true` en tu consola del navegador antes de inicializar Firebase, o usar el token generado que aparece en la consola del navegador y registrarlo en la Consola de Firebase.

Ejemplo en la consola del navegador web:
\`\`\`js
self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
\`\`\`
O también puedes configurarlo estáticamente en tu entorno local.
