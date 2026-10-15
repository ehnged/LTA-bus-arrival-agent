import React from 'react';
import { BusStop, ServiceArrival } from '../types/bus';
import { BusArrivalCard } from './BusArrivalCard';
import { Bookmark, Star, Plus, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favoriteStops: BusStop[];
  allStops: BusStop[];
  starredServices: Record<string, string[]>;
  onSelectStop: (stop: BusStop) => void;
  onRemoveFavorite: (stopCode: string) => void;
  onToggleStar: (stopCode: string, serviceNo: string) => void;
  onViewRoute: (serviceNo: string) => void;
  liveArrivalsMap: Record<string, ServiceArrival[]>;
  hasAlert: (serviceNo: string) => boolean;
  onToggleAlert: (serviceNo: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteStops,
  allStops,
  starredServices,
  onSelectStop,
  onRemoveFavorite,
  onToggleStar,
  onViewRoute,
  liveArrivalsMap,
  hasAlert,
  onToggleAlert
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner / Explanation */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span>Saved Commute Stops & Pinned Buses</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time headways and wait time predictions for your frequent boarding points.
          </p>
        </div>
      </div>

      {favoriteStops.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No favorite stops saved yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any bus stop arrival board to pin it to your daily commuter dashboard.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {favoriteStops.map((stop) => {
            const arrivals = liveArrivalsMap[stop.BusStopCode] || [];
            const starredForStop = starredServices[stop.BusStopCode] || [];

            // If user starred specific services, prioritize them at top
            const displayServices = [...arrivals].sort((a, b) => {
              const aStarred = starredForStop.includes(a.ServiceNo);
              const bStarred = starredForStop.includes(b.ServiceNo);
              if (aStarred && !bStarred) return -1;
              if (!aStarred && bStarred) return 1;
              return 0;
            });

            return (
              <div 
                key={stop.BusStopCode}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4"
              >
                {/* Stop Header */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {stop.BusStopCode}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {stop.Description}
                      </h3>
                      {stop.MrtConnection && (
                        <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {stop.MrtConnection}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {stop.RoadName} · {stop.Zone} Zone
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectStop(stop)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Full Board</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(stop.BusStopCode)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bus Arrival Cards Grid for this stop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {displayServices.slice(0, 4).map((service) => (
                    <BusArrivalCard
                      key={service.ServiceNo}
                      service={service}
                      stopCode={stop.BusStopCode}
                      isStarred={starredForStop.includes(service.ServiceNo)}
                      onToggleStar={(svc) => onToggleStar(stop.BusStopCode, svc)}
                      onViewRoute={onViewRoute}
                      hasAlert={hasAlert(service.ServiceNo)}
                      onToggleAlert={onToggleAlert}
                    />
                  ))}
                </div>

                {displayServices.length > 4 && (
                  <div className="text-center pt-1">
                    <button
                      onClick={() => onSelectStop(stop)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
                    >
                      View all {displayServices.length} buses at this stop →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
