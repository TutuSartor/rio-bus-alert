/**
 * Serviço de Consulta de Dados Espaciais e Rotas (Backend Domain Service)
 * 
 * Responsável por cruzar Pontos de Origem e Destino e identificar linhas diretas.
 */

import { haversineDistance, Coordinates } from '../domain/geoUtils';

// Importação dos dados estáticos processados
import busStopsData from '../../data/processed/rio_bus_stops.json';
import busRoutesData from '../../data/processed/rio_bus_routes.json';
import stopRoutesData from '../../data/processed/rio_stop_routes.json';

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
  distanceMeters?: number;
}

export interface BusRoute {
  id: string;
  shortName: string;
  longName: string;
  category?: string;
}

/**
 * Busca pontos de ônibus próximos a uma coordenada geográfica (ordenados por distância)
 */
export function getNearbyStops(
  userLocation: Coordinates,
  radiusMeters: number = 1000
): BusStop[] {
  return busStopsData
    .map((stop) => {
      const distance = haversineDistance(userLocation, {
        latitude: stop.latitude,
        longitude: stop.longitude,
      });
      return {
        ...stop,
        distanceMeters: Math.round(distance),
      };
    })
    .filter((stop) => stop.distanceMeters <= radiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

/**
 * Busca pontos de ônibus por nome ou bairro (Ex: "Central", "Copacabana")
 */
export function searchStopsByName(query: string): BusStop[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return busStopsData.filter(
    (stop) =>
      stop.name.toLowerCase().includes(normalized) ||
      (stop.neighborhood && stop.neighborhood.toLowerCase().includes(normalized))
  );
}

/**
 * ALGORITMO CHAVE: Identifica quais linhas de ônibus conectam DIRETAMENTE a Origem ao Destino
 */
export function findDirectConnectingRoutes(
  originStopId: string,
  destinationStopId: string
): BusRoute[] {
  // 1. Obter todas as linhas que passam no Ponto de Origem
  const originRouteIds = new Set(
    stopRoutesData
      .filter((item) => item.stopId === originStopId)
      .map((item) => item.routeId)
  );

  // 2. Obter todas as linhas que passam no Ponto de Destino
  const destRouteIds = new Set(
    stopRoutesData
      .filter((item) => item.stopId === destinationStopId)
      .map((item) => item.routeId)
  );

  // 3. Interseção de conjuntos (Linhas que passam em AMBOS os pontos)
  const commonRouteIds = Array.from(originRouteIds).filter((routeId) =>
    destRouteIds.has(routeId)
  );

  // 4. Retornar os detalhes das linhas encontradas
  return busRoutesData.filter((route) => commonRouteIds.includes(route.id));
}
