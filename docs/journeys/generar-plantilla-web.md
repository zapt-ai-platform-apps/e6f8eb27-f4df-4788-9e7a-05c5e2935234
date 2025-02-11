# Generar Plantilla Web

Este recorrido guía al usuario en la generación de una plantilla web mediante inteligencia artificial.

## Pasos

1. **Ingreso de la Descripción y Selección de Opciones**  
   El usuario ingresa una descripción del sitio web deseado en el área de texto. Además, selecciona el tipo de plantilla (Personal, Blog, Tienda Online o Iglesia) y el idioma (Español o English).

2. **Envío de la Solicitud**  
   Al hacer clic en el botón "Generar Plantilla", se inicia la solicitud de generación. Durante este proceso, el botón muestra "Generando..." y se deshabilita para evitar múltiples clics.

3. **Procesamiento y Previsualización**  
   - La aplicación realiza una llamada a la API en el endpoint `/api/generate-template` enviando la descripción, el tipo de plantilla y el idioma.
   - Se muestra un indicador de carga durante el proceso.
   - Una vez completado, se previsualiza la plantilla generada en un iframe.

4. **Descarga de la Plantilla**  
   Si la generación es exitosa, se muestra un botón "Descargar Plantilla" que permite al usuario guardar la plantilla en su PC.

5. **Manejo de Errores**  
   En caso de que ocurra un error durante el proceso, se muestra un mensaje de error en rojo indicando "Ocurrió un error al generar la plantilla".
