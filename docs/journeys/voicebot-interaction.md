# Interacción con VoiceBot

Este recorrido guía al usuario en la interacción con el VoiceBot, una función que permite utilizar comandos de voz para comunicarse con la aplicación.

## Pasos

1. **Visualización del Botón**
   1. El usuario observa un botón flotante de micrófono en la esquina inferior derecha de la pantalla.
   2. El botón muestra "Hablar" cuando el VoiceBot está inactivo.

2. **Activación y Permisos**
   1. Al hacer clic en el botón, el VoiceBot solicita permiso para acceder al micrófono (si no se ha concedido previamente).
   2. Una vez aceptado, el VoiceBot se activa y cambia el botón a "Detener" para indicar que está escuchando.

3. **Transcripción y Respuesta**
   1. Mientras el VoiceBot está activo, el usuario puede hablar y el sistema transcribe lo dicho.
   2. La transcripción se muestra en una pequeña ventana sobre el botón.
   3. Tras finalizar la captura, el VoiceBot utiliza síntesis de voz para decir "He escuchado: [transcripción]".

4. **Desactivación**
   1. El usuario puede hacer clic nuevamente en el botón para detener el reconocimiento.
   2. El VoiceBot se desactiva y el botón vuelve a mostrar "Hablar".

5. **Manejo de Errores**
   1. En caso de que el reconocimiento falle o se deniegue el acceso al micrófono, se mostrará un mensaje de error.
   2. Los errores se registran en Sentry y se notifican en la interfaz.

---
Este recorrido asegura que el usuario comprenda cómo interactuar con la función de voz y cómo el sistema provee retroalimentación inmediata tanto en texto como en audio.