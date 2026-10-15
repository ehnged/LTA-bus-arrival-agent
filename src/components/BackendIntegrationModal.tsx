import React, { useState } from 'react';
import { 
  Zap, 
  Code2, 
  Check, 
  Copy, 
  ExternalLink, 
  Server, 
  Database, 
  Play, 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  KeyRound
} from 'lucide-react';

interface BackendIntegrationModalProps {
  currentStopCode: string;
}

export const BackendIntegrationModal: React.FC<BackendIntegrationModalProps> = ({ currentStopCode }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [testStopCode, setTestStopCode] = useState<string>('83139');
  const [customKeyInput, setCustomKeyInput] = useState<string>('');
  const [testResult, setTestResult] = useState<{
    endpoint: string;
    status: number;
    data: any;
    timestamp: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const runTest = async (endpointType: 'health' | 'arrival') => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const url = endpointType === 'health' 
        ? '/api/health' 
        : `/api/busarrival?BusStopCode=${encodeURIComponent(testStopCode || '83139')}`;

      const headers: Record<string, string> = {
        'accept': 'application/json'
      };

      if (customKeyInput.trim()) {
        headers['x-lta-account-key'] = customKeyInput.trim();
      }

      const res = await fetch(url, { headers });
      const data = await res.json().catch(() => ({ message: 'Non-JSON response' }));

      setTestResult({
        endpoint: url,
        status: res.status,
        data,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (err: any) {
      setTestResult({
        endpoint: endpointType === 'health' ? '/api/health' : '/api/busarrival',
        status: 500,
        data: { error: 'FETCH_ERROR', message: err.message },
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const curlExample = `# Query serverless health
curl -s http://localhost:3000/api/health

# Query live bus arrival (using LTA v3 endpoint under the hood)
curl -s "http://localhost:3000/api/busarrival?BusStopCode=83139"

# Direct upstream LTA DataMall v3 target
curl -X GET "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139" \\
  -H "AccountKey: <YOUR_LTA_KEY>" \\
  -H "accept: application/json"`;

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Server className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white">Serverless LTA DataMall v3 Connection</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Configured at project root in <code className="text-emerald-400 font-mono">/api</code> folder. Contains serverless route handlers for <code className="text-emerald-300 font-mono">/api/health.ts</code> and <code className="text-emerald-300 font-mono">/api/busarrival.ts</code> calling LTA DataMall v3.
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

      {/* Live Serverless Sandbox & Test Runner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Interactive Serverless Route Tester</h3>
          </div>
          <span className="text-xs text-slate-400">
            Test endpoints live against your local serverless proxy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Stop Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Target BusStopCode</label>
            <input
              type="text"
              value={testStopCode}
              onChange={(e) => setTestStopCode(e.target.value)}
              placeholder="e.g. 83139 or 09048"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Test AccountKey input (optional header test) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>AccountKey (Session Test)</span>
              </label>
              <span className="text-[10px] text-slate-500">Not hardcoded / Stored in memory</span>
            </div>
            <input
              type="password"
              value={customKeyInput}
              onChange={(e) => setCustomKeyInput(e.target.value)}
              placeholder="Pass key via x-lta-account-key header or set in .env"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <button
            onClick={() => runTest('arrival')}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Test GET /api/busarrival?BusStopCode={testStopCode}</span>
          </button>

          <button
            onClick={() => runTest('health')}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test GET /api/health</span>
          </button>
        </div>

        {/* Live Test Results Output Box */}
        {testResult && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                  testResult.status === 200 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  HTTP {testResult.status}
                </span>
                <span className="font-mono text-slate-300">{testResult.endpoint}</span>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">{testResult.timestamp}</span>
            </div>

            <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-[220px] p-2 leading-relaxed">
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Serverless Files Summary & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Box 1: File Structure */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Configured Serverless Endpoints</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="font-mono font-semibold text-emerald-400">/api/health.ts</div>
              <p className="text-slate-400 text-[11px]">
                Health check endpoint reporting server status, timestamp, uptime, and whether LTA_ACCOUNT_KEY is configured in the environment.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="font-mono font-semibold text-emerald-400">/api/busarrival.ts</div>
              <p className="text-slate-400 text-[11px]">
                Queries LTA DataMall v3: <code className="text-slate-300">https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=...</code>. Extracts AccountKey from environment or headers without exposing secrets.
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: cURL commands */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">cURL Commands</h3>
            </div>
            <button
              onClick={() => copyCode(curlExample, 1)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed max-h-[220px]">
            {curlExample}
          </pre>
        </div>

      </div>

    </div>
  );
};
