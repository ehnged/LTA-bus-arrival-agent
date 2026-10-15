import React, { useState } from 'react';
import { 
  Zap, 
  Code2, 
  Check, 
  Copy, 
  ExternalLink, 
  Server, 
  Database, 
  ShieldCheck,
  Play
} from 'lucide-react';

interface BackendIntegrationModalProps {
  currentStopCode: string;
}

export const BackendIntegrationModal: React.FC<BackendIntegrationModalProps> = ({ currentStopCode }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'ready'>('ready');

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleExpressCode = `// Express proxy route for LTA DataMall v2 BusArrival
// server.ts or routes/bus.ts

import express from 'express';
import axios from 'axios';

const router = express.Router();
const LTA_API_KEY = process.env.LTA_DATAMALL_KEY || 'YOUR_LTA_KEY';

router.get('/api/lta/BusArrivalv2', async (req, res) => {
  try {
    const { BusStopCode } = req.query;
    if (!BusStopCode) {
      return res.status(400).json({ error: 'BusStopCode query param required' });
    }

    const response = await axios.get(
      'https://datamall2.mytransport.sg/ltaodataservice/v2/BusArrivalv2',
      {
        params: { BusStopCode },
        headers: {
          'AccountKey': LTA_API_KEY,
          'accept': 'application/json'
        }
      }
    );

    // Returns official LTA DataMall v2 payload
    res.json(response.data);
  } catch (err: any) {
    console.error('LTA API proxy error:', err.message);
    res.status(500).json({ error: 'Failed to fetch real-time LTA bus data' });
  }
});

export default router;`;

  const sampleSchema = `{
  "odata.metadata": "http://datamall2.mytransport.sg/ltaodataservice/v2/$metadata#BusArrivalv2",
  "BusStopCode": "${currentStopCode}",
  "Services": [
    {
      "ServiceNo": "190",
      "Operator": "SMRT",
      "NextBus": {
        "OriginCode": "44009",
        "DestinationCode": "10049",
        "EstimatedArrival": "2026-10-15T14:35:10+08:00",
        "Latitude": "1.3044",
        "Longitude": "103.8340",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "DD"
      },
      "NextBus2": {
        "OriginCode": "44009",
        "DestinationCode": "10049",
        "EstimatedArrival": "2026-10-15T14:41:20+08:00",
        "Load": "SDA",
        "Feature": "WAB",
        "Type": "SD"
      }
    }
  ]
}`;

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Server className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white">LTA DataMall v2 Backend Architecture</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              This application has been engineered with 100% schema alignment to Singapore Land Transport Authority (LTA) DataMall v2 standards. Currently running in client-side high-fidelity simulation mode. You can drop in your backend proxy route anytime!
            </p>
          </div>

          <a 
            href="https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 rounded-lg transition-colors shrink-0"
          >
            <span>LTA DataMall Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2-Column: Step-by-Step Backend Guide & Test Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Express / Node Proxy Implementation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>1. Ready-to-use Express Proxy Route</span>
            </h3>
            <button
              onClick={() => copyCode(sampleExpressCode, 1)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Copied' : 'Copy Route'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Because the LTA DataMall API requires a private <code className="text-amber-400 font-mono">AccountKey</code> and does not set open CORS headers for browser fetch, route requests through this backend proxy:
          </p>

          <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed max-h-[280px]">
            {sampleExpressCode}
          </pre>
        </div>

        {/* Column 2: Data Schema & Frontend Hook */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>2. LTA DataMall v2 Payload Schema</span>
            </h3>
            <button
              onClick={() => copyCode(sampleSchema, 2)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors cursor-pointer"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 2 ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            The frontend service at <code className="text-emerald-400 font-mono">src/services/busService.ts</code> parses this exact payload:
          </p>

          <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[280px]">
            {sampleSchema}
          </pre>
        </div>

      </div>

      {/* Connection Test & Environment Indicator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="text-sm font-semibold text-white">Frontend Prediction Engine Active</div>
            <div className="text-xs text-slate-400">Simulating live continuous arrivals with real headway intervals for 18+ Singapore stops.</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Stop Code:</span>
          <span className="font-mono text-sm font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {currentStopCode}
          </span>
        </div>
      </div>

    </div>
  );
};
