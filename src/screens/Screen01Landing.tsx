import React from 'react';
import {
  Stethoscope,
  MapPin,
  Share2,
  Video,
  FlaskConical,
  CalendarCheck,
  ArrowRight,
  Shield,
  Users,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface Screen01LandingProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen01Landing: React.FC<Screen01LandingProps> = ({ onNavigate }) => {
  const featurePills = [
    {
      screen: 4,
      title: 'AI Triage',
      desc: 'Early guidance, better outcomes',
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 1'
    },
    {
      screen: 5,
      title: 'Find Care',
      desc: 'Nearest facilities and services',
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 2'
    },
    {
      screen: 6,
      title: 'Referrals',
      desc: 'Seamless continuity of care',
      icon: <Share2 className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 3'
    },
    {
      screen: 8,
      title: 'Teleconsultation',
      desc: 'Access specialist care remotely',
      icon: <Video className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 4'
    },
    {
      screen: 10,
      title: 'Diagnostics',
      desc: 'Book and track tests',
      icon: <FlaskConical className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 5'
    },
    {
      screen: 12,
      title: 'Follow-up',
      desc: 'Never miss a care step',
      icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />,
      tag: 'Step 6'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Top Main Navbar matching Screen 1 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(1)}>
            <div className="w-10 h-10 rounded-xl bg-[#0F5B4E] flex items-center justify-center text-white shadow-sm border border-emerald-700">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F5B4E] tracking-tight leading-none">
                KAVACH CARE
              </div>
              <div className="text-[11px] font-medium text-slate-500 tracking-wide">
                Care Beyond Distance
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigate(1)} className="text-[#0F5B4E] font-bold">Home</button>
            <button onClick={() => onNavigate(6)} className="hover:text-[#0F5B4E]">How It Works</button>
            <button onClick={() => onNavigate(5)} className="hover:text-[#0F5B4E]">Find Care</button>
            <button onClick={() => onNavigate(10)} className="hover:text-[#0F5B4E]">Diagnostics</button>
            <button onClick={() => onNavigate(11)} className="hover:text-[#0F5B4E]">Medicines</button>
            <button onClick={() => onNavigate(15)} className="hover:text-[#0F5B4E]">About</button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate(2)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0F5B4E] rounded transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate(2)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0F5B4E] hover:bg-[#0d4d42] rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>National Rural Care Navigation Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.18] tracking-tight">
              Healthcare shouldn't depend <br />
              <span className="text-[#0F5B4E] underline decoration-emerald-400 decoration-4 underline-offset-4">
                for where you live.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              AI-assisted care navigation connecting patients, ASHA workers, doctors and public healthcare facilities for a healthier, stronger rural India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(4)}
                className="px-6 py-3 text-sm font-bold text-white bg-[#0F5B4E] hover:bg-[#0b3d34] rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(6)}
                className="px-5 py-3 text-sm font-bold text-[#0F5B4E] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
              >
                Explore Care Journey
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Referral Drop-off</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Offline-First ASHA Mobile</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ABHA & ABDM Linked</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mother & Child Visual Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-emerald-100/50 p-6 flex flex-col items-center text-center">
              {/* Decorative Tagline on the Side */}
              <div className="absolute right-3 top-3 text-right">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-white px-2 py-0.5 rounded shadow-xs">
                  Stronger Communities
                </span>
                <div className="text-[10px] font-bold text-emerald-900 mt-0.5">
                  Healthier Tomorrows
                </div>
              </div>

              {/* Mother & Child Illustration Box */}
              <div className="w-full h-64 sm:h-72 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-800 flex flex-col items-center justify-center text-white relative overflow-hidden my-2 shadow-inner">
                {/* SVG Artistic Indian Rural Family Silhouette / Portrait Motif */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="relative z-10 flex flex-col items-center p-4">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mb-3 shadow-md backdrop-blur-xs">
                    <HeartHandshake className="w-12 h-12 text-emerald-300" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Trusted Care at the Village Doorstep
                  </h3>
                  <p className="text-xs text-emerald-100 max-w-xs mt-1 leading-relaxed">
                    Connecting 48,000+ rural hamlets with verified hospital beds, emergency transport and specialist follow-up.
                  </p>
                </div>

                {/* Floating Metric Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-lg p-2.5 text-slate-800 text-xs shadow-md flex items-center justify-between border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900">Sunita Tai (ASHA)</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    Rampur Block • Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Quick Feature Cards Grid matching Screen 1 bottom */}
        <div className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {featurePills.map((feat, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(feat.screen)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 w-fit mb-3 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0F5B4E] leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                  <span>{feat.tag}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
