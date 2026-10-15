import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  CloudRain, 
  Car, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Sliders
} from 'lucide-react';

interface PredictionInsightsModalProps {
  weatherMode: 'clear' | 'light_rain' | 'heavy_rain';
  onSetWeatherMode: (mode: 'clear' | 'light_rain' | 'heavy_rain') => void;
  isPeakHourSimulated: boolean;
  onTogglePeakHour: () => void;
}

export const PredictionInsightsModal: React.FC<PredictionInsightsModalProps> = ({
  weatherMode,
  onSetWeatherMode,
  isPeakHourSimulated,
  onTogglePeakHour
}) => {
  return (
    <div className="space-y-6">
      
      {/* Hero explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Singapore Bus Wait Time Prediction Engine</h2>
            <p className="text-xs text-slate-400">
              How our system delivers accurate real-time arrival estimates beyond raw GPS timestamps.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Standard transit GPS feeds only provide raw latitude/longitude points every 30 to 60 seconds. Our prediction model dynamically adjusts arrival headways by factoring in Singapore-specific transit variables: traffic signal cycle delays on major arteries (Orchard, Victoria St, Eu Tong Sen), passenger boarding dwell times at interchange hubs, and expressway choke points.
        </p>
      </div>

      {/* Interactive Simulation Controls: Commute Environment */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Live Prediction Factor Sandbox</h3>
          </div>
          <span className="text-xs text-slate-400">
            Tweak variables to observe real-time ETA confidence impact
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Weather Simulation */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              <span>Singapore Weather Condition</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSetWeatherMode('clear')}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  weatherMode === 'clear'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Dry / Clear
              </button>
              <button
                onClick={() => onSetWeatherMode('light_rain')}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  weatherMode === 'light_rain'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Light Rain (+1m)
              </button>
              <button
                onClick={() => onSetWeatherMode('heavy_rain')}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  weatherMode === 'heavy_rain'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Monsoon (+3m)
              </button>
            </div>
          </div>

          {/* Traffic Peak Hour Simulation */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Corridor Congestion Phase</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onTogglePeakHour}
                className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  isPeakHourSimulated
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                }`}
              >
                <span>{isPeakHourSimulated ? 'Simulated Peak Commute (Heavy)' : 'Normal Flow (Off-Peak)'}</span>
                <span className="text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded">Toggle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Analytical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Dynamic Dwell Calibration</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Interchanges like Jurong East, Tampines, and Woodlands require 45–90s passenger loading, compared to 15–20s for roadside stops. The engine adjusts ETA automatically.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Signal Queue Detection</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Detects when a bus has slowed down due to traffic lights or yellow-box junctions rather than heavy congestion, preventing erroneous ETA jumpiness.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Confidence Intervals</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every bus arrival displays a verified confidence percentage (e.g. 96%) so commuters know whether to sprint to the bus bay or take their time.
          </p>
        </div>

      </div>

    </div>
  );
};
