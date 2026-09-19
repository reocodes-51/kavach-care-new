import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TextSize = 'sm' | 'md' | 'lg';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  // Speech Recognition (Voice Input)
  isListening: boolean;
  voiceTranscript: string;
  startListening: (onResult?: (text: string) => void) => void;
  stopListening: () => void;
  // Text to Speech
  speakText: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    try {
      return (localStorage.getItem('kavach_text_size') as TextSize) || 'md';
    } catch {
      return 'md';
    }
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kavach_contrast') === 'true';
    } catch {
      return false;
    }
  });

  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply Font Size directly to root html element for instant visual scaling
  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'sm') {
      root.style.fontSize = '14px';
    } else if (textSize === 'lg') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
    try {
      localStorage.setItem('kavach_text_size', textSize);
    } catch {
      // ignore
    }
  }, [textSize]);

  // Apply High Contrast class to document root
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      document.body.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('high-contrast');
    }
    try {
      localStorage.setItem('kavach_contrast', highContrast.toString());
    } catch {
      // ignore
    }
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  // Web Speech API: Speech Recognition
  const startListening = useCallback((onResult?: (text: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser. Please try Google Chrome or Microsoft Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = document.documentElement.lang === 'mr' ? 'mr-IN' : document.documentElement.lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setVoiceTranscript(text);
        if (onResult) {
          onResult(text);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  // Text-to-speech
  const speakText = (text: string, lang = 'hi-IN') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize: setTextSizeState,
        highContrast,
        toggleHighContrast,
        isListening,
        voiceTranscript,
        startListening,
        stopListening,
        speakText,
        isSpeaking,
        stopSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
