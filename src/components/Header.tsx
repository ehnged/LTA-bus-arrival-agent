import React, { useState, useEffect } from 'react';
import { Bus, RefreshCw, Zap, Bell } from 'lucide-react';

interface HeaderProps {
  activeTab: 'stops' | 'map' | 'routes' | 'favorites' | 'api';
  onSelectTab: (tab: 'stops' | 'map' | 'routes' | 'favorites' | 'api') => void;
  onRefresh: () => void;
  refreshSeconds: number;
  activeAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onRefresh,
  refreshSeconds,
  activeAlertCount
}) => {
  const [sgTime, setSgTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Singapore is UTC+8
      const formatted = now.toLocaleTimeString('en-SG', {
        timeZone: 'Asia/Singapore',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setSgTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Wordmark */}
        <div 
          onClick={() => onSelectTab('stops')} 
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/25 transition-colors">
            <Bus className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">SG BusPulse</span>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">Real-Time</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('stops')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'stops'
                ? 'text-white border-b-2 border-emerald-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bus Stops & Arrivals
          </button>
          
          <button
            onClick={() => onSelectTab('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'map'
                ? 'text-white border-b-2 border-emerald-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Transit Map & Nearby
          </button>

          <button
            onClick={() => onSelectTab('routes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'routes'
                ? 'text-white border-b-2 border-emerald-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Route Progression
          </button>

          <button
            onClick={() => onSelectTab('favorites')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'text-white border-b-2 border-emerald-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Saved Stops</span>
            {activeAlertCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {activeAlertCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('api')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'api'
                ? 'text-white border-b-2 border-emerald-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>LTA DataMall API</span>
          </button>
        </nav>

        {/* Zone 3: Live Status & Refresh CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[11px] text-slate-400">SGT (UTC+8)</span>
            <span className="text-xs font-mono font-semibold text-slate-200 tabular-nums">
              {sgTime || '12:00:00'}
            </span>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            title="Click to refresh live bus arrivals immediately"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${refreshSeconds <= 1 ? 'animate-spin' : ''}`} />
            <span className="tabular-nums font-mono">
              {refreshSeconds}s
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
