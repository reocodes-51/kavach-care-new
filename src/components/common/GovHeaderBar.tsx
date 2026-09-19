import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PhoneCall, Eye, Volume2, VolumeX } from 'lucide-react';

export const GovHeaderBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { textSize, setTextSize, highContrast, toggleHighContrast, isSpeaking, stopSpeaking, speakText } = useAccessibility();

  const handleVoiceHelp = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speechContent = language === 'hi'
        ? 'कवच केयर में आपका स्वागत है। यह राष्ट्रीय ग्रामीण स्वास्थ्य निरंतरता और रेफरल निगरानी मंच है। किसी भी आपातकाल के लिए 108 या 104 पर कॉल करें।'
        : language === 'mr'
        ? 'कवच केअर मध्ये आपले स्वागत आहे. हे राष्ट्रीय ग्रामीण आरोग्य रेफरल सातत्य व्यासपीठ आहे. कोणत्याही आपत्कालीन मदतीसाठी 108 वर कॉल करा.'
        : 'Welcome to KAVACH CARE. National Rural Health Continuity and Closed-Loop Referral Platform. For emergency dial 108 or 104.';
      speakText(speechContent, language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN');
    }
  };

  return (
    <div className="w-full bg-[#0B2540] text-slate-200 text-xs border-b border-[#1C5182] no-print">
      {/* Tricolor Government Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Government Affiliation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-health-green animate-pulse" />
            <span className="text-white font-semibold">{t('govIndia')}</span>
            <span className="text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">{t('moHfw')}</span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:inline text-emerald-300 font-medium">{t('nhm')}</span>
          </div>
        </div>

        {/* Middle: Helplines Pill */}
        <div className="hidden xl:flex items-center gap-2 bg-[#123B63] px-2.5 py-0.5 rounded border border-[#235587] text-[11px] text-slate-200">
          <PhoneCall className="w-3 h-3 text-[#FF9933]" />
          <span>{t('emergencyHelpline')}</span>
        </div>

        {/* Right: Accessibility & Language Controls */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Voice Assistance Button */}
          <button
            onClick={handleVoiceHelp}
            title="Listen Page Info (Voice Assistant)"
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-[#123B63] hover:bg-[#1a4b7a] text-slate-200 border-[#2b5e91]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Voice'}</span>
          </button>

          {/* Text Size Resizer (Standard GOI portal standard: A- A A+) */}
          <div className="flex items-center bg-[#123B63] border border-[#2b5e91] rounded px-1 py-0.5 gap-1">
            <button
              onClick={() => setTextSize('sm')}
              aria-label="Decrease font size"
              className={`px-1 rounded hover:bg-[#1f5080] ${textSize === 'sm' ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              A-
            </button>
            <span className="text-slate-500 text-[10px]">|</span>
            <button
              onClick={() => setTextSize('md')}
              aria-label="Standard font size"
              className={`px-1 rounded hover:bg-[#1f5080] ${textSize === 'md' ? 'text-white font-bold' : 'text-slate-300'}`}
            >
              A
            </button>
            <span className="text-slate-500 text-[10px]">|</span>
            <button
              onClick={() => setTextSize('lg')}
              aria-label="Increase font size"
              className={`px-1 rounded hover:bg-[#1f5080] ${textSize === 'lg' ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              A+
            </button>
          </div>

          {/* Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            title="Toggle High Contrast"
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] ${
              highContrast ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' : 'bg-[#123B63] border-[#2b5e91] text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t('contrast')}</span>
          </button>

          {/* Language Switcher (English | हिन्दी | मराठी) */}
          <div className="flex items-center bg-[#123B63] border border-[#2b5e91] rounded px-1 py-0.5 text-[11px] gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded font-medium ${
                language === 'en' ? 'bg-[#FF9933] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded font-medium ${
                language === 'hi' ? 'bg-[#FF9933] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded font-medium ${
                language === 'mr' ? 'bg-[#FF9933] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
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
