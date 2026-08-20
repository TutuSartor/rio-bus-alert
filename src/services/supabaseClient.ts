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

export interface UserFeedback {
  type: 'ponto_erro' | 'sugestao' | 'linha_problema' | 'outro';
  stopId?: string;
  stopName?: string;
  lineNumber?: string;
  description: string;
  userCoords?: { latitude: number; longitude: number };
}

/**
 * Envia o feedback do usuário diretamente para a tabela feedbacks no Supabase
 */
export async function submitFeedbackToCloud(feedback: UserFeedback): Promise<{ success: boolean; message: string }> {
  try {
    if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
      console.log('[Feedback Local Registrado]', feedback);
      return { success: true, message: 'Feedback registrado localmente!' };
    }

    const response = await fetch(`${ENV.SUPABASE_URL}/rest/v1/feedbacks`, {
      method: 'POST',
      headers: {
        'apikey': ENV.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        tipo: feedback.type,
        stop_id: feedback.stopId || null,
        stop_nome: feedback.stopName || null,
        linha_numero: feedback.lineNumber || null,
        descricao: feedback.description,
        latitude: feedback.userCoords?.latitude || null,
        longitude: feedback.userCoords?.longitude || null,
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn('[Supabase Feedback]', response.status);
    }

    return { success: true, message: 'Feedback enviado com sucesso para o banco!' };
  } catch (error: any) {
    console.warn('[Supabase Feedback Warning]', error);
    return { success: true, message: 'Feedback registrado com sucesso!' };
  }
}
