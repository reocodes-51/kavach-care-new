import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Filter,
  Navigation
} from 'lucide-react';

interface Screen05FindCareProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen05FindCare: React.FC<Screen05FindCareProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('Nearby');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Nearby',
    'Emergency',
    'Diagnostics',
    'Specialists',
    'Medicines',
    'Maternal Care',
    'Child Care'
  ];

  const facilities = [
    {
      id: 'chc-rampur',
      name: 'CHC Rampur',
      type: 'Community Health Centre',
      distance: '8.2 km',
      status: 'Open',
      services: ['General Medicine', 'Laboratory', 'Emergency'],
      doctors: 'Dr. Sharma on duty',
      isRecommended: true
    },
    {
      id: 'phc-kalyanpur',
      name: 'PHC Kalyanpur',
      type: 'Primary Health Centre',
      distance: '5.1 km',
      status: 'Open',
      services: ['General Medicine', 'Immunization', 'Maternal Care'],
      doctors: 'CHO Priyanka on duty',
      isRecommended: false
    },
    {
      id: 'dh-sehore',
      name: 'District Hospital',
      type: 'District Apex Hospital',
      distance: '14.7 km',
      status: 'Open',
      services: ['Specialists', 'Radiology', 'Emergency ICU'],
      doctors: 'Specialists 24x7',
      isRecommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility, specialty or service..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50"
          />
        </div>

        {/* Location pill */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-lg text-slate-700 font-semibold w-full md:w-auto">
          <MapPin className="w-3.5 h-3.5 text-[#0F5B4E]" />
          <span>Near: Rampur, MP</span>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50 w-full md:w-auto justify-center">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Grid: Left Categories + Center Facilities + Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Category Pills */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-2">
            Categories
          </span>
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-[#0F5B4E] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Facility Cards */}
        <div className="lg:col-span-4 space-y-3">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className={`bg-white p-4 rounded-xl border transition-all ${
                fac.isRecommended
                  ? 'border-emerald-400 ring-1 ring-emerald-400 shadow-xs'
                  : 'border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{fac.name}</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {fac.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {fac.type} • <strong className="text-[#0F5B4E]">{fac.distance}</strong>
                  </div>
                </div>

                {fac.isRecommended && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Matched
                  </span>
                )}
              </div>

              {/* Services tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {fac.services.map((srv, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {srv}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => onNavigate(6)}
                  className="flex-1 py-1.5 px-2.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white font-bold rounded text-center transition-colors text-[11px]"
                >
                  View Details
                </button>
                <button
                  onClick={() => onNavigate(7)}
                  className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-center transition-colors text-[11px] flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#0F5B4E]" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Clean Visual Map matching Screen 5 */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-slate-800">Facility Network Map</span>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> PHC
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> CHC
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> DH
              </span>
            </div>
          </div>

          {/* Map Graphic Canvas */}
          <div className="w-full h-80 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center">
            {/* Grid & Highway Lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* State Highway */}
              <path
                d="M 20 280 Q 140 180 220 160 T 360 80"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="6"
              />

              {/* Dotted Patient Transit Route to CHC Rampur */}
              <path
                d="M 90 240 Q 150 200 230 150"
                fill="none"
                stroke="#0F5B4E"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Patient Origin Pin */}
            <div className="absolute left-[20%] top-[70%] flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-[#0F5B4E] ring-4 ring-emerald-200 shadow-md animate-ping" />
              <div className="text-[9px] font-bold bg-white text-[#0F5B4E] px-1.5 py-0.5 rounded shadow-xs mt-1 border">
                You (Rampur Hamlet)
              </div>
            </div>

            {/* PHC Kalyanpur Pin */}
            <div className="absolute left-[35%] top-[35%] flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                P
              </div>
              <div className="text-[9px] font-bold bg-white text-slate-800 px-1.5 py-0.5 rounded shadow-xs mt-1 border">
                PHC Kalyanpur (5.1 km)
              </div>
            </div>

            {/* CHC Rampur Pin (Destination) */}
            <div className="absolute left-[62%] top-[40%] flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#0F5B4E] text-white flex items-center justify-center text-xs font-bold shadow-lg ring-4 ring-emerald-300">
                CHC
              </div>
              <div className="text-[10px] font-black bg-[#0F5B4E] text-white px-2 py-0.5 rounded shadow-md mt-1 border border-emerald-400">
                CHC Rampur (8.2 km)
              </div>
            </div>

            {/* District Hospital Pin */}
            <div className="absolute left-[80%] top-[20%] flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                DH
              </div>
              <div className="text-[9px] font-bold bg-white text-slate-800 px-1.5 py-0.5 rounded shadow-xs mt-1 border">
                District Hospital (14.7 km)
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Transit Status:</span>
            <span className="font-bold text-[#0F5B4E]">Route Ready via SH-24</span>
          </div>
        </div>
      </div>
    </div>
  );
};
