import React, { useState } from 'react';
import { SAMPLE_BUS_ROUTES, BUS_OPERATOR_COLORS, CROWD_LOAD_LABELS } from '../data/singaporeBuses';
import { BusRouteInfo, BusStop } from '../types/bus';
import { X, ArrowRight, Bus, MapPin, Clock, ShieldCheck, Compass } from 'lucide-react';

interface RouteProgressionModalProps {
  serviceNo: string;
  currentStopCode: string;
  onClose: () => void;
  onSelectStopCode: (stopCode: string) => void;
}

export const RouteProgressionModal: React.FC<RouteProgressionModalProps> = ({
  serviceNo,
  currentStopCode,
  onClose,
  onSelectStopCode
}) => {
  const [selectedDirection, setSelectedDirection] = useState<1 | 2>(1);

  // Retrieve route details or fallback template
  const route: BusRouteInfo = SAMPLE_BUS_ROUTES[serviceNo] || {
    ServiceNo: serviceNo,
    Operator: 'SBST',
    Direction: 1,
    Origin: 'Integrated Interchange',
    Destination: 'City Centre Terminal',
    OperatingHours: '05:30 - 23:45',
    FrequencyPeak: '4 - 7 mins',
    FrequencyOffPeak: '8 - 12 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '44009', RoadName: 'Interchange Loop', Description: 'Origin Transport Hub', DistanceKm: 0.0 },
      { StopSequence: 5, BusStopCode: '43141', RoadName: 'Arterial Avenue', Description: 'Residential Zone Blk 22', DistanceKm: 3.2 },
      { StopSequence: 10, BusStopCode: currentStopCode, RoadName: 'Transit Corridor', Description: 'Current Stop Selected', DistanceKm: 7.4 },
      { StopSequence: 15, BusStopCode: '08057', RoadName: 'Expressway Flyover', Description: 'Central District Junction', DistanceKm: 12.1 },
      { StopSequence: 20, BusStopCode: '03011', RoadName: 'Financial Blvd', Description: 'Destination Terminal', DistanceKm: 16.8 }
    ]
  };

  const operatorMeta = BUS_OPERATOR_COLORS[route.Operator];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg font-mono font-bold text-xl text-white">
              {route.ServiceNo}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{operatorMeta.name}</span>
                <span aria-hidden="true">·</span>
                <span>{route.OperatingHours}</span>
              </div>
              <h2 className="text-sm font-semibold text-white mt-0.5">
                {route.Origin} <ArrowRight className="inline w-3 h-3 text-slate-500 mx-1" /> {route.Destination}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Metrics Strip */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Peak Headway:</span>
            <span className="text-slate-200 font-semibold">{route.FrequencyPeak}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Off-Peak:</span>
            <span className="text-slate-200 font-semibold">{route.FrequencyOffPeak}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Live LTA GPS Tracked</span>
          </div>
        </div>

        {/* Stops Sequence Metro Timeline */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-0 relative">
          <p className="text-xs text-slate-400 mb-4">
            Showing stop sequence along route. Click any stop to inspect its real-time arrival board.
          </p>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-700">
            {route.Stops.map((stop, idx) => {
              const isCurrent = stop.BusStopCode === currentStopCode;
              // Simulate live active buses near stop 1 or 2 stops upstream
              const hasActiveBus = idx === 1 || (idx === 3 && route.Stops.length > 5);

              return (
                <div 
                  key={stop.StopSequence}
                  onClick={() => {
                    onSelectStopCode(stop.BusStopCode);
                    onClose();
                  }}
                  className={`relative group cursor-pointer p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                      : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Timeline Bullet Node */}
                  <div className={`absolute -left-6 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    isCurrent 
                      ? 'bg-emerald-500 border-white' 
                      : 'bg-slate-900 border-slate-500'
                  }`} />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {stop.BusStopCode}
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {stop.Description}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-medium">
                            Your Current Stop
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {stop.RoadName} · {stop.DistanceKm.toFixed(1)} km from origin
                      </div>
                    </div>

                    {/* Active incoming bus indicator if near this stop */}
                    {hasActiveBus && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-md shrink-0">
                        <Bus className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                        <span className="text-[10px] font-mono font-semibold text-emerald-300">
                          Incoming Bus (DD)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Direction 1: Toward {route.Destination.split('(')[0]}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
