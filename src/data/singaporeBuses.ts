import { BusStop, BusRouteInfo } from '../types/bus';

export const SINGAPORE_BUS_STOPS: BusStop[] = [
  {
    BusStopCode: '09048',
    RoadName: 'Orchard Rd',
    Description: 'Orchard Stn/Lucky Plaza',
    Latitude: 1.3044,
    Longitude: 103.8340,
    Services: ['7', '14', '36', '65', '106', '124', '143', '167', '174', '190'],
    Zone: 'Central',
    MrtConnection: 'NS22/TE14 Orchard'
  },
  {
    BusStopCode: '09038',
    RoadName: 'Orchard Blvd',
    Description: 'Bef Orchard Stn Exit 13',
    Latitude: 1.3032,
    Longitude: 103.8315,
    Services: ['7', '36', '106', '124', '174'],
    Zone: 'Central',
    MrtConnection: 'NS22/TE14 Orchard'
  },
  {
    BusStopCode: '08111',
    RoadName: 'Somerset Rd',
    Description: 'Somerset Stn (opp 313@Somerset)',
    Latitude: 1.3005,
    Longitude: 103.8385,
    Services: ['7', '14', '65', '106', '124', '143', '174', '190'],
    Zone: 'Central',
    MrtConnection: 'NS23 Somerset'
  },
  {
    BusStopCode: '08057',
    RoadName: 'Orchard Rd',
    Description: 'Dhoby Ghaut Stn Exit B',
    Latitude: 1.2988,
    Longitude: 103.8456,
    Services: ['7', '14', '36', '65', '124', '174', '190', '857'],
    Zone: 'Central',
    MrtConnection: 'NS24/NE6/CC1 Dhoby Ghaut'
  },
  {
    BusStopCode: '01112',
    RoadName: 'Victoria St',
    Description: 'Bugis Stn Exit A',
    Latitude: 1.3008,
    Longitude: 103.8561,
    Services: ['7', '12', '33', '61', '63', '145', '175', '197', '857'],
    Zone: 'Central',
    MrtConnection: 'EW12/DT14 Bugis'
  },
  {
    BusStopCode: '01059',
    RoadName: 'Rochor Rd',
    Description: 'Fu Lu Shou Complex / Bugis Stn Exit B',
    Latitude: 1.3022,
    Longitude: 103.8542,
    Services: ['48', '57', '170', '851', '960', '980'],
    Zone: 'Central',
    MrtConnection: 'EW12/DT14 Bugis'
  },
  {
    BusStopCode: '04168',
    RoadName: 'Victoria St',
    Description: 'Bras Basah Complex / Opp National Library',
    Latitude: 1.2969,
    Longitude: 103.8532,
    Services: ['7', '12', '14', '36', '130', '133', '145', '197', '857', '960'],
    Zone: 'Central',
    MrtConnection: 'CC2 Bras Basah'
  },
  {
    BusStopCode: '03011',
    RoadName: 'Fullerton Rd',
    Description: 'Fullerton Sq / Raffles Place Stn Exit F',
    Latitude: 1.2858,
    Longitude: 103.8528,
    Services: ['10', '70', '100', '107', '130', '131', '167', '196'],
    Zone: 'Central',
    MrtConnection: 'EW14/NS26 Raffles Place'
  },
  {
    BusStopCode: '03211',
    RoadName: 'Bayfront Ave',
    Description: 'Bayfront Stn Exit B / Marina Bay Sands',
    Latitude: 1.2828,
    Longitude: 103.8592,
    Services: ['97', '106', '133', '502', '518'],
    Zone: 'Central',
    MrtConnection: 'CE1/DT16 Bayfront'
  },
  {
    BusStopCode: '05013',
    RoadName: 'New Bridge Rd',
    Description: 'Chinatown Point / Chinatown Stn Exit E',
    Latitude: 1.2852,
    Longitude: 103.8449,
    Services: ['2', '12', '33', '54', '143', '147', '190', '961', '970'],
    Zone: 'Central',
    MrtConnection: 'NE4/DT19 Chinatown'
  },
  {
    BusStopCode: '04239',
    RoadName: 'Eu Tong Sen St',
    Description: 'Clarke Quay Stn Exit E / Central',
    Latitude: 1.2889,
    Longitude: 103.8465,
    Services: ['2', '12', '33', '54', '147', '190'],
    Zone: 'Central',
    MrtConnection: 'NE5 Clarke Quay'
  },
  {
    BusStopCode: '28009',
    RoadName: 'Jurong Gateway Rd',
    Description: 'Jurong East Bus Interchange',
    Latitude: 1.3331,
    Longitude: 103.7422,
    Services: ['41', '49', '51', '66', '78', '79', '97', '98', '105', '143', '160', '183', '333', '334', '335', '506'],
    Zone: 'West',
    MrtConnection: 'NS1/EW24 Jurong East'
  },
  {
    BusStopCode: '75009',
    RoadName: 'Tampines Ave 4',
    Description: 'Tampines Bus Interchange',
    Latitude: 1.3533,
    Longitude: 103.9452,
    Services: ['3', '4', '8', '10', '19', '20', '23', '28', '29', '31', '37', '38', '65', '67', '72', '81'],
    Zone: 'East',
    MrtConnection: 'EW2/DT32 Tampines'
  },
  {
    BusStopCode: '46009',
    RoadName: 'Woodlands Sq',
    Description: 'Woodlands Integrated Transport Hub',
    Latitude: 1.4369,
    Longitude: 103.7865,
    Services: ['161', '168', '178', '187', '856', '900', '901', '903', '911', '912', '913', '960', '961', '962', '963', '965', '966', '969'],
    Zone: 'North',
    MrtConnection: 'NS9/TE2 Woodlands'
  },
  {
    BusStopCode: '53009',
    RoadName: 'Bishan St 13',
    Description: 'Bishan Bus Interchange / Junction 8',
    Latitude: 1.3508,
    Longitude: 103.8488,
    Services: ['50', '52', '53', '54', '55', '56', '57', '58', '59', '410'],
    Zone: 'North-East',
    MrtConnection: 'NS17/CC15 Bishan'
  },
  {
    BusStopCode: '66009',
    RoadName: 'Serangoon Ave 2',
    Description: 'Serangoon Interchange / Nex Mall',
    Latitude: 1.3505,
    Longitude: 103.8735,
    Services: ['100', '101', '103', '105', '109', '147', '153', '158', '315', '317'],
    Zone: 'North-East',
    MrtConnection: 'NE12/CC13 Serangoon'
  },
  {
    BusStopCode: '17009',
    RoadName: 'Clementi Ave 3',
    Description: 'Clementi Bus Interchange / The Clementi Mall',
    Latitude: 1.3151,
    Longitude: 103.7652,
    Services: ['7', '14', '96', '99', '147', '156', '165', '166', '173', '175', '196', '282', '284', '285'],
    Zone: 'West',
    MrtConnection: 'EW23 Clementi'
  },
  {
    BusStopCode: '95009',
    RoadName: 'PTB2 Basement',
    Description: 'Changi Airport Terminal 2',
    Latitude: 1.3551,
    Longitude: 103.9892,
    Services: ['24', '27', '34', '36', '53', '110', '858'],
    Zone: 'East',
    MrtConnection: 'CG2 Changi Airport'
  }
];

