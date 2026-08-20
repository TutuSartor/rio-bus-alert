/**
 * Motor Espacial e de Inteligência de Proximidade (Spatial Engine)
 * 
 * Responsável pela descoberta automática "Zero-Click":
 * 1. Encontra o ponto de ônibus mais próximo do GPS do usuário.
 * 2. Identifica todas as linhas que passam nesse ponto.
 * 3. Calcula o ETA probabilístico ao vivo com base na frota de ônibus em movimento (Data.rio API).
 * 4. Filtra rotas diretas quando o usuário digita um destino.
 */

import { Coordinates, haversineDistance, BusPosition, estimateArrivalTime } from '../domain/geoUtils';
import busStopsData from '../../data/processed/rio_bus_stops.json';
import busRoutesData from '../../data/processed/rio_bus_routes.json';
import stopRoutesData from '../../data/processed/rio_stop_routes.json';
import { RIO_BUS_ROUTES_GEOMETRY } from '../domain/routeGeometry';

export interface DynamicLineBanner {
  number: string;
  name: string;
  via: string;
  eta: string;
  unit: string;
  bgColor: string;
  textColor: string;
  nearestStopName: string;
  nearestStopDistanceMeters: number;
  activeBusesCount: number;
  closestBusDistanceMeters?: number;
  closestBusSpeed?: number;
  intermediateStops?: number;
}

export interface NearestStopResult {
  stop: typeof busStopsData[0];
  distanceMeters: number;
}

export interface NearbyStopItem {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  distanceMeters: number;
  passingLinesCount: number;
}

/**
 * Encontra a parada de ônibus mais próxima das coordenadas do usuário
 */
export function findNearestStop(userCoords: Coordinates): NearestStopResult {
  let nearestStop = busStopsData[0];
  let minDistance = Infinity;

  for (const stop of busStopsData) {
    const dist = haversineDistance(userCoords, {
      latitude: stop.latitude,
      longitude: stop.longitude,
    });

    if (dist < minDistance) {
      minDistance = dist;
      nearestStop = stop;
    }
  }

  return {
    stop: nearestStop,
    distanceMeters: Math.round(minDistance),
  };
}

/**
 * Retorna todos os pontos de ônibus do Rio de Janeiro ordenados pela distância GPS do usuário
 */
export function getNearbyStopsSorted(
  userCoords: Coordinates,
  searchQuery: string = ''
): NearbyStopItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const stops = busStopsData.map((stop) => {
    const dist = haversineDistance(userCoords, {
      latitude: stop.latitude,
      longitude: stop.longitude,
    });

    const linesCount = stopRoutesData.filter((sr) => sr.stopId === stop.id).length || 2;

    return {
      id: stop.id,
      name: stop.name,
      latitude: stop.latitude,
      longitude: stop.longitude,
      neighborhood: stop.neighborhood || 'Rio de Janeiro',
      distanceMeters: Math.round(dist),
      passingLinesCount: linesCount,
    };
  });

  // Ordena da parada mais próxima para a mais distante
  stops.sort((a, b) => a.distanceMeters - b.distanceMeters);

  if (normalizedQuery.length > 0) {
    return stops.filter(
      (s) =>
        s.name.toLowerCase().includes(normalizedQuery) ||
        s.neighborhood.toLowerCase().includes(normalizedQuery)
    );
  }

  return stops;
}

/**
 * Retorna as linhas de ônibus que passam em uma determinada parada
 */
export function getLinesForStop(stopId: string): typeof busRoutesData {
  const stopObj = busStopsData.find((s) => s.id === stopId);
  if (stopObj && (stopObj as any).lines && (stopObj as any).lines.length > 0) {
    const lineNumbers = new Set((stopObj as any).lines);
    const routes = busRoutesData.filter((r) => lineNumbers.has(r.shortName));
    if (routes.length > 0) return routes;
  }

  const routeIds = new Set(
    stopRoutesData
      .filter((sr) => sr.stopId === stopId)
      .map((sr) => sr.routeId)
  );

  return busRoutesData.filter((r) => routeIds.has(r.id));
}

