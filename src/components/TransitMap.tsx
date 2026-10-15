import React, { useState } from 'react';
import { BusStop } from '../types/bus';
import { Bus, MapPin, Navigation, Compass, Layers, Train } from 'lucide-react';

interface TransitMapProps {
  stops: BusStop[];
  selectedStop: BusStop;
  onSelectStop: (stop: BusStop) => void;
  userCoords: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
}

export const TransitMap: React.FC<TransitMapProps> = ({
  stops,
  selectedStop,
  onSelectStop,
  userCoords,
  onRequestLocation
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'central' | 'east' | 'west' | 'north'>('all');

  // Singapore coordinate bounds for mapping to 1000 x 560 coordinate space
  // Lat: 1.25 to 1.47, Lng: 103.68 to 104.02
  const minLat = 1.26;
  const maxLat = 1.46;
  const minLng = 103.68;
  const maxLng = 104.02;

  const projectToMap = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 900 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 460 + 50;
    return { x, y };
  };

  const filteredStops = stops.filter(stop => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'central') return stop.Zone === 'Central';
    if (activeFilter === 'east') return stop.Zone === 'East';
    if (activeFilter === 'west') return stop.Zone === 'West';
    if (activeFilter === 'north') return stop.Zone === 'North' || stop.Zone === 'North-East';
    return true;
  });

  const selectedPoint = projectToMap(selectedStop.Latitude, selectedStop.Longitude);
  const userPoint = userCoords ? projectToMap(userCoords.lat, userCoords.lng) : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Map Control Bar */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap bg-slate-950/60">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Singapore Island Transit Grid</span>
          </h3>
          <p className="text-xs text-slate-400">
            Interactive geographic node visualizer. Tap any bus stop node to view real-time predictions.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'central', 'east', 'west', 'north'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}

          <button
            onClick={onRequestLocation}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors cursor-pointer ml-1"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulate / GPS</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] max-h-[560px] bg-[#070b14] overflow-hidden select-none">
        
        {/* Subtle Singapore Island Contour Graphic */}
        <svg
          viewBox="0 0 1000 560"
          className="w-full h-full object-contain pointer-events-auto"
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
            <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="1000" height="560" fill="url(#grid)" />

          {/* Major Transit Corridor Paths (BKE, PIE, AYE, CTE corridors) */}
          <g stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" strokeDasharray="4 4" fill="none">
            {/* West to East transit artery (PIE) */}
            <path d="M 180 320 Q 420 300 580 290 T 820 280" />
            {/* North to South transit artery (BKE/CTE) */}
            <path d="M 380 90 Q 430 200 480 340 T 490 390" />
            {/* Central Orchard / CBD Spine */}
            <path d="M 450 340 L 510 370 L 530 400" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="3" />
          </g>

          {/* Region Label Watermarks */}
          <text x="180" y="300" fill="rgba(255, 255, 255, 0.12)" fontSize="14" fontWeight="600" letterSpacing="2">JURONG / WEST</text>
          <text x="360" y="80" fill="rgba(255, 255, 255, 0.12)" fontSize="14" fontWeight="600" letterSpacing="2">WOODLANDS / NORTH</text>
          <text x="460" y="325" fill="rgba(255, 255, 255, 0.18)" fontSize="13" fontWeight="700" letterSpacing="1">CENTRAL / ORCHARD</text>
          <text x="540" y="420" fill="rgba(255, 255, 255, 0.18)" fontSize="13" fontWeight="700" letterSpacing="1">CBD / MARINA BAY</text>
          <text x="760" y="270" fill="rgba(255, 255, 255, 0.12)" fontSize="14" fontWeight="600" letterSpacing="2">TAMPINES / EAST</text>
          <text x="860" y="280" fill="rgba(255, 255, 255, 0.12)" fontSize="12" fontWeight="600" letterSpacing="1">CHANGI</text>

          {/* Bus Stop Node Pins */}
          {filteredStops.map(stop => {
            const pt = projectToMap(stop.Latitude, stop.Longitude);
            const isSelected = stop.BusStopCode === selectedStop.BusStopCode;

            return (
              <g
                key={stop.BusStopCode}
                transform={`translate(${pt.x}, ${pt.y})`}
                onClick={() => onSelectStop(stop)}
                className="cursor-pointer group"
              >
                {/* Active Selection Glow Ring */}
                {isSelected && (
                  <>
                    <circle r="18" fill="rgba(16, 185, 129, 0.2)" className="animate-ping" />
                    <circle r="12" fill="none" stroke="#10b981" strokeWidth="2" />
                  </>
                )}

                {/* Stop Marker Pin */}
                <circle
                  r={isSelected ? "7" : "5"}
                  fill={isSelected ? "#10b981" : "#38bdf8"}
                  stroke="#0b1120"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-150"
                />

                {/* Code Tooltip / Label */}
                <text
                  y={isSelected ? "-16" : "-10"}
                  textAnchor="middle"
                  fill={isSelected ? "#34d399" : "#94a3b8"}
                  fontSize={isSelected ? "11" : "9"}
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="pointer-events-none select-none font-mono"
                >
                  {stop.BusStopCode}
                </text>
              </g>
            );
          })}

          {/* User Location Radar Marker */}
          {userPoint && (
            <g transform={`translate(${userPoint.x}, ${userPoint.y})`}>
              <circle r="24" fill="rgba(59, 130, 246, 0.15)" />
              <circle r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text y="18" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
                You are here
              </text>
            </g>
          )}
        </svg>

        {/* Selected Stop Floating Overlay Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {selectedStop.BusStopCode}
                </span>
                <span className="text-xs font-semibold text-white">
                  {selectedStop.Description}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedStop.RoadName} {selectedStop.MrtConnection && `· ${selectedStop.MrtConnection}`}
              </p>
            </div>
            
            <button
              onClick={() => onSelectStop(selectedStop)}
              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded transition-colors shrink-0 cursor-pointer"
            >
              Arrivals Board
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-500 font-medium">Buses:</span>
            {selectedStop.Services.map(s => (
              <span key={s} className="text-[11px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.2 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
