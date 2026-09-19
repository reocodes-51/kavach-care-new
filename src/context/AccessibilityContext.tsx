import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'sm' | 'md' | 'lg';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  speakText: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    return (localStorage.getItem('kavach_text_size') as TextSize) || 'md';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('kavach_contrast') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'sm') root.style.setProperty('--font-scale', '92%');
    else if (textSize === 'md') root.style.setProperty('--font-scale', '100%');
    else if (textSize === 'lg') root.style.setProperty('--font-scale', '114%');
    localStorage.setItem('kavach_text_size', textSize);
  }, [textSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('kavach_contrast', highContrast.toString());
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  const speakText = (text: string, lang = 'hi-IN') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
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
        speakText,
        isSpeaking,
        stopSpeaking,
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
