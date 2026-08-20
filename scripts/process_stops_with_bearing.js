/**
 * Processador do GTFS Oficial com Cálculo de Azimute (Ângulo Real da Rua)
 * 
 * 1. Restaura todos os 7.441 pontos oficiais originais da SMTR / Prefeitura.
 * 2. Calcula o ângulo exato de circulação da via (bearing / azimute 0° a 360°)
 *    baseado na sequência de paradas das viagens (Stop A ➔ Stop B).
 * 3. Rotaciona a seta no mapa para apontar exatamente para o sentido da rua!
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Cálculo de azimute (ângulo em graus de c1 para c2)
function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round((brng + 360) % 360);
}

async function processStopsWithBearing() {
  console.log('====================================================');
  console.log('PROCESSANDO PARADAS COM AZIMUTE REAL DA RUA (BEARING)');
  console.log('====================================================\n');

  const gtfsDir = path.join(__dirname, '../data/gtfs');
  const stopsPath = path.join(gtfsDir, 'stops.txt');
  const stopTimesPath = path.join(gtfsDir, 'stop_times.txt');
  const tripsPath = path.join(gtfsDir, 'trips.txt');
  const routesPath = path.join(gtfsDir, 'routes.txt');

  // 1. Ler todos os pontos oficiais originais
  console.log('1. Carregando paradas oficiais brutas...');
  const stopsRl = readline.createInterface({
    input: fs.createReadStream(stopsPath),
    crlfDelay: Infinity,
  });

  const stopsMap = {};
  const allStops = [];
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
        const stopObj = {
          id: stopId,
          code: stopCode,
          name: stopName,
          latitude: stopLat,
          longitude: stopLon,
          neighborhood: 'Rio de Janeiro',
          heading: 0, // Será calculado
        };
        stopsMap[stopId] = stopObj;
        allStops.push(stopObj);
      }
    }
  }
  console.log(`Total de paradas oficiais: ${allStops.length}`);

  // 2. Mapear sequências de paradas nas viagens para calcular o vetor da rua
  console.log('\n2. Analisando sequências de paradas para calcular ângulo da rua...');
  const stopTimesRl = readline.createInterface({
    input: fs.createReadStream(stopTimesPath),
    crlfDelay: Infinity,
  });

  const tripStops = {}; // trip_id -> [{seq, stop_id}]
  isHeader = true;
  let count = 0;

  for await (const line of stopTimesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 3) {
      const tripId = parts[0];
      const seq = parseInt(parts[1], 10);
      const stopId = parts[2];
      if (!tripStops[tripId]) tripStops[tripId] = [];
      tripStops[tripId].push({ seq, stopId });
      count++;
    }
  }

  console.log(`Lidos ${count} registros de horários em viagens.`);

  // Calcular ângulos médios para cada parada
  const stopBearings = {}; // stopId -> [angles]

  Object.values(tripStops).forEach((seqList) => {
    seqList.sort((a, b) => a.seq - b.seq);
    for (let i = 0; i < seqList.length - 1; i++) {
      const current = stopsMap[seqList[i].stopId];
      const next = stopsMap[seqList[i + 1].stopId];
      if (current && next) {
        const angle = calculateBearing(
          current.latitude,
          current.longitude,
          next.latitude,
          next.longitude
        );
        if (!stopBearings[current.id]) stopBearings[current.id] = [];
        stopBearings[current.id].push(angle);
      }
    }
  });

  // Atribuir o ângulo mais frequente/médio a cada ponto
  allStops.forEach((stop) => {
    const angles = stopBearings[stop.id];
    if (angles && angles.length > 0) {
      // Média circular dos ângulos
      let sinSum = 0;
      let cosSum = 0;
      angles.forEach((a) => {
        const rad = (a * Math.PI) / 180;
        sinSum += Math.sin(rad);
        cosSum += Math.cos(rad);
      });
      const avgRad = Math.atan2(sinSum / angles.length, cosSum / angles.length);
      stop.heading = Math.round(((avgRad * 180) / Math.PI + 360) % 360);
    } else {
      stop.heading = 45; // Default suave se isolado
    }
  });

  // Salvar base completa original com ângulos reais
  const destPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
  fs.writeFileSync(destPath, JSON.stringify(allStops, null, 2));
  console.log(`\n✅ Salvo em ${destPath} com ${allStops.length} pontos oficiais e azimutes de rua!`);
}

processStopsWithBearing().catch(console.error);
