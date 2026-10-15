import React, { useState, useMemo } from 'react';
import { BusStop } from '../types/bus';
import { Search, MapPin, Navigation, Train, ArrowUpDown } from 'lucide-react';

interface BusStopSelectorProps {
  stops: BusStop[];
  selectedStop: BusStop;
  onSelectStop: (stop: BusStop) => void;
  userCoords: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
  isLocating: boolean;
}

export const BusStopSelector: React.FC<BusStopSelectorProps> = ({
  stops,
  selectedStop,
  onSelectStop,
  userCoords,
  onRequestLocation,
  isLocating
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const filteredStops = useMemo(() => {
    let result = stops;

    // Filter by Zone if selected
    if (selectedZone !== 'All') {
      result = result.filter(s => s.Zone === selectedZone);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.BusStopCode.toLowerCase().includes(q) ||
        s.Description.toLowerCase().includes(q) ||
        s.RoadName.toLowerCase().includes(q) ||
        (s.MrtConnection && s.MrtConnection.toLowerCase().includes(q)) ||
        s.Services.some(svc => svc.toLowerCase() === q || svc.toLowerCase().startsWith(q))
      );
    }

    return result;
  }, [stops, selectedZone, searchQuery]);

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-4">
      
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by 5-digit code (e.g. 09048), road name, or bus service..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Quick Zone Segmented Buttons & Location Trigger */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {['All', 'Central', 'East', 'West', 'North', 'North-East'].map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedZone === zone
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        <button
          onClick={onRequestLocation}
          disabled={isLocating}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0"
          title="Find nearest bus stops via GPS"
        >
          <Navigation className={`w-3.5 h-3.5 text-emerald-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating...' : 'Nearest Stops'}</span>
        </button>
      </div>

      {/* Stop Cards Horizontal Scroller or Compact List */}
      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredStops.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No bus stops found matching &quot;{searchQuery}&quot;. Try searching for &quot;Orchard&quot;, &quot;Bugis&quot;, or &quot;190&quot;.
          </div>
        ) : (
          filteredStops.map((stop) => {
            const isSelected = stop.BusStopCode === selectedStop.BusStopCode;
            return (
              <div
                key={stop.BusStopCode}
                onClick={() => onSelectStop(stop)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-emerald-400">
                        {stop.BusStopCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {stop.Description}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">
                      {stop.RoadName}
                    </div>
                  </div>

                  {stop.MrtConnection && (
                    <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                      <Train className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{stop.MrtConnection.split(' ')[0]}</span>
                    </span>
                  )}
                </div>

                {/* Available Bus Services at this stop */}
                <div className="mt-2 flex items-center gap-1 overflow-hidden flex-wrap">
                  <span className="text-[10px] text-slate-500 font-medium">Buses:</span>
                  {stop.Services.slice(0, 8).map((svc) => (
                    <span
                      key={svc}
                      className="text-[11px] font-mono font-medium text-slate-300 bg-slate-800/80 px-1.5 py-0.2 rounded"
                    >
                      {svc}
                    </span>
                  ))}
                  {stop.Services.length > 8 && (
                    <span className="text-[10px] text-slate-500">
                      +{stop.Services.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
