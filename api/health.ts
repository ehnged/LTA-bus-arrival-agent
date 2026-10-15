export default async function handler(req: any, res: any) {
  // Set CORS headers
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey, x-lta-account-key');
  }

  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : new Response(null, { status: 200 });
  }

  const isKeyConfigured = Boolean(
    process.env.LTA_ACCOUNT_KEY || 
    process.env.LTA_DATAMALL_KEY || 
    (req.headers && (req.headers['x-lta-account-key'] || req.headers['accountkey']))
  );

  const payload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SG Bus Arrival Serverless API',
    uptime: typeof process !== 'undefined' && process.uptime ? process.uptime() : undefined,
    endpoints: {
      health: '/api/health',
      busArrival: '/api/busarrival?BusStopCode=83139'
    },
    ltaKeyConfigured: isKeyConfigured
  };

  if (res.status && res.json) {
    return res.status(200).json(payload);
  }

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
