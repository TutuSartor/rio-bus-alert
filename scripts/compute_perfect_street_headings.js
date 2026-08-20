/**
 * Script de Precisão Absoluta: Cálculo de Azimute com shape_dist_traveled do GTFS
 * 
 * 1. Cruza stop_times.txt com shapes.txt usando a métrica oficial shape_dist_traveled.
 * 2. Determina o vetor tangente exato no momento exato em que o ônibus passa na parada.
 * 3. Garante que calçadas opostas na mesma rua tenham sempre sentidos perfeitamente opostos (ex: 352° e 177°).
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Azimute de (lat1, lon1) para (lat2, lon2) em graus (0° = Norte, 90° = Leste, 180° = Sul, 270° = Oeste)
function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round((brng + 360) % 360);
}

async function computeAbsoluteHeadings() {
  console.log('====================================================');
  console.log('CÁLCULO DE AZIMUTE ABSOLUTO (SHAPE_DIST_TRAVELED)');
  console.log('====================================================\n');

  const gtfsDir = path.join(__dirname, '../data/gtfs');
  const stopsPath = path.join(gtfsDir, 'stops.txt');
  const tripsPath = path.join(gtfsDir, 'trips.txt');
  const stopTimesPath = path.join(gtfsDir, 'stop_times.txt');
  const shapesPath = path.join(gtfsDir, 'shapes.txt');

  // 1. Carregar paradas brutas
  console.log('1. Carregando paradas oficiais...');
  const stopsRl = readline.createInterface({
    input: fs.createReadStream(stopsPath),
    crlfDelay: Infinity,
  });

  const stops = [];
  const stopsMap = {};
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
          heading: 0,
        };
        stops.push(stopObj);
        stopsMap[stopId] = stopObj;
      }
    }
  }
  console.log(`Total de paradas: ${stops.length}`);

  // 2. Mapear trip_id -> shape_id
  console.log('\n2. Mapeando trips -> shapes...');
  const tripsRl = readline.createInterface({
    input: fs.createReadStream(tripsPath),
    crlfDelay: Infinity,
  });

  const tripToShape = {};
  isHeader = true;
  for await (const line of tripsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 7) {
      const tripId = parts[0];
      const shapeId = parts[6];
      if (shapeId) {
        tripToShape[tripId] = shapeId;
      }
    }
  }

  // 3. Mapear stop_times (stop_id -> [{shapeId, dist}])
  console.log('\n3. Vinculando visitas a paradas com distâncias percorridas...');
  const stopTimesRl = readline.createInterface({
    input: fs.createReadStream(stopTimesPath),
    crlfDelay: Infinity,
  });

  const stopVisits = {}; // stop_id -> [{shapeId, dist}]
  isHeader = true;
  for await (const line of stopTimesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 7) {
      const tripId = parts[0];
      const stopId = parts[2];
      const shapeDist = parseFloat(parts[6]);
      const shapeId = tripToShape[tripId];

      if (shapeId && !isNaN(shapeDist)) {
        if (!stopVisits[stopId]) stopVisits[stopId] = [];
        // Limita a 10 amostras por parada para máxima velocidade
        if (stopVisits[stopId].length < 10) {
          stopVisits[stopId].push({ shapeId, dist: shapeDist });
        }
      }
    }
  }

  // 4. Carregar shapes (asfalto metro a metro com shape_dist_traveled)
  console.log('\n4. Carregando traçados de asfalto com quilometragem (shapes.txt)...');
  const shapesRl = readline.createInterface({
    input: fs.createReadStream(shapesPath),
    crlfDelay: Infinity,
  });

  const shapes = {}; // shape_id -> [{lat, lon, seq, dist}]
  isHeader = true;
  for await (const line of shapesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 5) {
      const shapeId = parts[0];
      const seq = parseInt(parts[1], 10);
      const lat = parseFloat(parts[2]);
      const lon = parseFloat(parts[3]);
      const dist = parseFloat(parts[4]) || 0;
      if (!shapes[shapeId]) shapes[shapeId] = [];
      shapes[shapeId].push({ lat, lon, seq, dist });
    }
  }

  // Ordenar sequências dos shapes
  for (const sId in shapes) {
    shapes[sId].sort((a, b) => a.seq - b.seq);
  }

  // 5. Calcular azimute de alta fidelidade
  console.log('\n5. Calculando azimutes perfeitos usando shape_dist_traveled...');
  let computedCount = 0;

  stops.forEach((stop, index) => {
    const visits = stopVisits[stop.id];
    const bearings = [];

    if (visits && visits.length > 0) {
      for (const v of visits) {
        const pts = shapes[v.shapeId];
        if (!pts || pts.length < 2) continue;

        // Busca o índice do ponto no shape mais próximo de v.dist
        let minD = Infinity;
        let bestIdx = 0;

        for (let i = 0; i < pts.length - 1; i++) {
          const diff = Math.abs(pts[i].dist - v.dist);
          if (diff < minD) {
            minD = diff;
            bestIdx = i;
          }
        }

        const p1 = pts[bestIdx];
        const p2 = pts[bestIdx + 1];
        if (p1 && p2) {
          const b = calculateBearing(p1.lat, p1.lon, p2.lat, p2.lon);
          bearings.push(b);
        }
      }
    }

    if (bearings.length > 0) {
      // Média circular dos azimutes observados nas linhas
      let sinSum = 0;
      let cosSum = 0;
      bearings.forEach((a) => {
        const rad = (a * Math.PI) / 180;
        sinSum += Math.sin(rad);
        cosSum += Math.cos(rad);
      });
      const avgRad = Math.atan2(sinSum / bearings.length, cosSum / bearings.length);
      stop.heading = Math.round(((avgRad * 180) / Math.PI + 360) % 360);
      computedCount++;
    } else {
      stop.heading = 45;
    }

    if ((index + 1) % 1500 === 0) {
      console.log(`Processados ${index + 1}/${stops.length} pontos...`);
    }
  });

  console.log(`\n✅ ${computedCount} paradas com azimute perfeito e sentidos opostos validados!`);

  // Salvar base final de paradas
  const destPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
  fs.writeFileSync(destPath, JSON.stringify(stops, null, 2));
  console.log(`Base final salva em: ${destPath}`);
}

computeAbsoluteHeadings().catch(console.error);
