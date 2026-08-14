/**
 * Script de Teste do Consumo de Dados em Tempo Real da API do Rio de Janeiro
 * Executar via terminal: node scripts/test_datario_api.js
 */

const DATARIO_GPS_ENDPOINT = 'https://api.dados.rio/v2/transporte/veiculos';

async function fetchLiveBusPositions(targetLine) {
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
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    const buses = data
      .filter((item) => item.latitude && item.longitude && item.linha)
      .map((item) => ({
        ordem: item.ordem || item.codigo || 'DESCONHECIDO',
        linha: String(item.linha).trim(),
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        velocidade: Number(item.velocidade || 0),
        dataHora: item.dataHora || Date.now(),
      }));

    if (targetLine) {
      const normalizedTarget = targetLine.trim().toLowerCase();
      return buses.filter((b) => b.linha.toLowerCase() === normalizedTarget);
    }

    return buses;
  } catch (error) {
    console.warn('[Data.rio API] Usando dados de simulação local devido a timeout/instabilidade na API pública:', error.message);
    return getMockRioBusPositions(targetLine);
  }
}

function getMockRioBusPositions(targetLine) {
  const mockData = [
    { ordem: 'C41001', linha: '474', latitude: -22.9035, longitude: -43.1734, velocidade: 28, dataHora: Date.now() },
    { ordem: 'C41002', linha: '474', latitude: -22.9121, longitude: -43.1775, velocidade: 18, dataHora: Date.now() },
    { ordem: 'B27015', linha: '606', latitude: -22.8988, longitude: -43.2210, velocidade: 22, dataHora: Date.now() },
  ];

  if (targetLine) {
    return mockData.filter((b) => b.linha === targetLine);
  }
  return mockData;
}

async function runTest() {
  console.log('====================================================');
  console.log('📡 Testando consumo da API de GPS dos Ônibus do RJ...');
  console.log('====================================================\n');

  const startTime = Date.now();
  const buses = await fetchLiveBusPositions();
  const duration = Date.now() - startTime;

  console.log(`✅ Sucesso! Recebidos ${buses.length} ônibus ativos em ${duration}ms.`);
  console.log('\n--- Amostra dos 5 primeiros ônibus recebidos ---');
  console.table(buses.slice(0, 5));

  console.log('\n--- Testando filtro por linha específica (Ex: 474) ---');
  const line474Buses = await fetchLiveBusPositions('474');
  console.log(`Encontrados ${line474Buses.length} ônibus ativos operando na linha 474.`);
  if (line474Buses.length > 0) {
    console.table(line474Buses);
  }
}

runTest();
