import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Volume2,
  Share,
  Send,
  User,
  Stethoscope
} from 'lucide-react';

interface Screen08TeleconsultationProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen08Teleconsultation: React.FC<Screen08TeleconsultationProps> = ({ onNavigate }) => {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'rx' | 'notes' | 'reports'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sharma', text: 'Namaste Sunita ji, please ask Sita ji if she has any neck stiffness or chills with the fever.', time: '12:31' },
    { sender: 'Sunita (ASHA)', text: 'Doctor sahab, chills are present especially at night. No neck pain.', time: '12:32' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'You', text: chatInput, time: '12:34' }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 sm:p-5 flex flex-col justify-between">
      {/* Top Status Bar */}
      <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span>KAVACH Tele-Clinic • eSanjeevani Link</span>
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="font-mono text-sm font-bold bg-slate-700/60 px-3 py-1 rounded text-slate-200">
            12:34
          </div>
          <button
            onClick={() => onNavigate(6)}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs shadow-xs"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Call</span>
          </button>
        </div>
      </div>

      {/* Main Call Viewport + Patient Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left: Doctor Video Stream with Patient PiP */}
        <div className="lg:col-span-8 bg-slate-800 rounded-2xl border border-slate-700 relative overflow-hidden flex flex-col justify-between p-4 shadow-xl min-h-[420px]">
          {/* Top video label */}
          <div className="flex items-center justify-between text-xs text-white z-10">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Dr. Manoj Sharma (MD General Medicine) • CHC Rampur
            </span>
          </div>

          {/* Simulated Doctor Video Canvas */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900">
            <div className="text-center space-y-3">
              <div className="w-28 h-28 rounded-full bg-emerald-800/40 border-2 border-emerald-400/50 flex items-center justify-center mx-auto shadow-2xl">
                <User className="w-14 h-14 text-emerald-300" />
              </div>
              <div>
                <div className="text-base font-bold text-white">Dr. Manoj Sharma</div>
                <div className="text-xs text-emerald-400 font-medium">Consultation in Progress</div>
              </div>
            </div>
          </div>

          {/* Patient PiP Thumbnail (Bottom Right matching Screen 8) */}
          <div className="absolute right-4 bottom-18 w-36 sm:w-44 h-28 sm:h-32 bg-slate-900 rounded-xl border-2 border-slate-600 shadow-2xl overflow-hidden flex flex-col justify-between p-2 z-20">
            <div className="text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-white font-medium w-fit">
              Sita Sharma (Patient)
            </div>
            <div className="flex items-center justify-center flex-1">
              <div className="w-10 h-10 rounded-full bg-rose-800/60 flex items-center justify-center text-xs font-bold text-rose-200">
                SS
              </div>
            </div>
            <div className="text-[9px] text-emerald-400 font-mono text-right">
              ASHA Tablet • Rampur
            </div>
          </div>

          {/* Bottom Floating Video Call Controls Bar */}
          <div className="relative z-20 flex items-center justify-center gap-3 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 w-fit mx-auto mt-auto">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-2.5 rounded-full transition-colors ${
                micActive ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-600 text-white'
              }`}
            >
              {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setVideoActive(!videoActive)}
              className={`p-2.5 rounded-full transition-colors ${
                videoActive ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-600 text-white'
              }`}
            >
              {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
            <button className="p-2.5 rounded-full bg-slate-700 text-white hover:bg-slate-600">
              <Volume2 className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-full bg-slate-700 text-white hover:bg-slate-600">
              <Share className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate(6)}
              className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md ml-2"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Patient Summary & Clinical Tabs */}
        <div className="lg:col-span-4 bg-slate-800 rounded-2xl border border-slate-700 p-4 flex flex-col justify-between shadow-xl space-y-4 text-xs">
          {/* Patient Summary Card matching Screen 8 */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                Patient Summary
              </h3>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold">
                ⚠️ URGENT
              </span>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                SS
              </div>
              <div>
                <div className="font-bold text-white text-sm">Sita Sharma</div>
                <div className="text-[11px] text-slate-400">42 years • Female • KVC-1024</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Symptoms:</span>
                <span className="text-slate-200 font-medium">Fever, Weakness, Loss of appetite</span>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Diagnostics:</span>
                <span className="text-amber-300 font-medium">CBC - Pending</span>
              </div>
            </div>
          </div>

          {/* Clinical Work Tabs matching Screen 8: Chat | Prescriptions | Notes | Reports */}
          <div className="flex-1 flex flex-col bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
            {/* Tab header buttons */}
            <div className="flex items-center border-b border-slate-700 bg-slate-900 text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 font-semibold text-center ${
                  activeTab === 'chat' ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('rx')}
                className={`flex-1 py-2 font-semibold text-center ${
                  activeTab === 'rx' ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Rx (Prescriptions)
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 font-semibold text-center ${
                  activeTab === 'notes' ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex-1 py-2 font-semibold text-center ${
                  activeTab === 'reports' ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Reports
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              {activeTab === 'chat' && (
                <div className="space-y-2">
                  {messages.map((m, i) => (
                    <div key={i} className={`p-2 rounded-lg ${
                      m.sender === 'You' ? 'bg-emerald-800/50 ml-6 text-right' : 'bg-slate-800 mr-6'
                    }`}>
                      <div className="text-[10px] text-slate-400 font-bold">{m.sender} • {m.time}</div>
                      <div className="text-slate-200 mt-0.5">{m.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rx' && (
                <div className="space-y-2">
                  <div className="p-2 bg-slate-800 rounded border border-slate-700">
                    <span className="font-bold text-white block">1. Tab Paracetamol 650mg</span>
                    <span className="text-slate-400 text-[11px]">1 tab thrice daily for 3 days</span>
                  </div>
                  <div className="p-2 bg-slate-800 rounded border border-slate-700">
                    <span className="font-bold text-white block">2. Tab ORS Sachet</span>
                    <span className="text-slate-400 text-[11px]">Mix in 1L clean water, drink throughout day</span>
                  </div>
                  <button
                    onClick={() => alert('Prescription digitally signed and synced to ASHA app.')}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded"
                  >
                    Digitally Sign Rx
                  </button>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Suspected acute viral syndrome vs early malaria. Advised urgent physical arrival at CHC Rampur for CBC and peripheral blood smear test tomorrow morning.
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="text-slate-400 text-center py-4">
                  No prior scanned documents. Pending CBC report.
                </div>
              )}
            </div>

            {/* Chat Send Box (when chat active) */}
            {activeTab === 'chat' && (
              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-700 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message to doctor..."
                  className="flex-1 px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-400"
                />
                <button type="submit" className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
