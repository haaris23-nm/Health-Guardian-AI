import React, { useState, useEffect } from 'react';
import { Building2, Search, Phone, MapPin, Navigation, Clock, Star, ExternalLink, Compass, LocateFixed, ShieldAlert } from 'lucide-react';
import { Hospital } from '../types';

export const HospitalsMapView: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter24h, setFilter24h] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<'osm' | 'interactive'>('osm');

  useEffect(() => {
    fetchHospitals();
  }, [filter24h]);

  const fetchHospitals = async (lat?: number, lng?: number) => {
    try {
      let url = `/api/hospitals?query=${encodeURIComponent(searchQuery)}&open24h=${filter24h}`;
      if (lat !== undefined && lng !== undefined) {
        url += `&lat=${lat}&lng=${lng}`;
      } else if (userLocation) {
        url += `&lat=${userLocation.lat}&lng=${userLocation.lng}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHospitals(data);
        if (data.length > 0) {
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

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setLocating(false);
        fetchHospitals(coords.lat, coords.lng);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocating(false);
        alert('Could not access device location. Showing default medical centers.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const currentLat = selectedHospital ? selectedHospital.lat : 37.7749;
  const currentLng = selectedHospital ? selectedHospital.lng : -122.4194;
  const bbox = `${currentLng - 0.015},${currentLat - 0.015},${currentLng + 0.015},${currentLat + 0.015}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Nearby Hospitals & ER Centers
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Real-time emergency medical facilities, live location mapping, phone contact info, and 24/7 operating hours.
            </p>
          </div>
        </div>

        {/* Detect Location Button */}
        <button
          onClick={handleDetectLocation}
          disabled={locating}
          className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all self-start sm:self-auto"
        >
          <LocateFixed className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
          <span>{locating ? 'Detecting GPS...' : userLocation ? 'GPS Location Active' : 'Detect My Location'}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by hospital name or city (e.g. Chicago, London, San Francisco)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shadow-xs cursor-pointer"
          >
            Search
          </button>
        </form>

        <button
          onClick={() => setFilter24h(!filter24h)}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            filter24h
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>24/7 ER Only</span>
        </button>
      </div>

      {/* Map & List View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real OpenStreetMap View Canvas */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-blue-100 dark:border-slate-800 bg-slate-900 text-white h-[420px] relative flex flex-col justify-between shadow-md">
          
          {/* Real OpenStreetMap Iframe */}
          <iframe
            title="Hospital Map View"
            width="100%"
            height="100%"
            className="absolute inset-0 border-0 opacity-90 transition-all"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${currentLat},${currentLng}`}
            loading="lazy"
          />

          {/* Top Bar Overlay */}
          <div className="relative z-10 p-3 m-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700 flex justify-between items-center text-xs">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {userLocation ? 'Live GPS Location' : 'Map Centered'} • {hospitals.length} Hospitals Found
            </span>
            <span className="text-[11px] font-semibold text-slate-300">
              {selectedHospital ? selectedHospital.name : 'Select a Hospital'}
            </span>
          </div>

          {/* Floating Hospital Marker Selectors */}
          <div className="relative z-10 px-4 py-2 my-auto flex gap-2 overflow-x-auto">
            {hospitals.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHospital(h)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md border ${
                  selectedHospital?.id === h.id
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md scale-105'
                    : 'bg-slate-900/80 text-slate-200 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{h.name.split(' ')[0]} ({h.distanceKm}km)</span>
              </button>
            ))}
          </div>

          {/* Bottom Selected Details Preview & Navigation Actions */}
          {selectedHospital && (
            <div className="relative z-10 m-3 p-4 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white">{selectedHospital.name}</h3>
                  {selectedHospital.open24h && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold">
                      24/7 ER
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{selectedHospital.address}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-semibold">
                  <span className="text-amber-400 flex items-center gap-1">★ {selectedHospital.rating}</span>
                  <span>• {selectedHospital.distanceKm} km away</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.lat},${selectedHospital.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>

                <a
                  href={`tel:${selectedHospital.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call ER</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Hospital Cards List */}
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {hospitals.map((h) => (
            <div
              key={h.id}
              onClick={() => setSelectedHospital(h)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedHospital?.id === h.id
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500/50 dark:border-rose-800 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-blue-100 dark:border-slate-800 hover:border-rose-300'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                  {h.name}
                </h3>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5 shrink-0 ml-2">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {h.rating}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                {h.address}
              </p>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
                  <Navigation className="w-3 h-3" />
                  {h.distanceKm} km away
                </span>

                <div className="flex items-center gap-2">
                  {h.open24h && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold">
                      24/7 ER
                    </span>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {hospitals.length === 0 && (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
              No hospitals found matching your filter criteria. Try searching for another city or clearing filters.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
