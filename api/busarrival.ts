export default async function handler(req: any, res: any) {
  // Set CORS headers for browser clients
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey, x-lta-account-key');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    if (res.status) {
      return res.status(200).end();
    }
    return new Response(null, { status: 200 });
  }

  try {
    // Extract BusStopCode and optional ServiceNo from query or URL
    let busStopCode = '83139'; // Default sample stop requested by user
    let serviceNo = '';

    if (req.query) {
      if (req.query.BusStopCode) busStopCode = String(req.query.BusStopCode).trim();
      if (req.query.busStopCode) busStopCode = String(req.query.busStopCode).trim();
      if (req.query.ServiceNo) serviceNo = String(req.query.ServiceNo).trim();
      if (req.query.serviceNo) serviceNo = String(req.query.serviceNo).trim();
    } else if (req.url) {
      const parsedUrl = new URL(req.url, 'http://localhost');
      const bsc = parsedUrl.searchParams.get('BusStopCode') || parsedUrl.searchParams.get('busStopCode');
      const svc = parsedUrl.searchParams.get('ServiceNo') || parsedUrl.searchParams.get('serviceNo');
      if (bsc) busStopCode = bsc.trim();
      if (svc) serviceNo = svc.trim();
    }

    if (!busStopCode) {
      const errPayload = {
        error: 'INVALID_REQUEST',
        message: 'BusStopCode parameter is required (e.g. /api/busarrival?BusStopCode=83139)'
      };
      if (res.status && res.json) return res.status(400).json(errPayload);
      return new Response(JSON.stringify(errPayload), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Resolve AccountKey from environment or request headers (do not hardcode keys)
    const accountKey = 
      process.env.LTA_ACCOUNT_KEY ||
      process.env.LTA_DATAMALL_KEY ||
      (req.headers && (req.headers['accountkey'] || req.headers['x-lta-account-key']));

    if (!accountKey) {
      const missingKeyPayload = {
        error: 'LTA_ACCOUNT_KEY_MISSING',
        message: 'LTA DataMall AccountKey is not configured. Please set the LTA_ACCOUNT_KEY environment variable in your deployment or pass the AccountKey / x-lta-account-key header.',
        BusStopCode: busStopCode,
        configured: false,
        hint: 'Get your free key from https://datamall.lta.gov.sg/ and set LTA_ACCOUNT_KEY in .env or your host environment variables.'
      };
      if (res.status && res.json) return res.status(401).json(missingKeyPayload);
      return new Response(JSON.stringify(missingKeyPayload), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build LTA DataMall v3 URL
    const targetUrl = new URL('https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival');
    targetUrl.searchParams.set('BusStopCode', busStopCode);
    if (serviceNo) {
      targetUrl.searchParams.set('ServiceNo', serviceNo);
    }

    const ltaResponse = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'AccountKey': String(accountKey).trim(),
        'accept': 'application/json'
      }
    });

    if (!ltaResponse.ok) {
      const errorText = await ltaResponse.text();
      const errorPayload = {
        error: 'LTA_UPSTREAM_ERROR',
        status: ltaResponse.status,
        statusText: ltaResponse.statusText,
        message: errorText || 'Failed to retrieve live bus arrivals from LTA DataMall',
        BusStopCode: busStopCode
      };

      if (res.status && res.json) return res.status(ltaResponse.status).json(errorPayload);
      return new Response(JSON.stringify(errorPayload), {
        status: ltaResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await ltaResponse.json();

    if (res.status && res.json) {
      return res.status(200).json(data);
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    const catchPayload = {
      error: 'SERVERLESS_PROXY_EXCEPTION',
      message: error?.message || 'Internal error querying LTA DataMall v3 BusArrival',
      timestamp: new Date().toISOString()
    };

    if (res.status && res.json) {
      return res.status(500).json(catchPayload);
    }

    return new Response(JSON.stringify(catchPayload), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
