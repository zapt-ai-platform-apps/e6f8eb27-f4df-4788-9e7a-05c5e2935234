import React, { useState } from 'react';
import { generateVideo } from './services/videoService';
import * as Sentry from '@sentry/browser';

export default function App() {
  const [texto, setTexto] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciando generación de video");
    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const data = await generateVideo(texto);
      console.log("Video generado:", data.videoUrl);
      setVideoUrl(data.videoUrl);
    } catch (err) {
      console.error("Error en la solicitud de generación de video:", err);
      Sentry.captureException(err);
      setError(err.message || "Ocurrió un error al generar el video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="w-full max-w-xl p-6 bg-white rounded shadow h-full">
        <h1 className="text-2xl font-bold mb-4">Generador de Video Cinematográfico</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded box-border"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Ingrese el guión para su video cinematográfico"
          ></textarea>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar Video"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {videoUrl && (
          <div className="mt-4">
            <video controls className="w-full" src={videoUrl}></video>
            <a 
              href={videoUrl} 
              download 
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Descargar Video
            </a>
          </div>
        )}
        <footer className="mt-8 text-center">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-blue-600 cursor-pointer"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    </div>
  );
}