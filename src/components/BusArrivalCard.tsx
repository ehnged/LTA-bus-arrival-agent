import React, { useState } from 'react';
import { 
  ServiceArrival, 
  NextBusInfo, 
  BusOperator 
} from '../types/bus';
import { 
  BUS_OPERATOR_COLORS, 
  CROWD_LOAD_LABELS, 
  BUS_TYPE_LABELS 
} from '../data/singaporeBuses';
import { 
  Accessibility, 
  ChevronDown, 
  ChevronUp, 
  Route, 
  Bell, 
  Check, 
  ShieldCheck, 
  AlertTriangle,
  Clock
} from 'lucide-react';

interface BusArrivalCardProps {
  service: ServiceArrival;
  stopCode: string;
  isStarred: boolean;
  onToggleStar: (serviceNo: string) => void;
  onViewRoute: (serviceNo: string) => void;
  hasAlert: boolean;
  onToggleAlert: (serviceNo: string) => void;
}

export const BusArrivalCard: React.FC<BusArrivalCardProps> = ({
  service,
  stopCode,
  isStarred,
  onToggleStar,
  onViewRoute,
  hasAlert,
  onToggleAlert
}) => {
  const [showPredictionDetails, setShowPredictionDetails] = useState(false);
  const operatorMeta = BUS_OPERATOR_COLORS[service.Operator] || BUS_OPERATOR_COLORS.SBST;

  // Render a specific next bus arrival slot
  const renderBusSlot = (bus: NextBusInfo | null, label: string, isNext: boolean) => {
    if (!bus) {
      return (
        <div className="flex-1 min-w-[90px] p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-center items-center text-center">
          <span className="text-[11px] text-slate-500 font-medium mb-1">{label}</span>
          <span className="text-sm font-semibold text-slate-600">--</span>
          <span className="text-[10px] text-slate-600 mt-1">No data</span>
        </div>
      );
    }

    const loadMeta = CROWD_LOAD_LABELS[bus.Load];
    const typeMeta = BUS_TYPE_LABELS[bus.Type];
    const isArriving = bus.SecondsAway <= 60 && bus.SecondsAway >= 0;
    const isDeparted = bus.SecondsAway < 0;

    let timeText = `${bus.MinutesAway}m`;
    if (isDeparted) {
      timeText = 'Departed';
    } else if (isArriving) {
      timeText = 'Arr';
    }

    return (
      <div 
        className={`flex-1 min-w-[92px] p-2.5 rounded-lg border transition-all ${
          isNext 
            ? 'bg-slate-800/90 border-slate-700 shadow-sm' 
            : 'bg-slate-900/70 border-slate-800/80'
        }`}
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
          <div className="flex items-center gap-1">
            {bus.Feature === 'WAB' && (
              <span title="Wheelchair Accessible Bus">
                <Accessibility className="w-3 h-3 text-slate-400" />
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-400 font-medium">{typeMeta.short}</span>
          </div>
        </div>

        {/* Arrival Minutes / Status */}
        <div className="flex items-baseline gap-1 my-1">
          <span 
            className={`font-mono font-bold tracking-tight ${
              isArriving 
                ? 'text-xl text-emerald-400 animate-pulse' 
                : isDeparted 
                  ? 'text-sm text-slate-500' 
                  : 'text-2xl text-white'
            }`}
          >
            {timeText}
          </span>
          {!isArriving && !isDeparted && (
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
              ({bus.SecondsAway % 60}s)
            </span>
          )}
        </div>

        {/* Crowd Load */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${loadMeta.dotClass}`} />
          <span className={`text-[10px] font-medium truncate ${
            bus.Load === 'SEA' ? 'text-emerald-400' :
            bus.Load === 'SDA' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {loadMeta.short}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 transition-colors">
      
      {/* Header Row: Service Number, Operator & Destination */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          {/* Big Service Number Badge */}
          <button
            onClick={() => onToggleStar(service.ServiceNo)}
            className="flex items-center justify-center min-w-[54px] px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono font-bold text-xl hover:border-emerald-500/50 transition-colors cursor-pointer group"
            title={isStarred ? "Starred route (click to unstar)" : "Click to star route"}
          >
            <span>{service.ServiceNo}</span>
            {isStarred && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 group-hover:scale-125 transition-transform" />
            )}
          </button>

          {/* Service Destination & Operator Info */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">{operatorMeta.name}</span>
              <span aria-hidden="true">·</span>
              <span>To {service.DestinationName}</span>
            </div>

            {/* Quiet prediction accuracy summary */}
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-400/90 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{service.Prediction.confidenceScore}% Prediction Confidence</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                ETA Range: {service.Prediction.etaRange}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleAlert(service.ServiceNo)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              hasAlert
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-700'
            }`}
            title={hasAlert ? "Alert active: will notify when <= 3 mins" : "Set arrival reminder chime"}
          >
            <Bell className="w-4 h-4" />
          </button>

          <button
            onClick={() => onViewRoute(service.ServiceNo)}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 border border-slate-700/60 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            title="View Route Progression & Stops"
          >
            <Route className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Triple Arrival Slots: NextBus, 2nd Bus, 3rd Bus */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        {renderBusSlot(service.NextBus, 'Next Bus', true)}
        {renderBusSlot(service.NextBus2, '2nd Bus', false)}
        {renderBusSlot(service.NextBus3, '3rd Bus', false)}
      </div>

      {/* Expandable Wait Time Prediction Insights */}
      <div className="mt-3 pt-2.5 border-t border-slate-700/40">
        <button
          onClick={() => setShowPredictionDetails(!showPredictionDetails)}
          className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-1"
        >
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real-time Wait Time Intelligence</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>{showPredictionDetails ? 'Hide details' : 'View factors'}</span>
            {showPredictionDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showPredictionDetails && (
          <div className="mt-2 p-3 bg-slate-900/80 rounded-lg border border-slate-700/50 text-xs space-y-2">
            <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-800">
              <div>
                <span className="text-[11px] text-slate-500 block">Traffic Flow</span>
                <span className="font-medium text-slate-200">{service.Prediction.trafficCondition}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Congestion Level</span>
                <span className={`font-semibold ${
                  service.Prediction.congestionFactor === 'Low' ? 'text-emerald-400' :
                  service.Prediction.congestionFactor === 'Moderate' ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {service.Prediction.congestionFactor}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500 block">Signal & Dwell Buffer</span>
                <span className="text-slate-300 font-mono tabular-nums">+{service.Prediction.dwellTimeFactorSeconds}s per intersection</span>
              </div>
              <div>
                <span className="text-slate-500 block">Historical LTA Metric</span>
                <span className="text-slate-300">{service.Prediction.historicalAccuracy}</span>
              </div>
            </div>

            {service.NextBus && (
              <div className="pt-1 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>Predicted Stop Arrival: {service.NextBus.EstimatedTimeFormatted} SGT</span>
                <span>Lat/Lng: {service.NextBus.Latitude}, {service.NextBus.Longitude}</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
