import React, { useState } from 'react';

function VoiceBot() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="voice-bot mt-4">
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        {isRecording ? 'Escuchando...' : 'Iniciar VoiceBot'}
      </button>
      {transcript && <p className="mt-2 text-gray-700">Transcripción: {transcript}</p>}
    </div>
  );
}

export default VoiceBot;