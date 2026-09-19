import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PhoneCall, Eye, Mic, MicOff } from 'lucide-react';

export const GovHeaderBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const {
    textSize,
    setTextSize,
    highContrast,
    toggleHighContrast,
    isListening,
    startListening,
    stopListening
  } = useAccessibility();

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((recognizedText) => {
        // Find any search input or referral tracker on the page and fill it
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.value = recognizedText;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }
  };

  return (
    <div className="w-full bg-[#0B2540] text-slate-200 text-xs border-b border-[#1C5182] no-print">
      {/* Tricolor Government Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Government Affiliation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">भारत सरकार | Government of India</span>
            <span className="text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">MoHFW</span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:inline text-emerald-300 font-medium">NHM • ABDM</span>
          </div>
        </div>

        {/* Middle: Helplines Pill */}
        <div className="hidden xl:flex items-center gap-3 bg-[#123B63] px-2.5 py-0.5 rounded border border-[#235587] text-[11px] text-slate-200">
          <PhoneCall className="w-3 h-3 text-[#FF9933]" />
          <span>{t('emergencyHelpline')}</span>
          <span className="text-slate-400">|</span>
          <span>{t('healthInfoHelpline')}</span>
          <span className="text-slate-400">|</span>
          <span>{t('maternalHelpline')}</span>
        </div>

        {/* Right: Accessibility & Language Controls */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Voice Speech-to-Text Button */}
          <button
            onClick={handleVoiceToggle}
            title="Speech Recognition Assistant"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] border transition-all ${
              isListening
                ? 'bg-red-600 text-white border-red-500 font-bold animate-pulse shadow-xs'
                : 'bg-[#123B63] hover:bg-[#1a4b7a] text-slate-200 border-[#2b5e91]'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-3.5 h-3.5 animate-bounce text-white" />
                <span>{t('listening')}</span>
              </>
            ) : (
              <>
                <MicOff className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">{t('voiceAssistance')}</span>
              </>
            )}
          </button>

          {/* Text Size Resizer: A- A A+ */}
          <div className="flex items-center bg-[#123B63] border border-[#2b5e91] rounded px-1.5 py-0.5 gap-1.5 text-[11px]">
            <button
              onClick={() => setTextSize('sm')}
              aria-label="Decrease font size"
              className={`px-1 rounded hover:bg-[#1f5080] transition-colors ${
                textSize === 'sm' ? 'text-amber-400 font-bold underline' : 'text-slate-300'
              }`}
            >
              A-
            </button>
            <span className="text-slate-500 text-[10px]">|</span>
            <button
              onClick={() => setTextSize('md')}
              aria-label="Standard font size"
              className={`px-1 rounded hover:bg-[#1f5080] transition-colors ${
                textSize === 'md' ? 'text-white font-bold underline' : 'text-slate-300'
              }`}
            >
              A
            </button>
            <span className="text-slate-500 text-[10px]">|</span>
            <button
              onClick={() => setTextSize('lg')}
              aria-label="Increase font size"
              className={`px-1 rounded hover:bg-[#1f5080] transition-colors ${
                textSize === 'lg' ? 'text-amber-400 font-bold underline' : 'text-slate-300'
              }`}
            >
              A+
            </button>
          </div>

          {/* Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            title="Toggle High Contrast Mode"
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] transition-colors ${
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : 'bg-[#123B63] border-[#2b5e91] text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t('contrast')}</span>
          </button>

          {/* Language Switcher: English | हिन्दी | मराठी */}
          <div className="flex items-center bg-[#123B63] border border-[#2b5e91] rounded px-1 py-0.5 text-[11px] gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'en'
                  ? 'bg-[#FF9933] text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'hi'
                  ? 'bg-[#FF9933] text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'mr'
                  ? 'bg-[#FF9933] text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
