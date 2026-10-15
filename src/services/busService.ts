import { BusStop, ServiceArrival, NextBusInfo, BusLoad, BusType, BusOperator, CommuteAlert, PredictionDetail } from '../types/bus';
import { SINGAPORE_BUS_STOPS, SAMPLE_BUS_ROUTES } from '../data/singaporeBuses';

// Seeded state storage to simulate realistic continuous bus arrivals per stop
interface StopSimulationState {
  lastUpdated: number;
  arrivals: ServiceArrival[];
}

const simulationCache: Map<string, StopSimulationState> = new Map();

// Helper to determine operator for a given service number
export function getOperatorForService(serviceNo: string): BusOperator {
  const num = parseInt(serviceNo, 10);
  if (['190', '960', '857', '961', '970', '972', '856', '900', '911', '912', '913'].includes(serviceNo)) return 'SMRT';
  if (['106', '41', '49', '66', '78', '79', '97', '98', '143', '173', '183', '333', '334', '335'].includes(serviceNo)) return 'TTS';
  if (['3', '4', '8', '19', '20', '23', '28', '29', '31', '37', '38', '67', '72', '81'].includes(serviceNo) && num <= 40) return 'GAS';
  return 'SBST';
}

// Generate realistic destination name
export function getDestinationForService(serviceNo: string): string {
  if (SAMPLE_BUS_ROUTES[serviceNo]) {
    return SAMPLE_BUS_ROUTES[serviceNo].Destination;
  }
  const destinations = [
    'Jurong East Int', 'Tampines Int', 'Woodlands Int', 'Bedok Int',
    'Clementi Int', 'Shenton Way Ter', 'Kampong Bahru Ter', 'Marina Centre Ter',
    'Serangoon Int', 'Bishan Int', 'Hougang Central Int', 'Changi Airport PTB2'
  ];
  const charCodeSum = serviceNo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return destinations[charCodeSum % destinations.length];
}

// Prediction model calculating confidence, traffic factors, and ETA ranges
export function calculatePrediction(minutesAway: number, serviceNo: string, stopCode: string): PredictionDetail {
  const currentHour = new Date().getHours();
  const isPeakHour = (currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 20);

  let confidenceScore = 95;
  let congestion: 'Low' | 'Moderate' | 'Heavy' = 'Low';
  let trafficCondition = 'Normal free flow transit corridor';
  let dwellTime = 20;

  if (minutesAway <= 2) {
    confidenceScore = 98;
    congestion = isPeakHour ? 'Moderate' : 'Low';
    trafficCondition = 'Vehicle within 600m sensor perimeter';
    dwellTime = 25;
  } else if (minutesAway <= 6) {
    confidenceScore = isPeakHour ? 91 : 94;
    congestion = isPeakHour ? 'Moderate' : 'Low';
    trafficCondition = isPeakHour ? 'Moderate CBD traffic signal queue' : 'Continuous green wave sequence';
    dwellTime = 30;
  } else if (minutesAway <= 12) {
    confidenceScore = isPeakHour ? 84 : 88;
    congestion = isPeakHour ? 'Heavy' : 'Moderate';
    trafficCondition = isPeakHour ? 'Peak commuter boarding surge at preceding interchange' : 'Standard arterial flow';
    dwellTime = 35;
  } else {
    confidenceScore = isPeakHour ? 78 : 82;
    congestion = isPeakHour ? 'Heavy' : 'Moderate';
    trafficCondition = 'Expressway upstream transit segment';
    dwellTime = 40;
  }

  const minRange = Math.max(0, minutesAway - (minutesAway > 5 ? 1 : 0));
  const maxRange = minutesAway + (minutesAway > 3 ? (isPeakHour ? 2 : 1) : 0);

  return {
    confidenceScore,
    congestionFactor: congestion,
    trafficCondition,
    weatherImpact: 'None',
    historicalAccuracy: `${(96 + (parseInt(serviceNo, 10) % 4) * 0.9).toFixed(1)}% within ±1 min`,
    etaRange: minutesAway === 0 ? 'Now' : `${minRange} - ${maxRange} mins`,
    dwellTimeFactorSeconds: dwellTime
  };
}

// Helper to build a NextBusInfo item
function createNextBus(seconds: number, originCode: string, destCode: string, index: number, serviceNo: string, stopCode: string): NextBusInfo {
  const arrivalTime = new Date(Date.now() + seconds * 1000);
  const minutes = Math.max(0, Math.floor(seconds / 60));
  
  // Deterministic realistic load and type based on hash
  const hash = (parseInt(serviceNo.replace(/\D/g, '') || '7', 10) * 17 + index * 31 + parseInt(stopCode, 10)) % 100;
  
  let load: BusLoad = 'SEA';
  if (hash > 70) load = 'LSD';
  else if (hash > 40) load = 'SDA';

  let type: BusType = 'SD';
  if (['190', '65', '147', '7', '14', '166', '960'].includes(serviceNo)) {
    type = hash % 2 === 0 ? 'DD' : 'SD';
  } else if (['857', '106'].includes(serviceNo) && hash % 5 === 0) {
    type = 'BD';
  }

  const hours = arrivalTime.getHours().toString().padStart(2, '0');
  const mins = arrivalTime.getMinutes().toString().padStart(2, '0');
  const secs = arrivalTime.getSeconds().toString().padStart(2, '0');

  return {
    OriginCode: originCode,
    DestinationCode: destCode,
    EstimatedArrival: arrivalTime.toISOString(),
    Latitude: '1.3044',
    Longitude: '103.8340',
    VisitNumber: '1',
    Load: load,
    Feature: 'WAB',
    Type: type,
    MinutesAway: minutes,
    SecondsAway: seconds,
    IsApproaching: seconds < 60,
    EstimatedTimeFormatted: `${hours}:${mins}:${secs}`
  };
}

