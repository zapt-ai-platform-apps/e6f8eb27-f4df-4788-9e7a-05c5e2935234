import { useState, useRef, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = navigator.language || 'en-US';
        recognition.onresult = (event) => {
          const result = event.results[0][0].transcript;
          console.log('VoiceBot: Transcription result:', result);
          setTranscript(result);
          try {
            const utterance = new SpeechSynthesisUtterance('He escuchado: ' + result);
            speechSynthesis.speak(utterance);
          } catch (synthError) {
            console.error('VoiceBot: Speech synthesis error:', synthError);
            Sentry.captureException(synthError);
          }
        };
        recognition.onerror = (event) => {
          console.error('VoiceBot: Error during recognition:', event.error);
          Sentry.captureException(new Error('Speech recognition error: ' + event.error));
          setError('Error: ' + event.error);
          setIsListening(false);
        };
        recognition.onend = () => {
          console.log('VoiceBot: Recognition ended');
          setIsListening(false);
        };
        recognitionRef.current = recognition;
      } catch (initError) {
        console.error('VoiceBot: Initialization error:', initError);
        Sentry.captureException(initError);
        setError('No se pudo inicializar el reconocimiento de voz.');
      }
    } else {
      setError('El reconocimiento de voz no es soportado en este navegador.');
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('El reconocimiento de voz no está disponible.');
      return;
    }
    if (!isListening) {
      console.log('VoiceBot: Starting to listen');
      setTranscript('');
      setError('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (startError) {
        console.error('VoiceBot: Error starting recognition:', startError);
        Sentry.captureException(startError);
        setError('No se pudo iniciar el reconocimiento de voz.');
      }
    } else {
      console.log('VoiceBot: Stopping listening');
      try {
        recognitionRef.current.stop();
      } catch (stopError) {
        console.error('VoiceBot: Error stopping recognition:', stopError);
        Sentry.captureException(stopError);
      }
      setIsListening(false);
    }
  };

  return { isListening, transcript, error, toggleListening };
}