import React, { useState, useEffect } from 'react';
import { facilityService, type FacilityData } from '../../services/facilityService';
import { useLanguage } from '../../context/LanguageContext';
import { Building2, Search, Filter, Phone, MapPin, Bed, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export const HealthcareNetworkSection: React.FC = () => {
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await facilityService.getFacilities();
      if (data.facilities) {
        setFacilities(data.facilities);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load healthcare facilities from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const filtered = facilities.filter((f) => {
    const matchesType = filterType === 'ALL' || f.type === filterType;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section id="healthcare-network" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>National Health Facility Registry (NFR)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('networkTitle', 'Public Healthcare Network & Bed Registry')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('networkSubtitle', 'Real-time telemetry and operational bed availability across rural public health facilities.')}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facility, specialty, location..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
            <span className="font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filter:
            </span>
            {[
              { id: 'ALL', label: t('filterAll', 'All Facilities') },
              { id: 'SUB_CENTRE', label: 'Sub-Centre' },
              { id: 'PHC', label: t('filterPhc', 'PHC') },
              { id: 'CHC', label: t('filterChc', 'CHC (FRU)') },
              { id: 'DISTRICT_HOSPITAL', label: t('filterDh', 'District Hospital') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#0F5B4E] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">
              {t('loadingFacilities', 'Loading public healthcare network data from server...')}
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={fetchFacilities}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('retry', 'Retry Connection')}</span>
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-2">
            <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">{t('noDataFound', 'No facilities found matching your search.')}</p>
            <p className="text-xs text-slate-500">Try changing your search term or facility tier filter.</p>
          </div>
        )}

        {/* FACILITY CARDS GRID */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((fac) => (
              <div
                key={fac._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Meta Bar: Tier Tag (Left) & Distance Badge (Right) */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {fac.tier}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F5B4E] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex-shrink-0 shadow-2xs">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{fac.distanceKm} km</span>
                    </span>
                  </div>

                  {/* Facility Name & Address */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {fac.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate" title={fac.address}>{fac.address}</span>
                    </div>
                  </div>

                  {/* Bed & Wait Telemetry */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Vacant Beds</div>
                        <div className="font-bold text-slate-800">
                          {fac.bedCapacity.available} / {fac.bedCapacity.total}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Avg OPD Wait</div>
                        <div className="font-bold text-slate-800">
                          ~{fac.queue.avgWaitMinutes} mins
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services pills */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-400">Available Services:</div>
                    <div className="flex flex-wrap gap-1">
                      {fac.services.slice(0, 4).map((s, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                      {fac.services.length > 4 && (
                        <span className="text-[10px] text-slate-500 self-center">
                          +{fac.services.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${fac.contactPhone}`}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{fac.contactPhone}</span>
                  </a>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {fac.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