// Generate realistic initial arrivals for a stop
export function getSimulatedArrivals(stop: BusStop): ServiceArrival[] {
  const cached = simulationCache.get(stop.BusStopCode);
  const now = Date.now();

  if (cached && now - cached.lastUpdated < 1500) {
    return cached.arrivals;
  }

  const results: ServiceArrival[] = stop.Services.map((serviceNo, idx) => {
    // Generate realistic headway: bus 1 is 0-8 mins, bus 2 is 7-18 mins, bus 3 is 16-28 mins
    const baseOffset = (idx * 97 + parseInt(stop.BusStopCode, 10)) % 420; // 0 to 7 mins
    const sec1 = Math.max(15, baseOffset);
    const sec2 = sec1 + 420 + ((idx * 67) % 360);
    const sec3 = sec2 + 540 + ((idx * 43) % 400);

    const nextBus = createNextBus(sec1, '44009', '10049', 1, serviceNo, stop.BusStopCode);
    const nextBus2 = createNextBus(sec2, '44009', '10049', 2, serviceNo, stop.BusStopCode);
    const nextBus3 = createNextBus(sec3, '44009', '10049', 3, serviceNo, stop.BusStopCode);

    return {
      ServiceNo: serviceNo,
      Operator: getOperatorForService(serviceNo),
      DestinationName: getDestinationForService(serviceNo),
      NextBus: nextBus,
      NextBus2: nextBus2,
      NextBus3: nextBus3,
      Prediction: calculatePrediction(nextBus.MinutesAway, serviceNo, stop.BusStopCode)
    };
  });

  // Sort services numerically/alphabetically
  results.sort((a, b) => {
    const na = parseInt(a.ServiceNo, 10);
    const nb = parseInt(b.ServiceNo, 10);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.ServiceNo.localeCompare(b.ServiceNo);
  });

  simulationCache.set(stop.BusStopCode, {
    lastUpdated: now,
    arrivals: results
  });

  return results;
}

// Tick simulated arrivals by 1 second, updating countdowns & rolling over arrived buses
export function tickArrivals(currentArrivals: ServiceArrival[], stopCode: string): ServiceArrival[] {
  return currentArrivals.map((service) => {
    let nb1 = service.NextBus;
    let nb2 = service.NextBus2;
    let nb3 = service.NextBus3;

    const decrementBus = (bus: NextBusInfo | null): NextBusInfo | null => {
      if (!bus) return null;
      const nextSeconds = bus.SecondsAway - 1;
      const minutes = Math.max(0, Math.floor(nextSeconds / 60));
      return {
        ...bus,
        SecondsAway: nextSeconds,
        MinutesAway: minutes,
        IsApproaching: nextSeconds < 60
      };
    };

    let updated1 = decrementBus(nb1);
    let updated2 = decrementBus(nb2);
    let updated3 = decrementBus(nb3);

    // If bus 1 has arrived and departed (< -15s), shift queue
    if (updated1 && updated1.SecondsAway <= -15) {
      updated1 = updated2;
      updated2 = updated3;
      // schedule new 3rd bus
      const newSec = (updated2 ? updated2.SecondsAway : 900) + 600 + Math.floor(Math.random() * 180);
      updated3 = createNextBus(newSec, '44009', '10049', 3, service.ServiceNo, stopCode);
    }

    const prediction = updated1 
      ? calculatePrediction(updated1.MinutesAway, service.ServiceNo, stopCode) 
      : service.Prediction;

    return {
      ...service,
      NextBus: updated1,
      NextBus2: updated2,
      NextBus3: updated3,
      Prediction: prediction
    };
  });
}

// Calculate distance between two lat/lng points in meters (Haversine formula)
export function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Storage helpers for favorites and alerts
const FAVORITES_KEY = 'sg_bus_favorites_v1';
const STARRED_SERVICES_KEY = 'sg_bus_starred_services_v1';
const ALERTS_KEY = 'sg_bus_commute_alerts_v1';

export function getFavoriteStopCodes(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['09048', '01112', '03011']; // Defaults to Orchard, Bugis, Raffles Place
  } catch {
    return ['09048', '01112', '03011'];
  }
}

export function saveFavoriteStopCodes(codes: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(codes));
  } catch {
    // ignore
  }
}

export function getStarredServices(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STARRED_SERVICES_KEY);
    return raw ? JSON.parse(raw) : { '09048': ['190', '65'] };
  } catch {
    return { '09048': ['190', '65'] };
  }
}

export function saveStarredServices(starred: Record<string, string[]>): void {
  try {
    localStorage.setItem(STARRED_SERVICES_KEY, JSON.stringify(starred));
  } catch {
    // ignore
  }
}

export function getCommuteAlerts(): CommuteAlert[] {
  try {
    const raw = localStorage.getItem(ALERTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCommuteAlerts(alerts: CommuteAlert[]): void {
  try {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  } catch {
    // ignore
  }
}
