import * as Sentry from '@sentry/browser';

export async function generateVideo(prompt) {
  const response = await fetch('/api/generate-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!response.ok) throw new Error("Error en la generación del video");
  const data = await response.json();
  return data;
}