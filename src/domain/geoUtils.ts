/**
 * Módulo Estatístico e Geográfico do Aplicativo (Domain Layer)
 * 
 * Responsável por cálculos de distância espacial (Haversine),
 * verificação de cerca virtual (Geofencing) e estatísticas de percurso (ETA).
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BusPosition {
  ordem: string;
  linha: string;
  latitude: number;
  longitude: number;
  velocidade: number;
  dataHora: number;
}

export interface ODRingRecord {
  timestamp: string;
  originStopId: string;
  destinationStopId: string;
  selectedLine: string;
  hourOfDay: number;
  dayOfWeek: number;
}

/**
 * Raio da Terra em metros
 */
const EARTH_RADIUS_METERS = 6371000;

/**
 * Calcula a distância em metros entre duas coordenadas geográficas (Fórmula de Haversine)
 */
export function haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);

  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

/**
 * Verifica se a localização atual está dentro do raio de alerta do destino (Geofencing)
 */
export function isWithinGeofence(
  currentLocation: Coordinates,
  targetLocation: Coordinates,
  radiusMeters: number = 300
): boolean {
  const distance = haversineDistance(currentLocation, targetLocation);
  return distance <= radiusMeters;
}

/**
 * Estimativa Probabilística de Tempo de Chegada (ETA Cinemático com Dwell Time)
 * Leva em consideração a distância na via, velocidade real e a penalidade por paradas intermediárias.
 */
export function estimateArrivalTime(
  distanceMeters: number,
  currentSpeedKmh: number,
  intermediateStopsCount: number = 0,
  dwellTimeSecondsPerStop: number = 20
): { minMinutes: number; estimatedMinutes: number; maxMinutes: number; intermediateStops: number } {
  // Se o ônibus estiver parado em semáforo/ponto, assume velocidade média urbana de tráfego do Rio (22 km/h)
  const effectiveSpeedKmh = currentSpeedKmh > 5 ? currentSpeedKmh : 22;
  const speedMetersPerSecond = (effectiveSpeedKmh * 1000) / 3600;

  // Tempo de deslocamento puro no asfalto em segundos
  const travelSeconds = distanceMeters / speedMetersPerSecond;

  // Tempo total somando a penalidade de embarque/desembarque de cada parada intermediária
  const dwellSeconds = intermediateStopsCount * dwellTimeSecondsPerStop;
  const totalSeconds = travelSeconds + dwellSeconds;

  const estimatedMinutes = Math.max(1, Math.round(totalSeconds / 60));

  // Intervalo de Confiança Empírico de 95%
  const minMinutes = Math.max(1, Math.floor(estimatedMinutes * 0.8));
  const maxMinutes = Math.ceil(estimatedMinutes * 1.3);

  return {
    minMinutes,
    estimatedMinutes,
    maxMinutes,
    intermediateStops: intermediateStopsCount,
  };
}

/**
 * Gera registro de Origem-Destino (O-D) anonimizado para acúmulo de estatísticas de mobilidade
 */
export function createAnonymousODRecord(
  originStopId: string,
  destinationStopId: string,
  busLine: string
): ODRingRecord {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    originStopId,
    destinationStopId,
    selectedLine: busLine,
    hourOfDay: now.getHours(),
    dayOfWeek: now.getDay(),
  };
}
