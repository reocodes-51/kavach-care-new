import React, { useState } from 'react';
import { mockFacilities } from '../data/facilitiesData';
import { NetworkDiagram } from '../components/common/NetworkDiagram';
import { Building2, Search, Filter, Phone, MapPin } from 'lucide-react';

export const NetworkPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockFacilities.filter(f => {
    const matchesType = filterType === 'ALL' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.specialistsOnDuty.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-xs mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Facility Registry & Live Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#123B63]">
            Indian Public Healthcare Facility Network & Live Bed Registry
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Live capability directory of Sub-Centres, Ayushman Arogya Mandirs (PHCs), Community Health Centres (CHCs), Sub-District Hospitals (SDHs), and District Apex Hospitals.
          </p>
        </div>

        {/* Network Diagram View */}
        <div className="mb-8">
          <NetworkDiagram />
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facility name, block, specialist..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63] focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Tier:
            </span>
            {['ALL', 'SubCentre', 'AAM_PHC', 'CHC', 'SDH', 'DH'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filterType === t
                    ? 'bg-[#123B63] text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t === 'ALL' ? 'All Tiers' : t === 'AAM_PHC' ? 'PHC' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200">
                    {facility.level}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    facility.vacantBeds > 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {facility.vacantBeds} Beds Vacant
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {facility.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{facility.block} Block • {facility.district}</span>
                </div>

                {/* Beds Breakdown */}
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 mb-3 text-xs grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[10px] text-slate-500">Total Beds</div>
                    <div className="font-bold text-slate-900">{facility.totalBeds}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Vacant</div>
                    <div className="font-bold text-emerald-700">{facility.vacantBeds}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">ICU Available</div>
                    <div className="font-bold text-[#123B63]">{facility.icuBedsAvailable}</div>
                  </div>
                </div>

                {/* Specialists */}
                <div className="text-xs mb-3">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                    On-Duty Medical Personnel:
                  </span>
                  <div className="space-y-0.5 text-slate-800">
                    {facility.specialistsOnDuty.map((spec, i) => (
                      <div key={i} className="flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#123B63]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Diagnostics */}
                <div className="text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                    Diagnostic Services:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {facility.diagnosticsAvailable.map((diag, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {diag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Phone & Emergency Status */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-mono">{facility.contactPhone}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {facility.emergency24x7 ? '24x7 Casualty' : 'Day OPD'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
