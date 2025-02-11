import * as Sentry from '@sentry/browser';

export async function generateTemplate({ description, templateType, language }) {
  const response = await fetch('/api/generate-template', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, templateType, language })
  });
  if (!response.ok) throw new Error("Error en la generación de la plantilla");
  const data = await response.json();
  return data;
}