/**
 * Script de Agrupamento Espacial de Paradas (Stop Clustering & Direction Engine)
 * 
 * 1. Agrupa postes e abrigos a menos de 30m na mesma calçada em um único ícone limpo.
 * 2. Calcula o sentido de direção de viagem (Centro / Ida vs Bairro / Volta).
 * 3. Consolida todas as linhas que passam naquele complexo de parada.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Função de cálculo de distância Haversine em metros
function haversine(c1, c2) {
  const R = 6371e3;
  const dLat = ((c2.latitude - c1.latitude) * Math.PI) / 180;
  const dLon = ((c2.longitude - c1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1.latitude * Math.PI) / 180) *
      Math.cos((c2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function runClustering() {
  console.log('====================================================');
  console.log('INICIANDO CLUSTERING & VETORIZAÇÃO DE PARADAS');
  console.log('====================================================\n');

  const gtfsDir = path.join(__dirname, '../data/gtfs');
  const stopsPath = path.join(gtfsDir, 'stops.txt');
  const stopTimesPath = path.join(gtfsDir, 'stop_times.txt');
  const tripsPath = path.join(gtfsDir, 'trips.txt');
  const routesPath = path.join(gtfsDir, 'routes.txt');

  // 1. Ler stops.txt
  console.log('1. Lendo stops.txt oficial...');
  const stopsRl = readline.createInterface({
    input: fs.createReadStream(stopsPath),
    crlfDelay: Infinity,
  });

  const rawStops = [];
  let isHeader = true;
  for await (const line of stopsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 6) {
      const stopId = parts[0];
      const stopCode = parts[1];
      const stopName = parts[2].replace(/"/g, '');
      const stopLat = parseFloat(parts[4]);
      const stopLon = parseFloat(parts[5]);

      if (!isNaN(stopLat) && !isNaN(stopLon)) {
        rawStops.push({
          id: stopId,
          code: stopCode,
          name: stopName,
          latitude: stopLat,
          longitude: stopLon,
        });
      }
    }
  }
  console.log(`Total de paradas brutas da prefeitura: ${rawStops.length}`);

  // 2. Mapear rotas e direções por trip
  console.log('\n2. Mapeando linhas e sentidos (direction_id)...');
  const routesRl = readline.createInterface({
    input: fs.createReadStream(routesPath),
    crlfDelay: Infinity,
  });
  const routesMap = {}; // route_id -> { shortName, longName }
  isHeader = true;
  for await (const line of routesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 4) {
      routesMap[parts[0]] = {
        shortName: parts[2].replace(/"/g, ''),
        longName: parts[3].replace(/"/g, ''),
      };
    }
  }

  const tripsRl = readline.createInterface({
    input: fs.createReadStream(tripsPath),
    crlfDelay: Infinity,
  });
  const tripInfo = {}; // trip_id -> { routeShortName, directionId }
  isHeader = true;
  for await (const line of tripsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 7) {
      const tripId = parts[0];
      const routeId = parts[1];
      const directionId = parseInt(parts[5], 10) || 0;
      const r = routesMap[routeId];
      if (r) {
        tripInfo[tripId] = {
          routeShortName: r.shortName,
          directionId,
        };
      }
    }
  }

  // 3. Mapear linhas e direção por stop_id
  console.log('\n3. Vinculando linhas e sentidos às paradas...');
  const stopTimesRl = readline.createInterface({
    input: fs.createReadStream(stopTimesPath),
    crlfDelay: Infinity,
  });

  const stopLinesMap = {}; // stop_id -> Set of routeShortNames
  const stopDirectionCounts = {}; // stop_id -> { 0: count, 1: count }

  isHeader = true;
  for await (const line of stopTimesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 4) {
      const tripId = parts[0];
      const stopId = parts[2];
      const t = tripInfo[tripId];
      if (t) {
        if (!stopLinesMap[stopId]) stopLinesMap[stopId] = new Set();
        stopLinesMap[stopId].add(t.routeShortName);

        if (!stopDirectionCounts[stopId]) stopDirectionCounts[stopId] = { 0: 0, 1: 0 };
        stopDirectionCounts[stopId][t.directionId]++;
      }
    }
  }

  // Função auxiliar para determinar o sentido de uma parada individual
  const getStopDirection = (sId) => {
    const counts = stopDirectionCounts[sId] || { 0: 0, 1: 0 };
    return counts[0] >= counts[1] ? 'centro' : 'bairro';
  };

  // 4. Executar Algoritmo de Clustering Espacial Orientado a Sentido (Direction-Aware)
  console.log('\n4. Executando Algoritmo de Clustering Orientado por Sentido (< 25m na mesma calçada)...');
  const clusters = [];
  const visited = new Set();
  const CLUSTER_RADIUS_METERS = 25;

  for (let i = 0; i < rawStops.length; i++) {
    if (visited.has(rawStops[i].id)) continue;

    const mainStop = rawStops[i];
    const mainDir = getStopDirection(mainStop.id);
    visited.add(mainStop.id);

    const clusterGroup = [mainStop];
    const combinedLines = new Set(stopLinesMap[mainStop.id] || []);
    let dir0 = (stopDirectionCounts[mainStop.id] && stopDirectionCounts[mainStop.id][0]) || 0;
    let dir1 = (stopDirectionCounts[mainStop.id] && stopDirectionCounts[mainStop.id][1]) || 0;

    // Buscar vizinhos próximos APENAS no mesmo sentido de circulação
    for (let j = i + 1; j < rawStops.length; j++) {
      if (visited.has(rawStops[j].id)) continue;

      const otherStop = rawStops[j];
      const otherDir = getStopDirection(otherStop.id);

      // REGRA CRÍTICA: Só agrupa se estiver no MESMO sentido de tráfego (nunca fundir calçada oposta)
      if (mainDir !== otherDir) continue;

      const dist = haversine(
        { latitude: mainStop.latitude, longitude: mainStop.longitude },
        { latitude: otherStop.latitude, longitude: otherStop.longitude }
      );

      if (dist <= CLUSTER_RADIUS_METERS) {
        visited.add(otherStop.id);
        clusterGroup.push(otherStop);
        const otherLines = stopLinesMap[otherStop.id] || [];
        otherLines.forEach((l) => combinedLines.add(l));

        if (stopDirectionCounts[otherStop.id]) {
          dir0 += stopDirectionCounts[otherStop.id][0];
          dir1 += stopDirectionCounts[otherStop.id][1];
        }
      }
    }

    // Média de latitude e longitude do cluster para centralizar o ícone na calçada correta
    const avgLat = clusterGroup.reduce((sum, s) => sum + s.latitude, 0) / clusterGroup.length;
    const avgLon = clusterGroup.reduce((sum, s) => sum + s.longitude, 0) / clusterGroup.length;

    // Sentido consolidado e setinha de direção
    const direction = mainDir;
    const directionArrow = direction === 'centro' ? '↗' : '↙';

    clusters.push({
      id: `CLUSTER_${mainStop.id}`,
      code: mainStop.code,
      name: mainStop.name,
      latitude: parseFloat(avgLat.toFixed(6)),
      longitude: parseFloat(avgLon.toFixed(6)),
      neighborhood: 'Rio de Janeiro',
      direction,
      directionArrow,
      linesCount: combinedLines.size || 2,
      lines: Array.from(combinedLines),
      subStopsCount: clusterGroup.length,
    });
  }

  console.log(`\n====================================================`);
  console.log(`✅ Redução de ${rawStops.length} postes brutos para ${clusters.length} estações consolidadas!`);
  console.log(`====================================================`);

  // Salvar paradas agrupadas consolidadas
  const destPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
  fs.writeFileSync(destPath, JSON.stringify(clusters, null, 2));
  console.log(`Salvo em: ${destPath}`);

  // Salvar stop_routes consolidadas
  const stopRoutes = [];
  clusters.forEach((c) => {
    c.lines.forEach((rId) => {
      stopRoutes.push({
        stopId: c.id,
        routeId: rId,
      });
    });
  });

  const stopRoutesPath = path.join(__dirname, '../data/processed/rio_stop_routes.json');
  fs.writeFileSync(stopRoutesPath, JSON.stringify(stopRoutes, null, 2));
  console.log(`Salvo em: ${stopRoutesPath}`);
}

runClustering().catch(console.error);