export const BUS_OPERATOR_COLORS = {
  SBST: {
    name: 'SBS Transit',
    badge: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    accent: '#a855f7'
  },
  SMRT: {
    name: 'SMRT Buses',
    badge: 'bg-red-950/80 text-red-300 border-red-800/60',
    accent: '#ef4444'
  },
  TTS: {
    name: 'Tower Transit',
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    accent: '#10b981'
  },
  GAS: {
    name: 'Go-Ahead Singapore',
    badge: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    accent: '#f59e0b'
  }
};

export const CROWD_LOAD_LABELS = {
  SEA: {
    text: 'Seats Available',
    short: 'Seats Avail',
    badgeClass: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50',
    dotClass: 'bg-emerald-500'
  },
  SDA: {
    text: 'Standing Available',
    short: 'Standing',
    badgeClass: 'text-amber-300 bg-amber-950/60 border-amber-800/50',
    dotClass: 'bg-amber-400'
  },
  LSD: {
    text: 'Limited Standing',
    short: 'Crowded',
    badgeClass: 'text-rose-400 bg-rose-950/60 border-rose-800/50',
    dotClass: 'bg-rose-500'
  }
};

export const BUS_TYPE_LABELS = {
  SD: { label: 'Single Deck', short: 'SD' },
  DD: { label: 'Double Deck', short: 'DD' },
  BD: { label: 'Bendy', short: 'Bendy' }
};

