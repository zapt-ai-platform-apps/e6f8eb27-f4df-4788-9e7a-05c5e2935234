import React, { useState } from 'react';
import { generateTemplate } from './services/templateService';
import * as Sentry from '@sentry/browser';

export default function App() {
  const [description, setDescription] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [language, setLanguage] = useState('Español');
  const [templateHtml, setTemplateHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciando generación de plantilla");
    setLoading(true);
    setError(null);
    setTemplateHtml(null);

    try {
      const data = await generateTemplate({ description, templateType, language });
      console.log("Plantilla generada:", data.templateHtml);
      setTemplateHtml(data.templateHtml);
    } catch (err) {
      console.error("Error en la solicitud de generación de plantilla:", err);
      Sentry.captureException(err);
      setError(err.message || "Ocurrió un error al generar la plantilla");
    } finally {
      setLoading(false);
    }
  };

  const downloadUrl = templateHtml
    ? "data:text/html;charset=utf-8," + encodeURIComponent(templateHtml)
    : "#";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="w-full max-w-xl p-6 bg-white rounded shadow h-full">
        <h1 className="text-2xl font-bold mb-4">Generador de Plantillas Web</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded box-border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción de la plantilla"
          ></textarea>
          <div className="mt-2">
            <label className="block mb-1">Tipo de Plantilla</label>
            <select
              className="w-full p-2 border rounded box-border"
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
            >
              <option value="">-- Seleccione Tipo de Plantilla --</option>
              <option value="Personal">Personal</option>
              <option value="Blog">Blog</option>
              <option value="Tienda Online">Tienda Online</option>
              <option value="Iglesia">Iglesia</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="block mb-1">Idioma</label>
            <select
              className="w-full p-2 border rounded box-border"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="Español">Español</option>
              <option value="English">English</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar Plantilla"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {templateHtml && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Previsualización</h2>
            <iframe
              title="Previsualización de la Plantilla"
              srcDoc={templateHtml}
              className="w-full h-64 border"
            ></iframe>
            <a 
              href={downloadUrl} 
              download="plantilla.html" 
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Descargar Plantilla
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