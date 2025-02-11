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
    const { prompt } = JSON.parse(req.body);
    console.log("API: Generando video para el prompt:", prompt);
    // Simula el proceso de generación de video con una espera de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Retorna una URL de video de ejemplo (esto se reemplazará con la lógica real de generación de video)
    res.status(200).json({ videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" });
  } catch (error) {
    console.error("Error en API generate-video:", error);
    Sentry.captureException(error);
    res.status(500).json({ error: "Ocurrió un error al generar el video" });
  }
}