// Route details for popular Singapore bus services
export const SAMPLE_BUS_ROUTES: Record<string, BusRouteInfo> = {
  '190': {
    ServiceNo: '190',
    Operator: 'SMRT',
    Direction: 1,
    Origin: 'Choa Chu Kang Int',
    Destination: 'Kampong Bahru Ter (via Orchard, Clarke Quay)',
    OperatingHours: '05:30 - 23:45',
    FrequencyPeak: '3 - 6 mins',
    FrequencyOffPeak: '7 - 10 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '44009', RoadName: 'Choa Chu Kang Loop', Description: 'Choa Chu Kang Int', DistanceKm: 0.0 },
      { StopSequence: 6, BusStopCode: '43141', RoadName: 'Bukit Panjang Rd', Description: 'Blk 223 / Senja LRT', DistanceKm: 4.8 },
      { StopSequence: 12, BusStopCode: '40051', RoadName: 'BKE / PIE Expressway', Description: 'Whitley Rd Flying Bridge', DistanceKm: 12.4 },
      { StopSequence: 15, BusStopCode: '09038', RoadName: 'Orchard Blvd', Description: 'Bef Orchard Stn Exit 13', DistanceKm: 16.2 },
      { StopSequence: 16, BusStopCode: '09048', RoadName: 'Orchard Rd', Description: 'Orchard Stn/Lucky Plaza', DistanceKm: 16.9 },
      { StopSequence: 17, BusStopCode: '08111', RoadName: 'Somerset Rd', Description: 'Somerset Stn (opp 313@Somerset)', DistanceKm: 17.6 },
      { StopSequence: 18, BusStopCode: '08057', RoadName: 'Orchard Rd', Description: 'Dhoby Ghaut Stn Exit B', DistanceKm: 18.5 },
      { StopSequence: 20, BusStopCode: '04239', RoadName: 'Eu Tong Sen St', Description: 'Clarke Quay Stn Exit E / Central', DistanceKm: 19.8 },
      { StopSequence: 22, BusStopCode: '05013', RoadName: 'New Bridge Rd', Description: 'Chinatown Point', DistanceKm: 20.6 },
      { StopSequence: 25, BusStopCode: '10049', RoadName: 'Spooner Rd', Description: 'Kampong Bahru Bus Ter', DistanceKm: 22.8 }
    ]
  },
  '65': {
    ServiceNo: '65',
    Operator: 'SBST',
    Direction: 1,
    Origin: 'Tampines Int',
    Destination: 'HarbourFront Int (via MacPherson, Orchard)',
    OperatingHours: '05:30 - 23:30',
    FrequencyPeak: '5 - 8 mins',
    FrequencyOffPeak: '9 - 13 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '75009', RoadName: 'Tampines Ave 4', Description: 'Tampines Bus Interchange', DistanceKm: 0.0 },
      { StopSequence: 5, BusStopCode: '76191', RoadName: 'Tampines Ave 5', Description: 'Opp Our Tampines Hub', DistanceKm: 1.8 },
      { StopSequence: 15, BusStopCode: '70091', RoadName: 'Bedok Reservoir Rd', Description: 'Blk 745', DistanceKm: 6.2 },
      { StopSequence: 24, BusStopCode: '60111', RoadName: 'MacPherson Rd', Description: 'Bef Belilios Public Rd', DistanceKm: 11.5 },
      { StopSequence: 31, BusStopCode: '08057', RoadName: 'Orchard Rd', Description: 'Dhoby Ghaut Stn Exit B', DistanceKm: 15.3 },
      { StopSequence: 33, BusStopCode: '08111', RoadName: 'Somerset Rd', Description: 'Somerset Stn (opp 313)', DistanceKm: 16.2 },
      { StopSequence: 35, BusStopCode: '09048', RoadName: 'Orchard Rd', Description: 'Orchard Stn/Lucky Plaza', DistanceKm: 17.1 },
      { StopSequence: 42, BusStopCode: '10141', RoadName: 'Lower Delta Rd', Description: 'Opp Cendex Ctr', DistanceKm: 21.0 },
      { StopSequence: 46, BusStopCode: '14059', RoadName: 'Telok Blangah Rd', Description: 'HarbourFront Int / VivoCity', DistanceKm: 24.2 }
    ]
  },
  '147': {
    ServiceNo: '147',
    Operator: 'SBST',
    Direction: 1,
    Origin: 'Hougang Central Int',
    Destination: 'Clementi Int (via Chinatown, Alexandra)',
    OperatingHours: '05:40 - 23:50',
    FrequencyPeak: '4 - 7 mins',
    FrequencyOffPeak: '8 - 12 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '64009', RoadName: 'Hougang Central', Description: 'Hougang Central Int', DistanceKm: 0.0 },
      { StopSequence: 8, BusStopCode: '66009', RoadName: 'Serangoon Ave 2', Description: 'Serangoon Interchange / Nex', DistanceKm: 3.5 },
      { StopSequence: 19, BusStopCode: '01112', RoadName: 'Victoria St', Description: 'Bugis Stn Exit A', DistanceKm: 8.9 },
      { StopSequence: 23, BusStopCode: '04239', RoadName: 'Eu Tong Sen St', Description: 'Clarke Quay Stn Exit E', DistanceKm: 10.4 },
      { StopSequence: 25, BusStopCode: '05013', RoadName: 'New Bridge Rd', Description: 'Chinatown Point', DistanceKm: 11.2 },
      { StopSequence: 32, BusStopCode: '11019', RoadName: 'Jln Bukit Merah', Description: 'Blk 201 ABC Market', DistanceKm: 14.8 },
      { StopSequence: 40, BusStopCode: '11361', RoadName: 'Commonwealth Ave West', Description: 'Buona Vista Stn Exit C', DistanceKm: 18.9 },
      { StopSequence: 45, BusStopCode: '17009', RoadName: 'Clementi Ave 3', Description: 'Clementi Bus Interchange', DistanceKm: 22.4 }
    ]
  },
  '106': {
    ServiceNo: '106',
    Operator: 'TTS',
    Direction: 1,
    Origin: 'Bukit Batok Int',
    Destination: 'Shenton Way Ter (via Orchard, Marina Bay)',
    OperatingHours: '05:30 - 23:45',
    FrequencyPeak: '4 - 7 mins',
    FrequencyOffPeak: '8 - 12 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '43009', RoadName: 'Bt Batok Central', Description: 'Bukit Batok Bus Int', DistanceKm: 0.0 },
      { StopSequence: 10, BusStopCode: '11361', RoadName: 'North Buona Vista Rd', Description: 'Buona Vista Stn Exit C', DistanceKm: 6.8 },
      { StopSequence: 18, BusStopCode: '09038', RoadName: 'Orchard Blvd', Description: 'Bef Orchard Stn Exit 13', DistanceKm: 12.1 },
      { StopSequence: 19, BusStopCode: '09048', RoadName: 'Orchard Rd', Description: 'Orchard Stn/Lucky Plaza', DistanceKm: 12.8 },
      { StopSequence: 20, BusStopCode: '08111', RoadName: 'Somerset Rd', Description: 'Somerset Stn (opp 313)', DistanceKm: 13.5 },
      { StopSequence: 24, BusStopCode: '03211', RoadName: 'Bayfront Ave', Description: 'Bayfront Stn Exit B / MBS', DistanceKm: 16.4 },
      { StopSequence: 28, BusStopCode: '03011', RoadName: 'Shenton Way', Description: 'UIC Bldg / Raffles Place', DistanceKm: 18.2 }
    ]
  },
  '7': {
    ServiceNo: '7',
    Operator: 'SBST',
    Direction: 1,
    Origin: 'Bedok Int',
    Destination: 'Clementi Int (via Bugis, Orchard, Holland V)',
    OperatingHours: '05:30 - 23:30',
    FrequencyPeak: '4 - 8 mins',
    FrequencyOffPeak: '8 - 12 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '84009', RoadName: 'Bedok North Ave 1', Description: 'Bedok Bus Interchange', DistanceKm: 0.0 },
      { StopSequence: 14, BusStopCode: '01112', RoadName: 'Victoria St', Description: 'Bugis Stn Exit A', DistanceKm: 9.2 },
      { StopSequence: 16, BusStopCode: '04168', RoadName: 'Victoria St', Description: 'Bras Basah Complex', DistanceKm: 10.1 },
      { StopSequence: 18, BusStopCode: '08057', RoadName: 'Orchard Rd', Description: 'Dhoby Ghaut Stn Exit B', DistanceKm: 11.2 },
      { StopSequence: 20, BusStopCode: '09048', RoadName: 'Orchard Rd', Description: 'Orchard Stn/Lucky Plaza', DistanceKm: 12.6 },
      { StopSequence: 25, BusStopCode: '11261', RoadName: 'Holland Rd', Description: 'Holland Village MRT', DistanceKm: 16.3 },
      { StopSequence: 30, BusStopCode: '17009', RoadName: 'Clementi Ave 3', Description: 'Clementi Bus Interchange', DistanceKm: 21.5 }
    ]
  },
  '960': {
    ServiceNo: '960',
    Operator: 'SMRT',
    Direction: 1,
    Origin: 'Woodlands Temp Int',
    Destination: 'Marina Centre Ter (via Bugis, Suntec)',
    OperatingHours: '05:30 - 23:30',
    FrequencyPeak: '5 - 8 mins',
    FrequencyOffPeak: '9 - 14 mins',
    Stops: [
      { StopSequence: 1, BusStopCode: '46009', RoadName: 'Woodlands Sq', Description: 'Woodlands Integrated Transport Hub', DistanceKm: 0.0 },
      { StopSequence: 8, BusStopCode: '46261', RoadName: 'Marsiling Rd', Description: 'Marsiling Stn Exit A', DistanceKm: 3.4 },
      { StopSequence: 15, BusStopCode: '44019', RoadName: 'BKE Expressway', Description: 'BKE Highway Express Sector', DistanceKm: 12.0 },
      { StopSequence: 22, BusStopCode: '01059', RoadName: 'Rochor Rd', Description: 'Fu Lu Shou Complex / Bugis Stn', DistanceKm: 21.4 },
      { StopSequence: 24, BusStopCode: '04168', RoadName: 'Victoria St', Description: 'Bras Basah Complex', DistanceKm: 22.3 },
      { StopSequence: 27, BusStopCode: '02099', RoadName: 'Raffles Ave', Description: 'The Float @ Marina Bay', DistanceKm: 24.5 }
    ]
  }
};
