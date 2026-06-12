import { useEffect, useState } from 'react';

export default function useVoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const t = event.results[current][0].transcript.toLowerCase();
      setTranscript(t);

      if (t.includes('scroll down')) {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (t.includes('scroll up')) {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      } else if (t.includes('secret lab')) {
        // Trigger secret lab
        const event = new KeyboardEvent('keydown', {
          key: 'd',
          ctrlKey: true,
          shiftKey: true,
        });
        window.dispatchEvent(event);
      }
    };

    if (isListening) {
      recognition.start();
    }

    return () => recognition.stop();
  }, [isListening]);

  const toggleListening = () => setIsListening(!isListening);

  return { isListening, toggleListening, transcript };
}
