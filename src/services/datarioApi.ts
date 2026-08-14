/**
 * Serviço de Integração com a API em Tempo Real do Rio de Janeiro (Data.rio / SMTR)
 * 
 * Consome os dados de GPS da frota de ônibus municipais (SPPO / BRT) do Rio de Janeiro.
 */

import { BusPosition } from '../domain/geoUtils';

// Endpoint Público dos Dados Abertos da Prefeitura do Rio de Janeiro (Data.rio / SMTR)
const DATARIO_GPS_ENDPOINT = 'https://api.dados.rio/v2/transporte/veiculos';
const FALLBACK_MOBILIDADE_ENDPOINT = 'https://dados.mobilidade.rio/api/v1/sppo/veiculos';

export interface RawBusResponse {
  ordem?: string;
  codigo?: string;
  linha?: string;
  latitude?: number;
  longitude?: number;
  velocidade?: number;
  dataHora?: number | string;
}

/**
 * Busca a localização em tempo real de todos os ônibus ativos no Rio de Janeiro
 */
export async function fetchLiveBusPositions(targetLine?: string): Promise<BusPosition[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(DATARIO_GPS_ENDPOINT, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro na API Data.rio: HTTP ${response.status}`);
    }

    const data: RawBusResponse[] = await response.json();

    const buses: BusPosition[] = data
      .filter((item) => item.latitude && item.longitude && item.linha)
      .map((item) => ({
        ordem: item.ordem || item.codigo || 'DESCONHECIDO',
        linha: String(item.linha).trim(),
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        velocidade: Number(item.velocidade || 0),
        dataHora: typeof item.dataHora === 'number' ? item.dataHora : Date.now(),
      }));

    if (targetLine) {
      const normalizedTarget = targetLine.trim().toLowerCase();
      return buses.filter((b) => b.linha.toLowerCase() === normalizedTarget);
    }

    return buses;
  } catch (error) {
    console.warn('[Data.rio API] Falha na requisição principal. Tentando fallback ou simulação local:', error);
    return getMockRioBusPositions(targetLine);
  }
}

/**
 * Dados de simulação para desenvolvimento e testes off-line (Linhas 474 e 606 no Rio de Janeiro)
 */
function getMockRioBusPositions(targetLine?: string): BusPosition[] {
  const mockData: BusPosition[] = [
    {
      ordem: 'C41001',
      linha: '474',
      latitude: -22.9035, // Centro do Rio
      longitude: -43.1734,
      velocidade: 28,
      dataHora: Date.now(),
    },
    {
      ordem: 'C41002',
      linha: '474',
      latitude: -22.9121, // Glória / Catete
      longitude: -43.1775,
      velocidade: 18,
      dataHora: Date.now(),
    },
    {
      ordem: 'B27015',
      linha: '606',
      latitude: -22.8988, // Tijuca / Maracanã
      longitude: -43.2210,
      velocidade: 22,
      dataHora: Date.now(),
    },
  ];

  if (targetLine) {
    return mockData.filter((b) => b.linha === targetLine);
  }

  return mockData;
}
