# Generar Video Cinematográfico

Este recorrido guía al usuario en la generación de un video cinematográfico a partir de un guión en español.

## Pasos

1. **Ingreso del Guión**  
   El usuario escribe o pega el texto descriptivo del video en el área de texto que dice "Ingrese el guión para su video cinematográfico".

2. **Envío de la Solicitud**  
   Al hacer clic en el botón "Generar Video", se inicia la solicitud de generación. Durante este proceso, el botón muestra "Generando..." y se deshabilita para evitar múltiples clics.

3. **Procesamiento y Visualización**  
   - La aplicación realiza una llamada a la API en el endpoint `/api/generate-video` enviando el texto ingresado.
   - Se muestra un indicador de carga durante el proceso.
   - Una vez completado, el video generado se previsualiza en un reproductor integrado en la página.

4. **Descarga del Video**  
   Si la generación es exitosa, se muestra un botón "Descargar Video" que permite al usuario guardar el video en su PC.

5. **Manejo de Errores**  
   En caso de que ocurra un error durante el proceso, se muestra un mensaje de error en rojo indicando "Ocurrió un error al generar el video".

---
Con este recorrido, el usuario experimenta una interfaz clara y concisa para transformar su guión en un video cinematográfico, con retroalimentación visual en cada etapa.