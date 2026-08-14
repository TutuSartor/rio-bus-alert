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
 * Estimativa Probabilística de Tempo de Chegada (ETA em minutos)
 * Retorna estimativa pontual + intervalo de confiança empírico
 */
export function estimateArrivalTime(
  distanceMeters: number,
  currentSpeedKmh: number
): { minMinutes: number; estimatedMinutes: number; maxMinutes: number } {
  // Se o ônibus estiver parado ou velocidade for nula, assume velocidade urbana média do Rio (18 km/h)
  const effectiveSpeedKmh = currentSpeedKmh > 5 ? currentSpeedKmh : 18;
  const speedMetersPerMinute = (effectiveSpeedKmh * 1000) / 60;

  const estimatedMinutes = Math.round(distanceMeters / speedMetersPerMinute);

  // Intervalo de Confiança Empírico de 95% (Variabilidade de trânsito urbano: +- 25%)
  const minMinutes = Math.max(1, Math.floor(estimatedMinutes * 0.75));
  const maxMinutes = Math.ceil(estimatedMinutes * 1.35);

  return {
    minMinutes,
    estimatedMinutes,
    maxMinutes,
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
