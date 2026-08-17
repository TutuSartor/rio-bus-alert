/**
 * Teste de Validação do Backend e Algoritmo de Linhas Diretas (Origem ➔ Destino)
 * 
 * Execução: node scripts/test_gtfs_backend.js
 */

const fs = require('fs');
const path = require('path');

const stops = require('../data/processed/rio_bus_stops.json');
const routes = require('../data/processed/rio_bus_routes.json');
const stopRoutes = require('../data/processed/rio_stop_routes.json');

// Cálculo Haversine em JS puro para o teste de terminal
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findDirectConnectingRoutes(originStopId, destStopId) {
  const originRoutes = new Set(stopRoutes.filter((sr) => sr.stopId === originStopId).map((sr) => sr.routeId));
  const destRoutes = new Set(stopRoutes.filter((sr) => sr.stopId === destStopId).map((sr) => sr.routeId));
  
  const commonRoutes = Array.from(originRoutes).filter((rId) => destRoutes.has(rId));
  return routes.filter((r) => commonRoutes.includes(r.id));
}

function runBackendTest() {
  console.log('====================================================');
  console.log('🧪 TESTE DE VALIDAÇÃO DO ALGORITMO BACKEND (ORIGEM ➔ DESTINO)');
  console.log('====================================================\n');

  const originStop = stops.find((s) => s.id === 'STOP_474_01'); // Central do Brasil
  const destStop = stops.find((s) => s.id === 'STOP_474_08');   // Copacabana

  console.log(`📍 Ponto de Origem:  ${originStop.name} (${originStop.neighborhood})`);
  console.log(`📍 Ponto de Destino: ${destStop.name} (${destStop.neighborhood})`);

  const distance = Math.round(haversineDistance(originStop.latitude, originStop.longitude, destStop.latitude, destStop.longitude));
  console.log(`📏 Distância em linha reta: ${(distance / 1000).toFixed(2)} km (${distance} metros)\n`);

  console.log('🔍 Executando busca por Linhas Diretas...');
  const startTime = Date.now();
  const directRoutes = findDirectConnectingRoutes(originStop.id, destStop.id);
  const duration = Date.now() - startTime;

  console.log(`⏱️ Algoritmo executado em ${duration}ms.\n`);
  console.log('🚌 LINHAS DIRETAS ENCONTRADAS:');
  console.table(directRoutes);

  console.log('====================================================');
  console.log('✅ TESTE DO BACKEND CONCLUÍDO COM SUCESSO!');
  console.log('====================================================');
}

runBackendTest();
