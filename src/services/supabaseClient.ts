/**
 * Cliente de Conexão com o Banco na Nuvem (Supabase)
 * 
 * Responsável por realizar consultas aos pontos de ônibus, linhas e itinerários.
 */

import { ENV } from '../config/env';

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

    const data: BusStopCloud[] = await response.json();
    return data;
  } catch (error) {
    console.warn('[Supabase Cloud] Falha na consulta em nuvem, usando dados de fallback:', error);
    return [];
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

    const data: BusRouteCloud[] = await response.json();
    return data;
  } catch (error) {
    console.warn('[Supabase Cloud] Falha na consulta de linhas:', error);
    return [];
  }
}
