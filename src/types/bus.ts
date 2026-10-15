export type BusLoad = 'SEA' | 'SDA' | 'LSD'; // Seats Available, Standing Available, Limited Standing
export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy
export type BusOperator = 'SBST' | 'SMRT' | 'TTS' | 'GAS'; // SBS Transit, SMRT, Tower Transit, Go-Ahead Singapore

export interface NextBusInfo {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string; // ISO 8601 string
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: BusLoad;
  Feature: 'WAB' | '';
  Type: BusType;
  // Computed client-side fields:
  MinutesAway: number;
  SecondsAway: number;
  IsApproaching: boolean;
  EstimatedTimeFormatted: string; // e.g. "14:35:10"
}

export interface PredictionDetail {
  confidenceScore: number; // e.g. 94 (%)
  congestionFactor: 'Low' | 'Moderate' | 'Heavy';
  trafficCondition: string; // e.g. "Expressway clear, normal traffic"
  weatherImpact: 'None' | 'Light Rain (+1-2m)' | 'Heavy Rain (+3-5m)';
  historicalAccuracy: string; // e.g. "98.2% within ±1 min"
  etaRange: string; // e.g. "3 - 4 mins"
  dwellTimeFactorSeconds: number; // e.g. 25
}

export interface ServiceArrival {
  ServiceNo: string;
  Operator: BusOperator;
  DestinationName: string;
  NextBus: NextBusInfo | null;
  NextBus2: NextBusInfo | null;
  NextBus3: NextBusInfo | null;
  Prediction: PredictionDetail;
}

export interface BusStop {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
  Services: string[];
  Zone?: string; // "Central" | "East" | "West" | "North" | "North-East"
  MrtConnection?: string; // e.g. "NS22 Orchard", "EW12 Bugis"
  DistanceMeters?: number;
}

export interface RouteStop {
  StopSequence: number;
  BusStopCode: string;
  RoadName: string;
  Description: string;
  DistanceKm: number;
  HasBusApproaching?: boolean;
  IncomingBusInfo?: {
    load: BusLoad;
    type: BusType;
    etaMinutes: number;
    busId: string;
  };
}

export interface BusRouteInfo {
  ServiceNo: string;
  Operator: BusOperator;
  Direction: 1 | 2;
  Origin: string;
  Destination: string;
  OperatingHours: string;
  FrequencyPeak: string; // e.g. "4 - 7 mins"
  FrequencyOffPeak: string; // e.g. "8 - 12 mins"
  Stops: RouteStop[];
}

export interface CommuteAlert {
  id: string;
  busStopCode: string;
  serviceNo: string;
  thresholdMinutes: number; // e.g. notify when <= 3 mins
  enabled: boolean;
  soundAlert: boolean;
  createdAt: number;
}
