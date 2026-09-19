import React, { useState } from 'react';
import {
  Search,
  Pill,
  Building,
  Navigation
} from 'lucide-react';

interface Screen11MedicineStockProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen11MedicineStock: React.FC<Screen11MedicineStockProps> = ({ onNavigate }) => {
  const [medicineSearch, setMedicineSearch] = useState('Metformin 500mg');

  const facilitiesStock = [
    {
      name: 'CHC Rampur',
      distance: '8.2 km',
      status: 'Available - 42 units',
      statusType: 'available',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    },
    {
      name: 'PHC Kalyanpur',
      distance: '5.1 km',
      status: 'Available - 18 units',
      statusType: 'available',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    },
    {
      name: 'District Hospital',
      distance: '14.7 km',
      status: 'Out of Stock',
      statusType: 'out',
      badgeClass: 'bg-red-100 text-red-800'
    },
    {
      name: 'PHC Bairagarh',
      distance: '11.3 km',
      status: 'Low Stock - 5 units',
      statusType: 'low',
      badgeClass: 'bg-amber-100 text-amber-900'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Essential Medicine Live Inventory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time public pharmacy stock tracking under National Free Drugs Service Initiative.
          </p>
        </div>

        {/* Search Bar matching Screen 11 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={medicineSearch}
              onChange={(e) => setMedicineSearch(e.target.value)}
              placeholder="Search medicine (e.g. Metformin, Amlodipine, Paracetamol)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50 font-medium"
            />
          </div>
        </div>

        {/* Active Medicine Header */}
        <div className="flex items-center justify-between px-1 text-xs">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#0F5B4E]" />
            <span className="font-bold text-slate-900 text-sm">{medicineSearch}</span>
            <span className="text-slate-500 font-medium">• Essential Anti-Diabetic Formulatory</span>
          </div>
          <span className="text-[11px] text-slate-400">Showing 4 Nearby Facilities</span>
        </div>

        {/* Facilities Stock List matching Screen 11 */}
        <div className="space-y-3">
          {facilitiesStock.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F5B4E] flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{fac.name}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">{fac.distance}</span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${fac.badgeClass}`}>
                      {fac.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate(5)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0F5B4E]" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
