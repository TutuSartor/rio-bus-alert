/**
 * Cliente de Conexão com o Banco na Nuvem (Supabase)
 * 
 * Responsável por realizar consultas aos pontos de ônibus, linhas e itinerários.
 */

import { ENV } from '../config/env';
import localStops from '../../data/processed/rio_bus_stops.json';
import localRoutes from '../../data/processed/rio_bus_routes.json';

export interface BusStopCloud {
  id: string;
  nome: string;
  bairro: string;
  latitude: number;
  longitude: number;
}

export interface BusRouteCloud {
  id: string;
  numero: string;
  nome_longo: string;
  categoria: string;
  cor_hex: string;
}

/**
 * Busca a lista de pontos de ônibus cadastrados no banco em nuvem
 */
export async function fetchStopsFromCloud(): Promise<BusStopCloud[]> {
  try {
    const response = await fetch(`${ENV.SUPABASE_URL}/rest/v1/pontos?select=*`, {
      headers: {
        'apikey': ENV.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return getFallbackStops();
  } catch (error) {
    console.warn('[Supabase Cloud] Usando pontos de fallback local:', error);
    return getFallbackStops();
  }
}

/**
 * Busca a lista de linhas de ônibus cadastradas no banco em nuvem
 */
export async function fetchRoutesFromCloud(): Promise<BusRouteCloud[]> {
  try {
    const response = await fetch(`${ENV.SUPABASE_URL}/rest/v1/linhas?select=*`, {
      headers: {
        'apikey': ENV.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return getFallbackRoutes();
  } catch (error) {
    console.warn('[Supabase Cloud] Usando linhas de fallback local:', error);
    return getFallbackRoutes();
  }
}

function getFallbackStops(): BusStopCloud[] {
  return localStops.map((s) => ({
    id: s.id,
    nome: s.name,
    bairro: s.neighborhood || 'Rio de Janeiro',
    latitude: s.latitude,
    longitude: s.longitude,
  }));
}

function getFallbackRoutes(): BusRouteCloud[] {
  return localRoutes.map((r) => ({
    id: r.id,
    numero: r.shortName,
    nome_longo: r.longName,
    categoria: r.category || 'Municipal',
    cor_hex: '#3B82F6',
  }));
}