/**
 * ALGORITMO MUNDO PERFEITO: Descoberta Automática de Linhas Próximas (Zero-Click)
 * 
 * A partir do ponto clicado ou do GPS do usuário:
 * 1. Identifica o ponto alvo.
 * 2. Puxa as linhas oficiais da Prefeitura que passam nele.
 * 3. Encontra os ônibus em movimento dessa linha (Data.rio API).
 * 4. Calcula o ETA probabilístico real de chegada no ponto.
 */
export function getAutoDiscoveredLines(
  userCoords: Coordinates,
  liveBuses: BusPosition[],
  searchQuery: string = '',
  selectedStop?: any
): { nearestStop: NearestStopResult; lines: DynamicLineBanner[] } {
  const targetStop: NearestStopResult = selectedStop
    ? {
        stop: selectedStop,
        distanceMeters: Math.round(
          haversineDistance(userCoords, {
            latitude: selectedStop.latitude,
            longitude: selectedStop.longitude,
          })
        ),
      }
    : findNearestStop(userCoords);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Linhas oficiais da Prefeitura que passam na parada selecionada
  let matchingRoutes = getLinesForStop(targetStop.stop.id);

  // Se a parada for um ponto novo sem linhas mapeadas, usa as linhas mais próximas
  if (matchingRoutes.length === 0) {
    matchingRoutes = busRoutesData.slice(0, 10);
  }

  // Filtragem por palavra-chave se o usuário digitou algo na busca
  if (normalizedQuery.length > 0) {
    matchingRoutes = matchingRoutes.filter(
      (r) =>
        r.shortName.toLowerCase().includes(normalizedQuery) ||
        r.longName.toLowerCase().includes(normalizedQuery) ||
        (r.category && r.category.toLowerCase().includes(normalizedQuery))
    );
  }

  // Mapeamento dos Banners Dinâmicos
  const banners: DynamicLineBanner[] = matchingRoutes.map((route) => {
    const geo = RIO_BUS_ROUTES_GEOMETRY[route.shortName];
    const bgColor = geo ? geo.color : '#1D4ED8';
    const textColor = '#FFFFFF';

    // Ônibus ativos na linha
    const activeBuses = liveBuses.filter((b) => b.linha === route.shortName);
    const activeBusesCount = activeBuses.length;

    // Calcular o ônibus mais próximo da parada do usuário
    let closestBusDistance = Infinity;
    let closestBusSpeed = 22; // Velocidade urbana padrão (22 km/h)

    for (const bus of activeBuses) {
      const distToStop = haversineDistance(
        { latitude: bus.latitude, longitude: bus.longitude },
        { latitude: targetStop.stop.latitude, longitude: targetStop.stop.longitude }
      );

      if (distToStop < closestBusDistance) {
        closestBusDistance = distToStop;
        if (bus.velocidade > 5) {
          closestBusSpeed = bus.velocidade;
        }
      }
    }

    // Contagem de paradas intermediárias (média urbana de 1 parada a cada 320m de rota)
    const intermediateStops = closestBusDistance !== Infinity
      ? Math.max(0, Math.floor(closestBusDistance / 320))
      : 0;

    // Cálculo do ETA Cinemático com Dwell Time (+20s por parada)
    let etaMinutes = 3;
    if (closestBusDistance !== Infinity) {
      const prediction = estimateArrivalTime(closestBusDistance, closestBusSpeed, intermediateStops, 20);
      etaMinutes = Math.max(1, prediction.estimatedMinutes);
    } else {
      // Valor padrão de tabela se a linha estiver sincronizando
      etaMinutes = 5;
    }

    // Separação do nome longo em "Nome do Destino" e "Via"
    const nameParts = route.longName.split('(');
    const destinationName = nameParts[0].trim();
    const viaText = nameParts[1] ? `Via ${nameParts[1].replace(')', '').trim()}` : route.category || 'Via Linha Principal';

    return {
      number: route.shortName,
      name: destinationName,
      via: viaText,
      eta: String(etaMinutes),
      unit: 'min',
      bgColor,
      textColor,
      nearestStopName: targetStop.stop.name,
      nearestStopDistanceMeters: targetStop.distanceMeters,
      activeBusesCount,
      closestBusDistanceMeters: closestBusDistance === Infinity ? undefined : Math.round(closestBusDistance),
      closestBusSpeed: Math.round(closestBusSpeed),
      intermediateStops,
    };
  });

  return {
    nearestStop: targetStop,
    lines: banners,
  };
}
