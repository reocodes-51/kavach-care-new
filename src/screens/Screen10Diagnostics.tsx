import React, { useState } from 'react';
import {
  Search,
  Building,
  Clock
} from 'lucide-react';

interface Screen10DiagnosticsProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen10Diagnostics: React.FC<Screen10DiagnosticsProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');

  const tests = [
    {
      id: 'cbc',
      name: 'Complete Blood Count (CBC)',
      price: '₹ Free (Govt.)',
      status: 'Available',
      statusColor: 'emerald',
      facility: 'CHC Rampur',
      tat: 'Report in 3 hours'
    },
    {
      id: 'fbs',
      name: 'Blood Sugar (FBS)',
      price: '₹ Free (Govt.)',
      status: 'Available',
      statusColor: 'emerald',
      facility: 'PHC Kalyanpur',
      tat: 'Instant report (15 mins)'
    },
    {
      id: 'lft',
      name: 'Liver Function Test',
      price: '₹ Free (Govt.)',
      status: 'Available',
      statusColor: 'emerald',
      facility: 'District Hospital',
      tat: 'Report same day'
    },
    {
      id: 'xray',
      name: 'X-Ray Chest',
      price: '₹ Free (Govt.)',
      status: 'Limited',
      statusColor: 'amber',
      facility: 'CHC Rampur',
      tat: 'Report in 2 hours'
    }
  ];

  const filteredTests = tests.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFacility = selectedFacility === 'All Facilities' || t.facility.includes(selectedFacility);
    return matchesSearch && matchesFacility;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Title Header */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Diagnostic Services Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Book free essential diagnostics across verified public facilities under Free Diagnostics Service Initiative.
          </p>
        </div>

        {/* Search & Facility Filter Bar matching Screen 10 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests (e.g. CBC, Sugar, X-Ray)..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5B4E] text-xs w-full sm:w-auto"
            >
              <option value="All Facilities">All Facilities</option>
              <option value="CHC Rampur">CHC Rampur</option>
              <option value="PHC Kalyanpur">PHC Kalyanpur</option>
              <option value="District Hospital">District Hospital</option>
            </select>
          </div>
        </div>

        {/* 4 Test Cards Grid matching Screen 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {test.price}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    test.statusColor === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {test.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">
                  {test.name}
                </h3>

                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#0F5B4E]" />
                    <span className="font-semibold">{test.facility}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{test.tat}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Test slot for ${test.name} at ${test.facility} booked successfully. Token generated.`);
                  onNavigate(7);
                }}
                className="w-full py-2 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Book Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
