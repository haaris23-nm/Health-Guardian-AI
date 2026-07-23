import React, { useState, useEffect } from 'react';
import { Building2, Search, Phone, MapPin, Navigation, Clock, ShieldAlert, Star, ExternalLink } from 'lucide-react';
import { Hospital } from '../types';

export const HospitalsMapView: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter24h, setFilter24h] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, [filter24h]);

  const fetchHospitals = async () => {
    try {
      const url = `/api/hospitals?query=${encodeURIComponent(searchQuery)}&open24h=${filter24h}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHospitals(data);
        if (data.length > 0 && !selectedHospital) {
          setSelectedHospital(data[0]);
        }
      }
    } catch (e) {
      console.error('Failed to fetch hospitals:', e);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHospitals();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            Nearby Hospitals & Medical Facilities
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Find nearby emergency centers, hospitals, phone contact info, and 24/7 operating hours.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-on-surface-variant-light absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by hospital name or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-rose-500 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shadow-xs"
          >
            Search
          </button>
        </form>

        <button
          onClick={() => setFilter24h(!filter24h)}
          className={`px-4 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
            filter24h
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-surface-variant-light/80'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>24/7 ER Only</span>
        </button>
      </div>

      {/* Map & List View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Map Visual Mock Canvas */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-outline-light dark:border-outline-dark bg-slate-900 text-white h-96 relative flex flex-col justify-between p-6 shadow-md">
          {/* Simulated Map Styling Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Bar Overlay */}
          <div className="relative z-10 flex justify-between items-center bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Geolocation Active • 4 Hospitals Nearby
            </span>
            <span className="text-[10px] text-slate-400">Radius: 10 km</span>
          </div>

          {/* Map Pin Nodes */}
          <div className="relative z-10 my-auto flex justify-around items-center px-8">
            {hospitals.map((h, idx) => (
              <button
                key={h.id}
                onClick={() => setSelectedHospital(h)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  selectedHospital?.id === h.id ? 'scale-125 z-20' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`p-3 rounded-full text-white shadow-lg ${
                  h.emergencyServices ? 'bg-rose-600 ring-4 ring-rose-600/30' : 'bg-blue-600'
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold bg-slate-800/90 px-2 py-0.5 rounded-full border border-slate-700 whitespace-nowrap">
                  {h.name.split(' ')[0]} ({h.distanceKm}km)
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Selected Details Preview */}
          {selectedHospital && (
            <div className="relative z-10 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white">{selectedHospital.name}</h3>
                <p className="text-xs text-slate-300">{selectedHospital.address}</p>
              </div>

              <a
                href={`tel:${selectedHospital.phone}`}
                className="px-4 py-2 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Call ER
              </a>
            </div>
          )}
        </div>

        {/* Hospital Cards List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {hospitals.map((h) => (
            <div
              key={h.id}
              onClick={() => setSelectedHospital(h)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedHospital?.id === h.id
                  ? 'bg-rose-500/10 border-rose-500/50 dark:bg-rose-950/20 shadow-xs'
                  : 'bg-surface-light dark:bg-surface-dark border-outline-light dark:border-outline-dark hover:border-rose-300'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark">
                  {h.name}
                </h3>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {h.rating}
                </span>
              </div>

              <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark mb-2">
                {h.address}
              </p>

              <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant-light dark:text-on-surface-variant-dark pt-2 border-t border-outline-light/30">
                <span className="flex items-center gap-1 text-primary">
                  <Navigation className="w-3 h-3" />
                  {h.distanceKm} km away
                </span>

                {h.open24h && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold">
                    24/7 Emergency
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
