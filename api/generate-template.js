import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: "Método no permitido" });
      return;
    }
    const { description, templateType, language } = JSON.parse(req.body);
    console.log("API: Generando plantilla para la descripción:", description);
    // Simula el proceso de generación de plantilla con una espera de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Genera un ejemplo de plantilla HTML dinámicamente
    const templateHtml = `
<!DOCTYPE html>
<html lang="${language === 'English' ? 'en' : 'es'}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plantilla ${templateType}</title>
    <style>
      body { margin: 0; padding: 20px; font-family: sans-serif; }
      h1 { color: #333; }
    </style>
  </head>
  <body>
    <h1>Plantilla: ${templateType}</h1>
    <p>Descripción: ${description}</p>
    <p>Idioma: ${language}</p>
  </body>
</html>
    `;
    res.status(200).json({ templateHtml });
  } catch (error) {
    console.error("Error en API generate-template:", error);
    Sentry.captureException(error);
    res.status(500).json({ error: "Ocurrió un error al generar la plantilla" });
  }
}